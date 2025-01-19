export enum CardType {
    CREDIT = 'credit',
    DEBIT = 'debit',
    OTHER = 'other'
}

export interface Card {
    _id: string;
    cardName: string;
    cardholderName: string;
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    cvv: string;
    cardType: CardType;
    cardBrand: string;
    category: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}
