import {FoilingType} from "@/types/FoilingType";


export const foilStyles: Record<FoilingType, string> = {
    "CF": "bg-slate-400 text-black border-transparent hover:bg-slate-300/90",
    "GF": "bg-yellow-400 text-black border-transparent hover:bg-yellow-300/90",
    "RF": "bg-purple-400 text-black border-transparent hover:bg-purple-300/90",
    "NF": "bg-neutral-300 text-black border-transparent hover:bg-neutral-200/90",
}

export const foilTitles: Record<FoilingType, string> = {
    "CF": "Cold Foil",
    "GF": "Gold Foil",
    "RF": "Rainbow Foil",
    "NF": "Non Foil",
}