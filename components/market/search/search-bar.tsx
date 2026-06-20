import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Field} from "@/components/ui/field"
import { FiSearch } from "react-icons/fi";


export function SearchBar() {
    return (
        <Field orientation="horizontal">
            <Input type="search" placeholder="Search Flesh and Blood cards..."/>
            <Button aria-label="Search">
                <FiSearch />
            </Button>
        </Field>
    )
}


