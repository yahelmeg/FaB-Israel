export function formatPrice ( price: number) {
    return `₪${new Intl.NumberFormat('en-IL', {minimumFractionDigits: 0, maximumFractionDigits: 2}).format(price)}`
}

export function buildWhatsAppUrl(phoneNumber: string, cardName: string): string {
    const message = encodeURIComponent(`Hi! I'm interested in your ${cardName} listing.`);
    return `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
}