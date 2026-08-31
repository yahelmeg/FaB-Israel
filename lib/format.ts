export function formatPrice ( price: number) : string {
    return `₪${new Intl.NumberFormat('en-IL', {minimumFractionDigits: 0, maximumFractionDigits: 2}).format(price)}`
}

export function buildWhatsAppUrl(phoneNumber: string, cardName: string, mode: string): string {
    const internationalNumber = "972" + phoneNumber.replace(/^0/, "")
    const message = mode === "sell" ?
        encodeURIComponent(`Hi! I'm interested in purchasing your ${cardName}.`)
        : encodeURIComponent(`Hi! I'm interested in selling my ${cardName}.`)
    return `https://api.whatsapp.com/send?phone=${internationalNumber}&text=${message}`
}

export function buildTcgPlayerUrl( cardName: string ) : string {
    return `https://www.tcgplayer.com/search/flesh-and-blood-tcg/product?q=${encodeURIComponent(cardName)}`
}

export function buildCardMarketUrl( cardName: string ) : string {
    return `https://www.cardmarket.com/en/FleshAndBlood/Products/Search?searchString=${encodeURIComponent(cardName)}`
}