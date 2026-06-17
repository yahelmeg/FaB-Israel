import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ListingModalDetails } from "@/components/listings/listing-modal-details";
import { Listing } from "@/types/Listing"


interface ListingModalProps {
    listing: Listing | null
    onClose: () => void;
}

export function ListingModal({ listing, onClose }: ListingModalProps) {
    return (
        <Dialog open={listing !== null} onOpenChange={onClose}>
            <DialogContent showCloseButton={false} className="max-w-2xl p-0 overflow-hidden">
                {listing && (
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative w-full sm:w-64 aspect-[3/4] shrink-0 bg-white">
                            <Image
                                src={listing.image}
                                alt={listing.cardName}
                                fill
                            />
                        </div>
                        <ListingModalDetails listing={listing} />
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}