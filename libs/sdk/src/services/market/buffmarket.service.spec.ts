import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

import {
  BuffMarketResponse,
  BuffMarketSearchResponseData,
  BuffMarketSellOrderResponseData,
} from '@skintracker/sdk/types/market/buffmarket.types';
import { Skin, SkinCategory, SkinExterior } from '@skintracker/sdk/types/skins';
import { Weapon, WeaponSkins } from '@skintracker/sdk/types/skins/weapons';

import { MOCK_HTTP_SERVICE, MOCK_LOGGER_SERVICE } from '../../../test/util';
import { BuffMarketService } from './buffmarket.service';

describe('BuffMarketService', () => {
  let service: BuffMarketService;

  beforeEach(async () => {
    service = new BuffMarketService(MOCK_LOGGER_SERVICE, MOCK_HTTP_SERVICE);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return error if no apiKey is provided', async () => {
    const skin: Skin = {
      item: Weapon.AWP,
      name: 'Medusa' as WeaponSkins,
      exterior: SkinExterior.FN,
      category: SkinCategory.Normal,
    };
    const minPrice = await service.getMinPrice(skin);
    expect(minPrice).toEqual('Cookie is required');
  });

  it('should return min price for a skin', async () => {
    const searchResponseData: BuffMarketResponse<BuffMarketSearchResponseData> = {
      code: 'OK',
      data: {
        items: [
          {
            appid: 730,
            bookmarked: false,
            buy_max_price: '0',
            buy_num: 0,
            can_bargain: true,
            can_search_by_tournament: false,
            description: null,
            game: 'csgo',
            goods_info: {
              icon_url: 'https://buffmarket.fp.ps.easebar.com/file/6001514cf5e7bb340cc757f5sGdB7zAj02',
              info: {
                tags: {
                  exterior: {
                    category: 'exterior',
                    id: 126,
                    internal_name: 'wearcategory0',
                    localized_name: 'Factory New',
                  },
                  quality: {
                    category: 'quality',
                    id: 132,
                    internal_name: 'normal',
                    localized_name: 'Normal',
                  },
                  rarity: {
                    category: 'rarity',
                    id: 219,
                    internal_name: 'ancient_weapon',
                    localized_name: 'Covert',
                  },
                  type: {
                    category: 'type',
                    id: 192,
                    internal_name: 'csgo_type_sniperrifle',
                    localized_name: 'Sniper Rifles',
                  },
                  weapon: {
                    category: 'weapon',
                    id: 139,
                    internal_name: 'weapon_awp',
                    localized_name: 'AWP',
                  },
                },
              },
              item_id: null,
              original_icon_url: 'https://buffmarket.fp.ps.easebar.com/file/6001514a6793676666ea8f734ereJfuz02',
              steam_price: '3968.19',
              steam_price_cny: '3968.19',
            },
            has_buff_price_history: true,
            id: 17998,
            market_hash_name: 'AWP | Medusa (Factory New)',
            market_min_price: '0',
            name: 'AWP | Medusa (Factory New)',
            quick_price: '5908.56',
            sell_min_price: '0',
            sell_num: 0,
            sell_reference_price: '5909.06',
            short_name: 'AWP | Medusa',
            steam_market_url: 'https://steamcommunity.com/market/listings/730/AWP%20%7C%20Medusa%20%28Factory%20New%29',
            transacted_num: 0,
          },
        ],
        page_num: 1,
        page_size: 50,
        total_count: 1,
        total_page: 1,
      },
      msg: null,
    };
    const minPriceResponseData: BuffMarketResponse<BuffMarketSellOrderResponseData> = {
      code: 'OK',
      data: {
        fop_str: '?fop=imageView/2/w/245/h/230',
        goods_infos: {
          '17543': {
            appid: 730,
            can_3d_inspect: true,
            can_inspect: true,
            description: null,
            game: 'csgo',
            goods_id: 17543,
            icon_url: 'https://buffmarket.fp.ps.easebar.com/file/6001514cf5e7bb340cc757f5sGdB7zAj02',
            item_id: null,
            market_hash_name: 'AWP | Medusa (Minimal Wear)',
            market_min_price: '0',
            name: 'AWP | Medusa (Minimal Wear)',
            original_icon_url: 'https://buffmarket.fp.ps.easebar.com/file/6001514a6793676666ea8f734ereJfuz02',
            short_name: 'AWP | Medusa',
            steam_price: '2429.51',
            steam_price_cny: '2429.51',
            tags: {
              category: {
                category: 'category',
                id: 32,
                internal_name: 'weapon_awp',
                localized_name: 'AWP',
              },
              category_group: {
                category: 'category_group',
                id: 211,
                internal_name: 'rifle',
                localized_name: 'Rifles',
              },
              custom: {
                category: 'custom',
                id: 4650,
                internal_name: 'blue',
                localized_name: 'blue',
              },
              exterior: {
                category: 'exterior',
                id: 127,
                internal_name: 'wearcategory1',
                localized_name: 'Minimal Wear',
              },
              itemset: {
                category: 'itemset',
                id: 439,
                internal_name: 'set_gods_and_monsters',
                localized_name: 'The Gods and Monsters Collection',
              },
              quality: {
                category: 'quality',
                id: 132,
                internal_name: 'normal',
                localized_name: 'Normal',
              },
              rarity: {
                category: 'rarity',
                id: 219,
                internal_name: 'ancient_weapon',
                localized_name: 'Covert',
              },
              type: {
                category: 'type',
                id: 192,
                internal_name: 'csgo_type_sniperrifle',
                localized_name: 'Sniper Rifles',
              },
              weapon: {
                category: 'weapon',
                id: 139,
                internal_name: 'weapon_awp',
                localized_name: 'AWP',
              },
            },
          },
        },
        has_market_stores: {
          U1093255776: true,
          U1093424135: true,
          U1093472125: true,
          U1093644178: true,
        },
        items: [
          {
            allow_bargain: true,
            appid: 730,
            asset_info: {
              action_link: '',
              appid: 730,
              assetid: '29674203379',
              classid: '4434361496',
              contextid: 2,
              goods_id: 17543,
              has_tradable_cooldown: false,
              info: {
                fraudwarnings: null,
                icon_url: 'https://buffmarket.fp.ps.easebar.com/file/6001514cf5e7bb340cc757f5sGdB7zAj02',
                inspect_en_size: '2560x3900',
                inspect_en_url: 'https://ovspect.fp.ps.easebar.com/file/64424f8d9781de0c356082136jSTGN8t03',
                inspect_mobile_size: '2560x3002',
                inspect_mobile_url: 'https://ovspect.fp.ps.easebar.com/file/64424f8ce0bff52828467fbaD1RH09OM03',
                inspect_size: '2560x3900',
                inspect_start_at: '2023-04-21 16:52:39',
                inspect_state: 2,
                inspect_trn_size: '2377x447',
                inspect_trn_url: 'https://ovspect.fp.ps.easebar.com/file/64424f8ecc777c13ed09c352V98qdszH03',
                inspect_url: 'https://ovspect.fp.ps.easebar.com/file/64424f8d9781de0c356082136jSTGN8t03',
                inspect_version: 11,
                inspected_at: '2023-04-21 16:55:45',
                original_icon_url: 'https://buffmarket.fp.ps.easebar.com/file/6001514a6793676666ea8f734ereJfuz02',
                paintindex: 446,
                paintseed: 428,
                stickers: [
                  {
                    category: 'sticker',
                    img_url: 'https://buffmarket.fp.ps.easebar.com/file/60659e2d6793674b65f7d9a65Gq06b6W02',
                    name: 'Counter Logic Gaming (Foil) | Cologne 2015',
                    slot: 1,
                    sticker_id: 666,
                    wear: 0,
                  },
                  {
                    category: 'sticker',
                    img_url: 'https://buffmarket.fp.ps.easebar.com/file/60659e2d6793674b65f7d9a65Gq06b6W02',
                    name: 'Counter Logic Gaming (Foil) | Cologne 2015',
                    slot: 2,
                    sticker_id: 666,
                    wear: 0,
                  },
                  {
                    category: 'sticker',
                    img_url: 'https://buffmarket.fp.ps.easebar.com/file/60659e2c6793674b65f7d9a0JIk7IGOg02',
                    name: 'Titan (Foil) | Cologne 2015',
                    slot: 3,
                    sticker_id: 663,
                    wear: 0,
                  },
                ],
                tournament_tags: [
                  {
                    category: 'tournamentteam',
                    internal_name: 'team49',
                    localized_name: 'Counter Logic Gaming',
                  },
                  {
                    category: 'tournamentteam',
                    internal_name: 'team27',
                    localized_name: 'Titan',
                  },
                  {
                    category: 'tournament',
                    internal_name: 'tournament7',
                    localized_name: '2015 ESL One Cologne',
                  },
                ],
              },
              instanceid: '302028390',
              paintwear: '0.11945365369319916',
              tradable_cooldown_text: '',
              tradable_unfrozen_time: null,
            },
            background_image_url: 'https://api.buff.market/static/images/item_bg.png',
            bookmarked: false,
            can_bargain: true,
            can_use_inspect_trn_url: false,
            cannot_bargain_reason: '',
            created_at: 1682066674,
            description: '',
            featured: 0,
            fee: '0',
            game: 'csgo',
            goods_id: 17543,
            id: '230421T1091505396',
            img_src: 'https://buffmarket.fp.ps.easebar.com/file/6001514cf5e7bb340cc757f5sGdB7zAj02',
            income: '0',
            lowest_bargain_price: '2520',
            mode: 5,
            price: '3150',
            recent_average_duration: null,
            recent_deliver_rate: null,
            state: 1,
            supported_pay_methods: [3, 10, 11],
            tradable_cooldown: null,
            updated_at: 1688626395,
            user_id: 'U1093644178',
          },
          {
            allow_bargain: true,
            appid: 730,
            asset_info: {
              action_link: '',
              appid: 730,
              assetid: '30014972367',
              classid: '5131937839',
              contextid: 2,
              goods_id: 17543,
              has_tradable_cooldown: false,
              info: {
                fraudwarnings: null,
                icon_url: 'https://buffmarket.fp.ps.easebar.com/file/6001514cf5e7bb340cc757f5sGdB7zAj02',
                inspect_en_size: '2560x3900',
                inspect_en_url: 'https://ovspect.fp.ps.easebar.com/file/645784419e15b70f5a53df63yLOZJqGq03',
                inspect_mobile_size: '2560x3002',
                inspect_mobile_url: 'https://ovspect.fp.ps.easebar.com/file/6457844170d9a9750d882c29kCC3eBZG03',
                inspect_size: '2560x3900',
                inspect_start_at: '2023-05-07 18:57:53',
                inspect_state: 2,
                inspect_trn_size: '2377x447',
                inspect_trn_url: 'https://ovspect.fp.ps.easebar.com/file/64578442cc777c342201b292atWqmt5b03',
                inspect_url: 'https://ovspect.fp.ps.easebar.com/file/645784419e15b70f5a53df63yLOZJqGq03',
                inspect_version: 11,
                inspected_at: '2023-05-07 18:58:13',
                original_icon_url: 'https://buffmarket.fp.ps.easebar.com/file/6001514a6793676666ea8f734ereJfuz02',
                paintindex: 446,
                paintseed: 153,
                stickers: [
                  {
                    category: 'sticker',
                    img_url: 'https://buffmarket.fp.ps.easebar.com/file/606592e11b74122448c32dc4VjJYBfwl02',
                    name: 'Cloud9 (Holo) | Boston 2018',
                    slot: 1,
                    sticker_id: 2473,
                    wear: 0,
                  },
                  {
                    category: 'sticker',
                    img_url: 'https://buffmarket.fp.ps.easebar.com/file/606592e11b74122448c32dc4VjJYBfwl02',
                    name: 'Cloud9 (Holo) | Boston 2018',
                    slot: 2,
                    sticker_id: 2473,
                    wear: 0,
                  },
                  {
                    category: 'sticker',
                    img_url: 'https://buffmarket.fp.ps.easebar.com/file/6065955af5e7bb63b265102be8ZVNlkT02',
                    name: 'Team LDLC.com (Holo) | Cologne 2014',
                    slot: 3,
                    sticker_id: 133,
                    wear: 0,
                  },
                ],
                tournament_tags: [
                  {
                    category: 'tournamentteam',
                    internal_name: 'team26',
                    localized_name: 'Team LDLC.com',
                  },
                  {
                    category: 'tournamentteam',
                    internal_name: 'team33',
                    localized_name: 'Cloud9',
                  },
                  {
                    category: 'tournament',
                    internal_name: 'tournament4',
                    localized_name: '2014 ESL One Cologne',
                  },
                  {
                    category: 'tournament',
                    internal_name: 'tournament13',
                    localized_name: '2018 ELEAGUE Boston',
                  },
                ],
              },
              instanceid: '302028390',
              paintwear: '0.08585689216852188',
              tradable_cooldown_text: '',
              tradable_unfrozen_time: null,
            },
            background_image_url: 'https://api.buff.market/static/images/item_bg.png',
            bookmarked: false,
            can_bargain: true,
            can_use_inspect_trn_url: false,
            cannot_bargain_reason: '',
            created_at: 1684156988,
            description: '',
            featured: 0,
            fee: '0',
            game: 'csgo',
            goods_id: 17543,
            id: '230515T1091277711',
            img_src: 'https://buffmarket.fp.ps.easebar.com/file/6001514cf5e7bb340cc757f5sGdB7zAj02',
            income: '0',
            lowest_bargain_price: '2799.99',
            mode: 5,
            price: '3499.99',
            recent_average_duration: 330.0,
            recent_deliver_rate: 1.0,
            state: 1,
            supported_pay_methods: [3, 10, 11],
            tradable_cooldown: null,
            updated_at: 1684156988,
            user_id: 'U1093424135',
          },
          {
            allow_bargain: true,
            appid: 730,
            asset_info: {
              action_link: '',
              appid: 730,
              assetid: '31668756838',
              classid: '4946532579',
              contextid: 2,
              goods_id: 17543,
              has_tradable_cooldown: false,
              info: {
                extra_info: {},
                fraudwarnings: "Name Tag: ''\u30a3\u53bc\u9c19\u8981\u98db\uff0c\u9b3a\u75db\u0449o\u505d''",
                icon_url: 'https://buffmarket.fp.ps.easebar.com/file/6001514cf5e7bb340cc757f5sGdB7zAj02',
                inspect_en_size: '2560x3900',
                inspect_en_url: 'https://ovspect.fp.ps.easebar.com/file/64b7f990da2a89b0357ec71dTdLVxrlq03',
                inspect_mobile_size: '2560x3002',
                inspect_mobile_url: 'https://ovspect.fp.ps.easebar.com/file/64b7f98e8c24afce941be0a7ZUN2gcBv03',
                inspect_size: '2560x3900',
                inspect_start_at: '2023-07-19 22:53:18',
                inspect_state: 2,
                inspect_trn_size: '2377x447',
                inspect_trn_url: 'https://ovspect.fp.ps.easebar.com/file/64b7f9918c24afce941be102CtSKfJT503',
                inspect_url: 'https://ovspect.fp.ps.easebar.com/file/64b7f990da2a89b0357ec71dTdLVxrlq03',
                inspect_version: 11,
                inspected_at: '2023-07-19 22:56:19',
                original_icon_url: 'https://buffmarket.fp.ps.easebar.com/file/6001514a6793676666ea8f734ereJfuz02',
                paintindex: 446,
                paintseed: 966,
                stickers: [
                  {
                    category: 'sticker',
                    img_url: 'https://buffmarket.fp.ps.easebar.com/file/60659afa67936709bbb6f4c2gvoBioD702',
                    name: 'Titan (Foil) | Katowice 2015',
                    slot: 3,
                    sticker_id: 344,
                    wear: 0,
                  },
                ],
                tournament_tags: [
                  {
                    category: 'tournamentteam',
                    internal_name: 'team27',
                    localized_name: 'Titan',
                  },
                  {
                    category: 'tournament',
                    internal_name: 'tournament6',
                    localized_name: '2015 ESL One Katowice',
                  },
                ],
              },
              instanceid: '519977179',
              paintwear: '0.09486209601163864',
              tradable_cooldown_text: '',
              tradable_unfrozen_time: null,
            },
            background_image_url: 'https://api.buff.market/static/images/item_bg.png',
            bookmarked: false,
            can_bargain: true,
            can_use_inspect_trn_url: false,
            cannot_bargain_reason: '',
            created_at: 1690618696,
            description: '',
            featured: 0,
            fee: '0',
            game: 'csgo',
            goods_id: 17543,
            id: '230729T1092194435',
            img_src: 'https://buffmarket.fp.ps.easebar.com/file/6001514cf5e7bb340cc757f5sGdB7zAj02',
            income: '0',
            lowest_bargain_price: '3040',
            mode: 5,
            price: '3800',
            recent_average_duration: 2758.0,
            recent_deliver_rate: 1.0,
            state: 1,
            supported_pay_methods: [3, 10, 11],
            tradable_cooldown: null,
            updated_at: 1690618696,
            user_id: 'U1093255776',
          },
          {
            allow_bargain: true,
            appid: 730,
            asset_info: {
              action_link: '',
              appid: 730,
              assetid: '30302482242',
              classid: '5003680685',
              contextid: 2,
              goods_id: 17543,
              has_tradable_cooldown: false,
              info: {
                fraudwarnings:
                  "Name Tag: ''\u795e\u4ed9\u4e4b\u4e0b\u6211\u65e0\u654c\uff0c\u795e\u4ed9\u4e4b\u4e0a\u4e00\u6362\u4e00''",
                icon_url: 'https://buffmarket.fp.ps.easebar.com/file/6001514cf5e7bb340cc757f5sGdB7zAj02',
                inspect_en_size: '2560x3538',
                inspect_en_url: 'https://ovspect.fp.ps.easebar.com/file/646d25619e15b77c6c737954siCfjvOO03',
                inspect_mobile_size: '2560x2640',
                inspect_mobile_url: 'https://ovspect.fp.ps.easebar.com/file/646d25609781de23b43fe807c4LF7hti03',
                inspect_size: '2560x3538',
                inspect_start_at: '2023-05-24 04:42:46',
                inspect_state: 2,
                inspect_trn_size: '2377x447',
                inspect_trn_url: 'https://ovspect.fp.ps.easebar.com/file/646d25629e15b72236d81021UKzN8L2h03',
                inspect_url: 'https://ovspect.fp.ps.easebar.com/file/646d25619e15b77c6c737954siCfjvOO03',
                inspect_version: 11,
                inspected_at: '2023-05-24 04:43:17',
                original_icon_url: 'https://buffmarket.fp.ps.easebar.com/file/6001514a6793676666ea8f734ereJfuz02',
                paintindex: 446,
                paintseed: 24,
                stickers: [],
                tournament_tags: [],
              },
              instanceid: '302028390',
              paintwear: '0.13447794318199158',
              tradable_cooldown_text: '',
              tradable_unfrozen_time: null,
            },
            background_image_url: 'https://api.buff.market/static/images/item_bg.png',
            bookmarked: false,
            can_bargain: true,
            can_use_inspect_trn_url: false,
            cannot_bargain_reason: '',
            created_at: 1684773341,
            description: '',
            featured: 0,
            fee: '0',
            game: 'csgo',
            goods_id: 17543,
            id: '230523T1090829174',
            img_src: 'https://buffmarket.fp.ps.easebar.com/file/6001514cf5e7bb340cc757f5sGdB7zAj02',
            income: '0',
            lowest_bargain_price: '3336',
            mode: 5,
            price: '4170',
            recent_average_duration: null,
            recent_deliver_rate: null,
            state: 1,
            supported_pay_methods: [3, 10, 11],
            tradable_cooldown: null,
            updated_at: 1684773341,
            user_id: 'U1093472125',
          },
        ],
        page_num: 1,
        page_size: 10,
        preview_screenshots: {},
        show_game_cms_icon: true,
        show_pay_method_icon: true,
        sort_by: 'price.asc',
        src_url_background: 'https://api.buff.market/static/images/item_bg.png',
        total_count: 4,
        total_page: 1,
        user_infos: {
          U1093255776: {
            avatar: 'https://buffmarket.fp.ps.easebar.com/file/636dab9ecc777c665c6f0dd1zF9r9BpI03',
            avatar_safe: 'https://buffmarket.fp.ps.easebar.com/file/636dab9ecc777c665c6f0dd1zF9r9BpI03',
            is_auto_accept: false,
            is_premium_vip: false,
            nickname: 'CheeseWaller',
            seller_level: 0,
            shop_id: '1093255776',
            user_id: 'U1093255776',
            v_types: null,
          },
          U1093424135: {
            avatar: 'https://buffmarket.fp.ps.easebar.com/file/6084f15c1b7412210d5382edCh9CMlPI02',
            avatar_safe: 'https://buffmarket.fp.ps.easebar.com/file/6084f15c1b7412210d5382edCh9CMlPI02',
            is_auto_accept: false,
            is_premium_vip: false,
            nickname: 'BorisBkke',
            seller_level: 0,
            shop_id: '1093424135',
            user_id: 'U1093424135',
            v_types: null,
          },
          U1093472125: {
            avatar: 'https://buffmarket.fp.ps.easebar.com/file/5feae0dc679367539c445fc9kyNiJpsP02',
            avatar_safe: 'https://buffmarket.fp.ps.easebar.com/file/5feae0dc679367539c445fc9kyNiJpsP02',
            is_auto_accept: false,
            is_premium_vip: false,
            nickname: 'Vebal',
            seller_level: 0,
            shop_id: '1093472125',
            user_id: 'U1093472125',
            v_types: null,
          },
          U1093644178: {
            avatar: 'https://buffmarket.fp.ps.easebar.com/file/62d2659c70d9a923958a382461hlxpii03',
            avatar_safe: 'https://buffmarket.fp.ps.easebar.com/file/62d2659c70d9a923958a382461hlxpii03',
            is_auto_accept: false,
            is_premium_vip: false,
            nickname: 'JCL2000',
            seller_level: 0,
            shop_id: '1093644178',
            user_id: 'U1093644178',
            v_types: null,
          },
        },
      },
      msg: null,
    };
    const mockHttpService = {
      get: jest.fn((url) => {
        if (url.includes('sell_order')) {
          return of({ data: minPriceResponseData });
        } else {
          return of({ data: searchResponseData });
        }
      }),
    } as unknown as HttpService;
    service = new BuffMarketService(MOCK_LOGGER_SERVICE, mockHttpService);
    const minPrice = await service.getMinPrice(
      {
        item: Weapon.AWP,
        name: 'Medusa' as WeaponSkins,
        exterior: SkinExterior.FN,
        category: SkinCategory.Normal,
      },
      'mock_token',
    );
    expect(minPrice).toEqual('$3150.00');
  });
});
