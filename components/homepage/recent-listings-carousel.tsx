"use client";

import { useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";
import { ListingCard } from "@/components/market/listings/listing-card";
import type { ListingBase } from "@/types/listings/Listing";


interface RecentListingsCarouselProps {
    listings: ListingBase[];
}

export function RecentListingsCarousel( {listings} : RecentListingsCarouselProps) {

    const router = useRouter();
    const [plugin] = useState(() =>
        Autoplay({
            delay: 3000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
        })
    );

    if (listings.length === 0) {
        return null;
    }

    return (
        <Carousel
            opts={{ loop: true, align: "start" }}
            plugins={[plugin]}
            className="w-full"
        >
            <CarouselContent>
                {listings.map((listing) => (
                    <CarouselItem key={listing.id} className="basis-[240px] shrink-0">
                        <ListingCard
                            listing={listing}
                            onClick={() => {
                                const params = new URLSearchParams({ q: listing.cardName });
                                router.push(`/market?${params.toString()}`);
                            }}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
}

