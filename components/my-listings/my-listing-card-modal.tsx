"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Listing } from "@/types/listings/Listing"
import { updatePriceAction, updateQuantityAction, markFulfilledAction, deleteListingAction, ListingFormState } from "@/app/actions/listings.actions"
import { QuantityInput } from "@/components/market/sell/quantity-input"
import {AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction,} from "@/components/ui/alert-dialog"

interface MyListingActionsDialogProps {
    listing: Listing
    open: boolean
    onClose: () => void
}

export function MyListingCardModal({ listing, open, onClose }: MyListingActionsDialogProps) {
    const [price, setPrice] = useState(listing.price.toString())
    const [quantity, setQuantity] = useState(listing.quantity.toString())
    const [error, setError] = useState<string | null>(null)
    const [isSaving, setIsSaving] = useState(false)
    const [confirmingDelete, setConfirmingDelete] = useState(false)


    const priceChanged = price !== listing.price.toString()
    const quantityChanged = quantity !== listing.quantity.toString()

    async function runAction(
        action: () => Promise<ListingFormState>,
        fallbackErrorMessage: string,
        successMessage: string
    ): Promise<boolean> {
        const result = await action()
        if (result.fieldErrors) {
            setError(Object.values(result.fieldErrors)[0] ?? fallbackErrorMessage)
            return false
        }
        toast.success(successMessage)
        return true
    }

    const handleSave = async () => {
        if (!priceChanged && !quantityChanged) {
            onClose()
            return
        }

        setIsSaving(true)
        setError(null)

        const calls: Promise<ListingFormState>[] = []
        if (priceChanged) calls.push(updatePriceAction(listing.id, Number(price)))
        if (quantityChanged) calls.push(updateQuantityAction(listing.id, Number(quantity)))

        const results = await Promise.all(calls)

        setIsSaving(false)

        const failed = results.find((r) => r.fieldErrors)
        if (failed?.fieldErrors) {
            setError(Object.values(failed.fieldErrors)[0] ?? "Failed to save changes")
            return
        }

        toast.success("Listing updated")
        onClose()
    }

    const handleMarkFulfilled = async () => {
        const success = await runAction(
            () => markFulfilledAction(listing.id),
            "Failed to mark as sold",
            "Listing marked as sold"
        )
        if (success) {
            onClose()
        }
    }

    const handleConfirmDelete  = async () => {
        const success = await runAction(
            () => deleteListingAction(listing.id),
            "Failed to delete listing",
            "Listing deleted"
        )
        setConfirmingDelete(false)
        if (success) {
            onClose()
        }
    }

    return (
        <>
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
                        </div>

                        <QuantityInput quantity={quantity} onQuantityChange={setQuantity} />

                        {error && <p className="text-sm text-destructive">{error}</p>}

                        <Button size="sm" onClick={handleSave} disabled={isSaving}>
                            {isSaving ? "Saving..." : "Save changes"}
                        </Button>

                        <Separator />

                        <div className="flex flex-col gap-2">
                            <Button
                                onClick={handleMarkFulfilled}
                            >
                                Mark as sold
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={() => setConfirmingDelete(true) }
                            >
                                Delete listing
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <AlertDialog open={confirmingDelete} onOpenChange={setConfirmingDelete}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete this listing?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently remove {listing.cardName} from the marketplace. This can&apos;t be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            </>
    )
}