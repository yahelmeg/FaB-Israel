import { createClient } from "@/lib/supabase/server"
import { CreateListingInput, UpdateListingInput } from "@/lib/validators/listings.validator"
import {ListingSortField} from "@/types/listings/ListingSortField";

export type ListingRowBase = {
    id: string
    price: number
    image: string
    condition: string
    foiling: string
    set_code: string
    card_name: string
    language: string
    tcgplayer_url: string | null
    quantity: number
    status: "active" | "fulfilled"
    seller_id: string
    created_at: string
}

export type ListingRow = ListingRowBase & {
    seller_name: string
    seller_phone_number: string
    seller_discord: string
}

type SellerProfile = {
    seller_id: string;
    display_name: string;
    phone_number: string;
    discord_username: string;
};

type ListingRowWithProfileJoin = ListingRowBase & {
    profiles: SellerProfile | SellerProfile[] | null;
};

function mapRowWithProfile({ profiles, ...baseRow }: ListingRowWithProfileJoin): ListingRow {
    const profile = Array.isArray(profiles) ? profiles[0] : profiles;

    return {
        ...baseRow,
        seller_name: profile?.display_name ?? "",
        seller_phone_number: profile?.phone_number ?? "",
        seller_discord: profile?.discord_username ?? "",
    };
}

export type ListingFilters = {
    search?: string
    sortBy?: ListingSortField
    sortOrder?: "asc" | "desc"
}

const LISTING_WITH_SELLER_SELECT = `*, profiles (display_name, phone_number, discord_username)`

export async function getActive(filters: ListingFilters = {}): Promise<ListingRow[]> {
    const supabase = await createClient()
    let query = supabase
        .from("listings")
        .select(LISTING_WITH_SELLER_SELECT)
        .eq("status", "active")

    if (filters.search) {
        query = query.ilike("card_name", `%${filters.search}%`)
    }


    const sortBy = filters.sortBy ?? "created_at"
    const sortOrder = filters.sortOrder ?? "desc"
    query = query.order(sortBy, {ascending: sortOrder !== "desc"})


    const { data, error } = await query

    if (error) {
        throw new Error(`Failed to fetch listings: ${error.message}`)
    }

    return data.map(mapRowWithProfile)
}

export async function getRecentListings(limit = 100): Promise<ListingRowBase[]> {
    const supabase = await createClient()
    const {data, error} = await supabase
        .from("listings")
        .select("*")
        .eq("status", "active")
        .order("created_at", {ascending: false})
        .limit(limit)

    if (error) {
        throw new Error(`Failed to fetch listings: ${error.message}`)
    }
    return data
}

export async function getById(id: string): Promise<ListingRow | null> {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from("listings")
        .select(LISTING_WITH_SELLER_SELECT)
        .eq("id", id)
        .maybeSingle()

    if (error) {
        throw new Error(`Failed to fetch listing ${id}: ${error.message}`)
    }

    return data ? mapRowWithProfile(data) : null
}

export async function getBySeller(sellerId: string, status: "active" | "fulfilled"): Promise<ListingRow[]> {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from("listings")
        .select(LISTING_WITH_SELLER_SELECT)
        .eq("seller_id", sellerId)
        .eq("status", status)

    if (error) {
        throw new Error(`Failed to fetch listings for seller ${sellerId}: ${error.message}`)
    }

    return data.map(mapRowWithProfile)
}

export async function insert(sellerId: string, input: CreateListingInput): Promise<ListingRowBase> {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from("listings")
        .insert({
            seller_id: sellerId,
            card_name: input.cardName,
            set_code: input.setCode,
            image: input.image,
            price: input.price,
            condition: input.condition,
            foiling: input.foiling,
            language: input.language,
            tcgplayer_url: input.tcgplayerUrl,
            quantity: input.quantity,
            status: "active",
        })
        .select()
        .single()

    if (error) {
        throw new Error(`Failed to insert listing: ${error.message}`)
    }

    return data
}

export async function update(id: string, input: UpdateListingInput): Promise<ListingRowBase> {
    const supabase = await createClient()
    const updatePayload: Record<string, unknown> = {}
    if (input.price !== undefined) {
        updatePayload.price = input.price
    }
    if (input.quantity !== undefined) {
        updatePayload.quantity = input.quantity
    }
    if (input.status !== undefined) {
        updatePayload.status = input.status
    }

    const { data, error } = await supabase
        .from("listings")
        .update(updatePayload)
        .eq("id", id)
        .select()
        .maybeSingle()

    if (error) {
        throw new Error(`Failed to update listing ${id}: ${error.message}`)
    }

    return data
}

export async function remove(id: string): Promise<void> {
    const supabase = await createClient()
    const { error } = await supabase
        .from("listings")
        .delete()
        .eq("id", id)

    if (error) {
        throw new Error(`Failed to delete listing ${id}: ${error.message}`)
    }
}