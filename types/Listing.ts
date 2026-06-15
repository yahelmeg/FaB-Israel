

export interface Listing {
    id: string;
    price: number;
    image: string;
    condition: "Near Mint" | "Light Played" | "Poor";
    foiling: "Non Foil" | "Rainbow Foil" | "Cold Foil" | "Gold Foil";
    set: string;
}