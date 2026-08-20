import {LoginSuccessToast} from "@/components/auth/login-success-toast";
import type {Metadata} from "next";
import {RecentListingsCarousel} from "@/components/homepage/recent-listings-carousel";
import {getListingsForHomepageCarousel} from "@/lib/services/listings.service";
import {shuffle} from "@/lib/shuffle";
import {Logo} from "@/components/homepage/logo";

export const metadata: Metadata = {
    title: "Home Page",
    description: "Buy, sell, and trade Flesh and Blood TCG cards with the Israeli community. Browse listings, find events, and connect with local players.",
};

export default async function HomePage() {
    const listings = await getListingsForHomepageCarousel();
    const shuffledListings = shuffle(listings);
    return (
        <>
            <LoginSuccessToast/>
            <Logo/>
            <div>
                <RecentListingsCarousel listings={shuffledListings}/>
            </div>
        </>
    )
}

