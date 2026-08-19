
import {Listing, ListingBase} from "@/types/listings/Listing"
import * as listingRepository from "@/lib/repositories/listings.repository"
import {toListing, toListingBase} from "@/lib/mappers/listings.mapper";
import {CreateListingInput} from "@/lib/validators/listings.validator";
import {ListingFilters} from "@/lib/repositories/listings.repository";
import { requireProfile} from "@/lib/auth/require-profile";

export async function getListings(filters: ListingFilters): Promise<Listing[]> {
    const rows = await listingRepository.getActive(filters)
    return rows.map(toListing)
}

export async function getListingsForHomepageCarousel(): Promise<ListingBase[]> {
    const rows = await listingRepository.getRecentListings()
    return rows.map(toListingBase)
}


export async function getById(id: string): Promise<Listing | null> {
    const row = await listingRepository.getById(id)
    return row ? toListing(row) : null

}

export async function getMyListings(status: "active" | "fulfilled"): Promise<Listing[]> {
    const { id: sellerId } = await requireProfile()
    const rows = await listingRepository.getBySeller(sellerId, status)
    return rows.map(toListing)
}

export async function createListing(input: CreateListingInput): Promise<ListingBase> {
    const { id: sellerId } = await requireProfile()
    const row = await listingRepository.insert(sellerId, input)
    return toListingBase(row)
}

async function requireOwnedListing(id: string, sellerId: string) {
    const existing = await listingRepository.getById(id)
    if (!existing) {
        throw new Error("Listing not found")
    }
    if (existing.seller_id !== sellerId) {
        throw new Error("Not authorized to modify this listing")
    }
    return existing
}

export async function updatePrice(id: string, price: number): Promise<ListingBase> {
    const { id: sellerId } = await requireProfile()
    await requireOwnedListing(id, sellerId)

    const row = await listingRepository.update(id, { price })
    if (!row) {
        throw new Error("Failed to update price")
    }
    return toListingBase(row)
}

export async function updateQuantity(id: string, quantity: number): Promise<ListingBase> {
    const { id: sellerId } = await requireProfile()
    await requireOwnedListing(id, sellerId)

    const row = await listingRepository.update(id, { quantity })
    if (!row) {
        throw new Error("Failed to update quantity")
    }
    return toListingBase(row)
}

export async function markFulfilled(id: string): Promise<ListingBase> {
    const { id: sellerId } = await requireProfile()
    await requireOwnedListing(id, sellerId)

    const row = await listingRepository.update(id, { status: "fulfilled" })
    if (!row) {
        throw new Error("Failed to mark listing as fulfilled")
    }
    return toListingBase(row)
}

export async function deleteListing(id: string): Promise<void> {
    const { id: sellerId } = await requireProfile()

    const existing = await listingRepository.getById(id)
    if (!existing) {
        throw new Error("Listing not found")
    }
    if (existing.seller_id !== sellerId) {
        throw new Error("Not authorized to delete this listing")
    }

    await listingRepository.remove(id)
}

