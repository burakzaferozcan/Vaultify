export enum CardType {
  CREDIT = "credit",
  DEBIT = "debit"
}

export interface Card {
  _id: string;
  userId: string;
  cardName: string;
  cardholderName: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  cardBrand: string;
  cardType: CardType;
  category: "personal" | "business" | "shopping" | "travel";
  notes?: string;
  spendingLimit: number;
  currentSpending: number;
  notificationSettings: {
    expiryNotification: {
      enabled: boolean;
      daysBeforeExpiry: number;
      lastNotified?: Date;
    };
    spendingNotification: {
      enabled: boolean;
      threshold: number;
      lastNotified?: Date;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface CardFormData {
  cardName: string;
  cardholderName: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  cardBrand: string;
  cardType: CardType;
  category: "personal" | "business" | "shopping" | "travel";
  notes?: string;
  spendingLimit?: number;
  notificationSettings: {
    expiryNotification: {
      enabled: boolean;
      daysBeforeExpiry: number;
    };
    spendingNotification: {
      enabled: boolean;
      threshold: number;
    };
  };
}
