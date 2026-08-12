import {LoginSuccessToast} from "@/components/auth/login-success-toast";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Home Page",
    description: "Buy, sell, and trade Flesh and Blood TCG cards with the Israeli community. Browse listings, find events, and connect with local players.",
};

export default function HomePage() {
    return (
        <>
            <LoginSuccessToast/>
            <div className="page-layout">
                <h2 className="page-heading-text mb-8">
                    Work in Progress
                </h2>
            </div>
        </>
    )
}

