import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { OgmaLogger, OgmaService } from '@ogma/nestjs-module';
import { AxiosError } from 'axios';
import { launch, Page } from 'puppeteer';
import { catchError, firstValueFrom } from 'rxjs';

import { cookiesToString } from '../../functions/cookies-to-string';
import { skinToString } from '../../functions/skin-to-string';
import { BuffMarketResponse, BuffMarketSearchResponseData, BuffMarketSellOrderResponseData, Market } from '../../types/market';
import { Skin } from '../../types/skins/skin.types';
import { SettingsService } from '../settings.service';

@Injectable()
export class BuffMarketService {
  readonly market: Market = Market.BUFFMarket;
  private token: string | undefined;

  constructor(
    @OgmaLogger(BuffMarketService) private readonly logger: OgmaService,
    private httpService: HttpService,
    private settingsService: SettingsService,
  ) {
    this.token = this.settingsService.getMarketLoginToken(this.market);
    this.logger.verbose(`Initialized Buff Market service with token: ${this.token}`);
  }

  skinToSearchQueryString(skin: Skin): string {
    const { item, name, exterior } = skin;
    return `${item} | ${name} (${exterior})`;
  }

  async search(skin: Skin) {
    this.logger.verbose(`Beginning Buff Market search for ${skinToString(skin)}...`);
    this.logger.verbose('Generating query string...');
    const queryString = this.skinToSearchQueryString(skin).replace(/\s+/g, '+').toLowerCase();
    this.logger.verbose(`Generated query string: ${queryString}`);

    const headers = {
      Cookie: this.token,
    };

    this.logger.verbose('Executing Buff Market request...');
    const response = await firstValueFrom(
      this.httpService
        .get<BuffMarketResponse<BuffMarketSearchResponseData>>(
          `https://api.buff.market/api/market/goods?game=csgo&search=${queryString}&page_num=1&page_size=50`,
          {
            headers,
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw error;
          }),
        ),
    );
    this.logger.verbose('Executed Buff Market request:', {
      response: response.data,
      status: response.status,
    });
    return response.data;
  }

  async getGoodsId(skin: Skin) {
    this.logger.verbose(`Getting ${this.market} Goods ID for ${skinToString(skin)}...`);
    const searchResponse = await this.search(skin);
    this.logger.verbose(`Got ${this.market} search response: [${searchResponse.code}] ${searchResponse.data}`);
    const goodsId = searchResponse.data.items[0].id;
    this.logger.verbose(`Got ${this.market} Goods ID for ${skinToString(skin)}: ${goodsId}`);
    return goodsId;
  }

  async getMinPrice(skin: Skin) {
    if (!this.token) {
      return 'Not Logged In';
    }
    this.logger.verbose(`Getting ${this.market} min price for ${skinToString(skin)}...`);
    const goodsId = await this.getGoodsId(skin);

    const headers = {
      Cookie: this.token,
    };

    this.logger.verbose('Executing Buff Market request...');
    const sellOrderResponse = await firstValueFrom(
      this.httpService
        .get<BuffMarketResponse<BuffMarketSellOrderResponseData>>(
          `https://api.buff.market/api/market/goods/sell_order?game=csgo&page_num=1&page_size=10&goods_id=${goodsId}&sort_by=default`,
          {
            headers,
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    this.logger.verbose('Executed Buff Market request:', {
      response: sellOrderResponse.data,
      status: sellOrderResponse.status,
    });
    const minPrice = sellOrderResponse.data.data.items[0].price;
    this.logger.verbose(`Got ${this.market} min price for ${skinToString(skin)}: ${minPrice}`);
    return this.convertPriceToStandardizedFormat(minPrice);
  }

  convertPriceToStandardizedFormat(price: string) {
    if (!price.includes('.')) return `$${price}.00`;
    return `$${price}`;
  }

  async loginAndFetchCookie(): Promise<string> {
    this.logger.verbose('Logging into Buff Market...');
    const browser = await launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://buff.market');
    const signInButton = await page.$('.c-nav-account button.c-nav-sign');
    await signInButton.click();
    const newPagePromise = new Promise<Page>((resolve) =>
      browser.once('targetcreated', (target) => {
        this.logger.verbose('Created sign-in popup window');
        resolve(target.page());
      }),
    );
    const popup = await newPagePromise;
    await new Promise((resolve) => popup.once('close', resolve));
    this.logger.verbose('Closed sign-in popup window');

    // reload page to get new csrf token
    await page.goto('https://buff.market/market/all?game=csgo');

    const client = await page.target().createCDPSession();
    const cookies = (await client.send('Network.getAllCookies')).cookies;
    const cookieString = cookiesToString(cookies);
    this.logger.verbose(`Logged into Buff Market with token: ${cookieString}`);
    return cookieString;
  }
}
