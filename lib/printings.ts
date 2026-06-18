import {PrintingTypes} from "@/types/PrintingTypes";


export const printingStyles: Record<PrintingTypes, string> = {
    "GF": "bg-yellow-400 text-black border-transparent hover:bg-yellow-300/90",
    "CF": "bg-slate-400 text-black border-transparent hover:bg-slate-300/90",
    "RF": "bg-purple-400 text-black border-transparent hover:bg-purple-300/90",
    "NF": "bg-neutral-300 text-black border-transparent hover:bg-neutral-200/90",
}

export const printingTitles: Record<PrintingTypes, string> = {
    "GF": "Gold Foil",
    "CF": "Cold Foil",
    "RF": "Rainbow Foil",
    "NF": "Non Foil",
}

export const printingDescriptions: Record<PrintingTypes, string> = {
    "GF": "Rarest printing - Cold foil variant with a Gold border. Only given out as a prizes for national tournament winners and T3/T4 events finalists.",
    "CF": "Matte, metallic or frosty foiling usually applied to the card border, weapons and equipment.",
    "RF": "Glossy, chromatic shine that displays a full spectrum of colors when tilted under light.",
    "NF": "Standard card printing with no foil treatment.",
}