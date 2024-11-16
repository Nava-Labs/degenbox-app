import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export function TransactionModal(txHash: string) {
  return (
    <Dialog open>
      {/* <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <h1 className="font-black text-center text-4xl h4-shadow text-primary-200 leading-none">
            Processing Transaction
          </h1>
          <DialogTitle></DialogTitle>
          <DialogDescription>
            You can leave the page if you want. The transaction will keep
            processing.
          </DialogDescription>
        </DialogHeader>
        <img src="/spinner.svg" className="flex h-32 w-32 mx-auto" />
        <DialogFooter className="flex gap-2">
          <Link
            href={`https://base.blockscout.com/tx/${txHash}`}
            target="_blank"
          >
            <Button>
              Check transaction on explorer{" "}
              <ExternalLink className="w-10 h-10" />
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
