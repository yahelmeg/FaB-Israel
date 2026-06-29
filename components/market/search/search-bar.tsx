"use client"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Field} from "@/components/ui/field"
import { FiSearch } from "react-icons/fi";
import React from "react";


interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit?: (e: React.SubmitEvent) => void;
    placeholder?: string;
}

export function SearchBar( { value, onChange, onSubmit, placeholder } : SearchBarProps ) {

    return (
        <form onSubmit={onSubmit} className="w-full max-w-3xl flex gap-2">
            <Field orientation="horizontal" className="bg-muted rounded-lg" >
                <Input type="search"
                       placeholder={placeholder}
                       value={value}
                       onChange={ (e) => onChange(e.target.value)}
                       className="h-10 text-xs md:text-lg"
                />
            </Field>
            <Button type="submit" variant="outline" aria-label="Search" className="cursor-pointer bg-muted h-10 w-10">
                <FiSearch />
            </Button>
        </form>
    )
}


