"use client";

import { useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";
import { ListingCard } from "@/components/market/listings/listing-card";
import type { ListingBase } from "@/types/listings/Listing";


interface RecentListingsCarouselProps {
    listings: ListingBase[];
    mode: "buy" | "sell";
}

export function RecentListingsCarousel( {listings, mode} : RecentListingsCarouselProps) {

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

    const carouselTitle = mode === "buy" ? "Recent Buy Requests" : "Recent Sell Listings";

    return (
        <div className="w-full space-y-3 items-center">
            <h2 className="text-md sm:text-xl font-bold px-1 text-center">{carouselTitle}</h2>
            <Carousel
                opts={{loop: true, align: "start"}}
                plugins={[plugin]}
                className="w-full"
            >
                <CarouselContent>
                    {listings.map((listing) => (
                        <CarouselItem key={listing.id}
                                      className="pl-3 sm:pl-4 basis-[42%] xs:basis-[38%] sm:basis-[220px] shrink-0">
                            <ListingCard
                                listing={listing}
                                onClick={() => {
                                    const params = new URLSearchParams({q: listing.cardName, tab: mode});
                                    router.push(`/market?${params.toString()}`);
                                }}
                                variant="carousel"
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
}

