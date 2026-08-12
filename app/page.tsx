"use client"


import {LoginSuccessToast} from "@/components/auth/login-success-toast";
import {toast} from "sonner";

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

