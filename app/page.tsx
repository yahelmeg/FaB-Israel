import {LoginSuccessToast} from "@/components/auth/login-success-toast";

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

