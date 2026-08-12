"use client"

import { useEffect } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { toast } from "sonner"

export function LoginSuccessToast() {

    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {

        if (searchParams.get("success") !== "true") {
            return
        }
        toast.success("Signed in successfully!")
        const params = new URLSearchParams(searchParams)
        params.delete("success")
        const query = params.toString()
        router.replace(query ? `${pathname}?${query}` : pathname)
    }, [searchParams, router, pathname])

    return null
}