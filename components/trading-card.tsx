import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CuboidIcon as Cube, Copy } from "lucide-react";

const BOX_DATA = [
  {
    name: "Base Maxi",
    box_balance: 2,
    box_address: "0x27c229FE370C1195c45ff1953e96acd741aA48c0",
    box_logo_url:
      "https://raw.githubusercontent.com/base-org/brand-kit/10f77e1f8f27e719c181973384f4cc967d9c4d36/logo/symbol/Base_Symbol_Blue.svg",
    box_price: 0.0087,
    box_balance_in_usd: 0.0174,
    average_entry: 0.015,
  },
  {
    name: "Murad's Big Bet",
    box_balance: 5,
    box_address: "0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97",
    box_logo_url: "https://twitter.com/MustStopMurad/photo",
    box_price: 0.01,
    box_balance_in_usd: 0.05,
    average_entry: 0.001,
  },
  {
    name: "The Big 5",
    box_balance: 3,
    box_address: "0x253553366Da8546fC250F225fe3d25d0C782303b",
    box_logo_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROjfDTghEmMns99jBtOkpQrfBN19Xfw4W2Kg&s",
    box_price: 0.05,
    box_balance_in_usd: 0.15,
    average_entry: 0.08,
  },
];

export function TradingCard() {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const copyAddress = () => {
    navigator.clipboard.writeText("0xbF8A...C637");
  };

  return (
    <>
      {BOX_DATA.map((item, index) => (
        <Card key={index} className="w-full p-3 mt-9">
          <div className="flex justify-between mb-5">
            <div className="flex w-full justify-between gap-1 items-center">
              <div className="flex items-center gap-1">
                <div className="flex bg-primary-100 h-8 w-8 p-2 rounded-lg items-center">
                  <img src={item.box_logo_url} className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <h2 className="text-[16px] text-primary-800 font-bold">
                      {item.name}
                    </h2>
                    <span className="h-5 w-7 font-bold text-xs bg-[#C2E6F5] text-primary-900 rounded-full text-center align-middle border border-primary-900">
                      x{item.box_balance}
                    </span>
                  </div>
                  <div
                    onClick={copyAddress}
                    className="flex text-xs text-primary-200 font-bold gap-1"
                  >
                    <span className="truncate max-w-32">
                      {item.box_address}
                    </span>
                    <img
                      src="/icons/copy.svg"
                      className="w-3 h-3 !text-primary-200"
                    />
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-primary-900">
                  ${item.box_balance_in_usd}
                </div>
                <div className="text-xs text-primary-200 font-bold">
                  ${item.box_price} each
                </div>
              </div>
            </div>
            <div className="flex justify-between"></div>
          </div>
          <div className="flex justify-between">
            <div className="text-primary-900 text-xs font-bold self-end">
              <span>Avg. Entry: </span>
              <span>${item.box_price}</span>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex gap-1 items-center justify-end">
                <div
                  onClick={() => decrementQuantity()}
                  className="flex items-center justify-center font-bold h-5 w-5 border-2 border-primary-900 rounded-lg border-b-4"
                >
                  -
                </div>
                <div className="font-bold text-xs text-primary-900">
                  {quantity}
                </div>
                <div
                  onClick={() => incrementQuantity()}
                  className="flex items-center justify-center font-bold h-5 w-5 border-2 border-primary-900 rounded-lg border-b-4"
                >
                  +
                </div>
              </div>
              <Button className="bg-[#F5C2C3] text-xs font-bold text-[#72191A] border-2 border-b-4 border-l-4 border-r-4 border-[#72191A] h-5 py-[2px] px-2">
                Sell {quantity} Box
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </>
  );
}
