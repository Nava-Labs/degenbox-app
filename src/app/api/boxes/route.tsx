import { NextResponse } from 'next/server';
import { PriceServiceConnection } from '@pythnetwork/price-service-client';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
);

console.log("AWadsadsa dsa", process.env.NEXT_PUBLIC_SUPABASE_URL )
console.log("supaaabase ",supabase)

const priceServiceConnection = new PriceServiceConnection(
  'https://hermes.pyth.network',
  { priceFeedRequestConfig: { binary: true } },
);

export async function GET(request: Request) {
  // const { searchParams } = new URL(request.url)
  // Get box data from Supabase
  let { data: boxes, error } = await supabase.from('boxes').select('*');
  // .limit(1)
  // .single()
  boxes = [
    {
      "id": 1,
      "created_at": "2024-11-16T09:16:27.539249+00:00",
      "name": "Murad's Big Bet",
      "token_list": [
        {
          "name": "BRETT",
          "amount": "25000000000000000",
          "address": "0x532f27101965dd16442e59d40670faf5ebb142e4",
          "feed_id": "0x9b5729efe3d68e537cdcb2ca70444dea5f06e1660b562632609757076d0b9448",
          "logo_url": "https://assets.coingecko.com/coins/images/35529/standard/1000050750.png?1709031995",
          "domain_id": "6",
          "pricePerToken": "173377780000000000",
          "totalUSDValue": "4334444500000000",
          "formattedUSDValue": "0.0043344445",
          "formattedPricePerToken": "0.17337778"
        },
        {
          "name": "MOG",
          "amount": "720000000000000000000",
          "address": "0xaaee1a9723aadb7afa2810263653a34ba2c21c7a",
          "feed_id": "0x17894b9fff49cd07efeab94a0d02db16f158efe04e0dee1db6af5f069082ce83",
          "logo_url": "https://assets.coingecko.com/coins/images/31059/standard/MOG_LOGO_200x200.png?1696529893",
          "domain_id": "0",
          "pricePerToken": "2574300000000",
          "totalUSDValue": "1853496000000000",
          "formattedUSDValue": "0.001853496",
          "formattedPricePerToken": "0.0000025743"
        },
        {
          "name": "POPCAT",
          "amount": "1000000000000000",
          "address": "7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr",
          "feed_id": "0xb9312a7ee50e189ef045aa3c7842e099b061bd9bdc99ac645956c3b660dc8cce",
          "logo_url": "https://assets.coingecko.com/coins/images/33760/standard/image.jpg?1702964227",
          "domain_id": "5",
          "box_dest_address": "0x0000",
          "pricePerToken": "1789548490000000000",
          "totalUSDValue": "1789548490000000",
          "formattedUSDValue": "0.00178954849",
          "formattedPricePerToken": "1.78954849"
        }
      ],
      "address": "0x53Aac90a46A16D4f5622832FD139069b86A05931",
      "boxPrice": "7977488990000000",
      "formattedBoxPrice": "0.00797748899"
    },
    {
      "id": 3,
      "created_at": "2024-11-16T12:37:20.460911+00:00",
      "name": "The Big 5",
      "token_list": [
        {
          "name": "SHIB",
          "amount": "390000000000000000000",
          "address": "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce",
          "feed_id": "0xf0d57deca57b3da2fe63a493f4c25925fdfd8edf834b20f93e1f84dbd1504d4a",
          "logo_url": "https://assets.coingecko.com/coins/images/11939/standard/shiba.png?1696511800",
          "domain_id": "0",
          "pricePerToken": "24111500000000",
          "totalUSDValue": "9403485000000000",
          "formattedUSDValue": "0.009403485",
          "formattedPricePerToken": "0.0000241115"
        },
        {
          "name": "PEPE",
          "amount": "450000000000000000000",
          "address": "0x6982508145454ce325ddbe47a25d4ec3d2311933",
          "feed_id": "0xd69731a2e74ac1ce884fc3890f7ee324b6deb66147055249568869ed700882e4",
          "logo_url": "https://assets.coingecko.com/coins/images/29850/standard/pepe-token.jpeg?1696528776",
          "domain_id": "0",
          "pricePerToken": "20992000000000",
          "totalUSDValue": "9446400000000000",
          "formattedUSDValue": "0.0094464",
          "formattedPricePerToken": "0.000020992"
        },
        {
          "name": "WIF",
          "amount": "2500000000000000",
          "address": "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm",
          "feed_id": "0x4ca4beeca86f0d164160323817a4e42b10010a724c2217c6ee41b54cd4cc61fc",
          "logo_url": "https://assets.coingecko.com/coins/images/33566/standard/dogwifhat.jpg?1702499428",
          "domain_id": "5",
          "pricePerToken": "3723151120000000000",
          "totalUSDValue": "9307877800000000",
          "formattedUSDValue": "0.0093078778",
          "formattedPricePerToken": "3.72315112"
        },
        {
          "name": "BONK",
          "amount": "240000000000000000000",
          "address": "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
          "feed_id": "0x72b021217ca3fe68922a19aaf990109cb9d84e9ad004b4d2025ad6f529314419",
          "logo_url": "https://assets.coingecko.com/coins/images/28600/standard/bonk.jpg?1696527587",
          "domain_id": "5",
          "pricePerToken": "51665000000000",
          "totalUSDValue": "12399600000000000",
          "formattedUSDValue": "0.0123996",
          "formattedPricePerToken": "0.000051665"
        },
        {
          "name": "FLOKI",
          "amount": "38000000000000000000",
          "address": "0xcf0c122c6b73ff809c693db761e7baebe62b6a2e",
          "feed_id": "0x6b1381ce7e874dc5410b197ac8348162c0dd6c0d4c9cd6322672d6c2b1d58293",
          "logo_url": "https://assets.coingecko.com/coins/images/16746/standard/PNG_image.png?1696516318",
          "domain_id": "0",
          "pricePerToken": "249521000000000",
          "totalUSDValue": "9481798000000000",
          "formattedUSDValue": "0.009481798",
          "formattedPricePerToken": "0.000249521"
        }
      ],
      "address": "0xE719a4094e5336faB6cD62903Eb4e5575A905949",
      "boxPrice": "50039160800000000",
      "formattedBoxPrice": "0.0500391608"
    }
  ]
  // console.log("boxeeess ", boxes)
  // if (error || !boxes) {
  //   console.log("finding boxes error ", error)
  //   return NextResponse.json(
  //     { error: 'Box not found', message: error },
  //     { status: 404 },
  //   );
  // }
  // console.log("boxes.length ", boxes.length)
  try {
    // Get all prices in parallel
    for (let i = 0; i < boxes.length; i++) {
      // for (let i = 0; i < 1; i++) {
      let box = boxes[i];
      // let pricePromises = [];
      let feed_ids = [];
      let tokenListLength = box.token_list.length;
      for (let j = 0; j < tokenListLength; j++) {
        feed_ids.push(box.token_list[j].feed_id);
      }
      // console.log("feed id", feed_ids)
      const priceFeeds =
        await priceServiceConnection.getLatestPriceFeeds(feed_ids);
      // console.log("price feeeeeedds ", priceFeeds)
      if (priceFeeds) {
        for (let j = 0; j < tokenListLength; j++) {
          let price = priceFeeds[j].getPriceUnchecked();
          // Convert price to actual value and then to decimal 18
          // Current: price.price * 10^(price.expo) -> actual price
          // Then multiply by 10^18 for desired decimals
          let normalizedPrice = (
            BigInt(price.price) * BigInt(10 ** (18 + Number(price.expo)))
          ).toString();
          boxes[i].token_list[j].pricePerToken = normalizedPrice;
          boxes[i].token_list[j].totalUSDValue = (
            (BigInt(normalizedPrice) * BigInt(boxes[i].token_list[j].amount)) /
            BigInt(10 ** 18)
          ).toString();
          if (boxes[i].token_list[j].totalUSDValue) {
            const formattedUSDValue = BigInt(
              boxes[i].token_list[j].totalUSDValue,
            );
            boxes[i].token_list[j].formattedUSDValue = (
              Number(formattedUSDValue) /
              10 ** 18
            ).toString();
          }

          if (boxes[i].token_list[j].pricePerToken) {
            const formattedPricePerToken = BigInt(
              boxes[i].token_list[j].pricePerToken,
            );
            boxes[i].token_list[j].formattedPricePerToken = (
              Number(formattedPricePerToken) /
              10 ** 18
            ).toString();
          }
        }
        let boxPrice = BigInt(0);
        for (let j = 0; j < tokenListLength; j++) {
          let tokenAmount = BigInt(boxes[i].token_list[j].amount);
          let tokenPrice = BigInt(boxes[i].token_list[j].pricePerToken);
          boxPrice += (tokenAmount * tokenPrice) / BigInt(10 ** 18);
        }
        boxes[i].boxPrice = boxPrice.toString();
      }

      // Convert boxPrice from decimal 18 to readable format
      if (boxes[i].boxPrice) {
        const rawPrice = BigInt(boxes[i].boxPrice);
        boxes[i].formattedBoxPrice = (Number(rawPrice) / 10 ** 18).toString();
      }
    }

    // console.log('boxes ', JSON.stringify(boxes, null, 2));
    // console.log({ boxes, token: boxes[0].token_list });
    // console.log("boxes ", boxes[0].token_list)

    return NextResponse.json({
      boxes: boxes,
    });
  } catch (error) {
    console.error('Error fetching prices:', error);
    return NextResponse.json(
      { error: 'Failed to fetch prices' },
      { status: 500 },
    );
  }
}
