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
            <DialogContent showCloseButton={false} className="!w-[90vw] sm:!w-[600px] md:!w-[700px] !max-w-none !max-h-[80vh] overflow-y-auto p-4 md:p-0" initialFocus={false}>
                {listing && (
                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="hidden md:block relative w-full sm:w-80 aspect-[3/4] shrink-0 bg-white dark:bg-black">
                            <Image
                                src={listing.image}
                                alt={listing.cardName}
                                fill
                                sizes="(max-width: 640px) 100vw, 360px"
                            />
                        </div>
                        <ListingModalDetails listing={listing}/>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}