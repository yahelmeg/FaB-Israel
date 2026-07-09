import { AuthForm } from "@/components/auth/auth-form"


interface AuthPageProps {
    searchParams: Promise< {error?: string}>
}

export default async function AuthPage({searchParams} : AuthPageProps) {
    const {error} = await searchParams
    const errorMessage = error
        ? "Something went wrong signing you in. Please try again."
        : undefined
    return (
        <div className="page-layout">
            <AuthForm errorMessage={errorMessage} />
        </div>
    )
}

