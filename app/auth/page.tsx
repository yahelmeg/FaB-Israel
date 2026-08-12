import { AuthForm } from "@/components/auth/auth-form"
import type {Metadata} from "next";


export const metadata: Metadata = {
    title: "Sign In",
    description: "Sign in to FaB-Israel with your Google account to buy, sell, and trade cards.",
};

interface AuthPageProps {
    searchParams: Promise<{ error?: string }>
}

const ERROR_MESSAGES: Record<string, string> = {
    auth: "Something went wrong signing you in. Please try again later.",
    profile: "We couldn't load your profile. Please try again later.",
}

export default async function AuthPage({ searchParams }: AuthPageProps) {
    const { error } = await searchParams
    const errorMessage = error ? (ERROR_MESSAGES[error] ?? "Something went wrong. Please try again.") : undefined

    return (
        <div className="page-layout">
            <AuthForm errorMessage={errorMessage} />
        </div>
    )
}