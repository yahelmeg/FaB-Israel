"use client"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Field} from "@/components/ui/field"
import { FiSearch } from "react-icons/fi";
import React, { useState } from "react";
import { useRouter } from "next/navigation"


interface SearchBarProps {
    defaultValue?: string
}

export function SearchBar( {defaultValue = ""} : SearchBarProps ) {

    const [query, setQuery] = useState(defaultValue);
    const router = useRouter()

    const handleSubmit = (e: React.SubmitEvent ) => {
        e.preventDefault()
        router.push(`?q=${encodeURIComponent(query)}`)
    }
    return (
        <form onSubmit={handleSubmit} className="w-full max-w-3xl flex gap-2">
            <Field orientation="horizontal" className="bg-muted rounded-sm" >
                <Input type="search"
                       placeholder="Search Flesh and Blood cards..."
                       value={query}
                       onChange={(e) => setQuery(e.target.value)}
                       className="h-10 !text-lg"
                />
            </Field>
            <Button type="submit" variant="outline" aria-label="Search" className="cursor-pointer bg-muted h-10 w-10">
                <FiSearch />
            </Button>
        </form>
    )
}


