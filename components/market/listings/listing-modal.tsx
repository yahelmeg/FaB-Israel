import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ListingModalDetails } from "@/components/market/listings/listing-modal-details";
import { Listing } from "@/types/Listing"


interface ListingModalProps {
    listing: Listing | null
    onClose: () => void;
}

export function ListingModal({ listing, onClose }: ListingModalProps) {
    return (
        <Dialog open={listing !== null} onOpenChange={onClose}>
            <DialogContent showCloseButton={false} className="max-w-2xl p-0 overflow-hidden" initialFocus={false}>
                {listing && (
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative w-full sm:w-64 aspect-[3/4] shrink-0 bg-white dark:bg-black">
                            <Image
                                src={listing.image}
                                alt={listing.cardName}
                                fill
                                sizes="(max-width: 640px) 100vw, 256px"
                            />
                        </div>
                        <ListingModalDetails listing={listing} />
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}