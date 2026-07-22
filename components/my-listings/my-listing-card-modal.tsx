"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Listing } from "@/types/Listing"
import { updateMyListingPrice } from "@/lib/listings/update-my-listing-price"
import { markMyListingFulfilled, removeMyListing } from "@/lib/listings/update-my-listing-status"

interface MyListingActionsDialogProps {
    listing: Listing
    open: boolean
    onClose: () => void
}

export function MyListingCardModal({ listing, open, onClose }: MyListingActionsDialogProps) {
    const [price, setPrice] = useState(listing.price.toString())
    const [isSaving, setIsSaving] = useState(false)


    const handleSavePrice = async () => {
        setIsSaving(true)
        const { error } = await updateMyListingPrice(listing.id, Number(price))
        setIsSaving(false)
        if (!error) {
            onClose()
        }
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-xs">
                <div className="flex flex-col gap-4 p-4">
                    <div>
                        <p className="font-semibold text-lg">{listing.cardName}</p>
                        <p className="text-sm text-muted-foreground">{listing.set}</p>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-muted-foreground">Price</label>
                        <div className="relative">
                            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                ₪
                            </span>
                            <Input
                                type="text"
                                inputMode="decimal"
                                value={price}
                                onChange={(e) => {
                                    const raw = e.target.value
                                    if (raw.length <= 6 && /^\d*\.?\d{0,2}$/.test(raw)) {
                                        setPrice(raw)
                                    }
                                }}
                                className="pl-7"
                            />
                        </div>
                        <Button size="sm" onClick={handleSavePrice} disabled={isSaving}>
                            {isSaving ? "Saving..." : "Save price"}
                        </Button>
                    </div>
                    <Separator />

                    <div className="flex flex-col gap-2">
                        <Button
                            onClick={async () => { onClose(); await markMyListingFulfilled(listing.id) }}
                        >
                            Mark as sold
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={async () => { onClose(); await removeMyListing(listing.id) }}
                        >
                            Delete listing
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}