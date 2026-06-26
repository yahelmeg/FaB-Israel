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
            <DialogContent showCloseButton={false} maxWidth="sm:max-w-[600px] md:max-w-[700px]" className="w-[95vw] sm:w-[600px] md:w-[700px] h-[450px] md:h-[450px] p-4 md:p-0 overflow-hidden" initialFocus={false}>
                {listing && (
                    <div className="flex flex-col md:flex-row gap-3 h-full min-h-0">
                        <div className="hidden md:block relative w-80 h-full shrink-0 bg-white dark:bg-black">
                            <Image src={listing.image} alt={listing.cardName} fill className="object-cover" />
                        </div>
                        <div className="flex-1 h-full overflow-y-auto p-0 md:p-6">
                            <ListingModalDetails listing={listing}/>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}