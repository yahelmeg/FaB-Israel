import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Field} from "@/components/ui/field"
import { FiSearch } from "react-icons/fi";


export function SearchBar() {
    return (
        <Field orientation="horizontal" className="w-full max-w-xl">
            <Input type="search" placeholder="Search Flesh and Blood cards..."/>
            <Button variant="outline" aria-label="Search" className="cursor-pointer">
                <FiSearch />
            </Button>
        </Field>
    )
}


