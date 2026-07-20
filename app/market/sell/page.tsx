import {SellListingForm} from "@/components/market/sell/sell-listing-form";
import {requireCompletedProfile} from "@/lib/auth-helpers/require-completed-profile";

export default async function MarketSellPage() {

    await requireCompletedProfile()

    return (
        <div className="page-layout">
            <h2 className="page-heading-text mb-8">
                List a card for sale
            </h2>
            <SellListingForm/>
        </div>

    );
}