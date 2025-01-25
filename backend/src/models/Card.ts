import { Schema, model, Document } from 'mongoose';
import { IUser } from './User';

export enum CardType {
    CREDIT = 'credit',
    DEBIT = 'debit',
    OTHER = 'other'
}

export interface ICard extends Document {
    user: IUser['_id'];
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
    spendingLimit: number;
    currentSpending: number;
    notificationSettings: {
        expiryNotification: {
            enabled: boolean;
            daysBeforeExpiry: number;
            lastNotified: Date;
        };
        spendingNotification: {
            enabled: boolean;
            threshold: number;
            lastNotified: Date;
        }
    };
    createdAt: Date;
    updatedAt: Date;
}

const CardSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cardName: {
        type: String,
        required: true
    },
    cardholderName: {
        type: String,
        required: true
    },
    cardNumber: {
        type: String,
        required: true
    },
    expiryMonth: {
        type: String,
        required: true
    },
    expiryYear: {
        type: String,
        required: true
    },
    cvv: {
        type: String,
        required: true
    },
    cardType: {
        type: String,
        enum: Object.values(CardType),
        default: CardType.CREDIT
    },
    cardBrand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: 'personal'
    },
    notes: {
        type: String
    },
    spendingLimit: {
        type: Number,
        default: 0
    },
    currentSpending: {
        type: Number,
        default: 0
    },
    notificationSettings: {
        expiryNotification: {
            enabled: { type: Boolean, default: true },
            daysBeforeExpiry: { type: Number, default: 30 },
            lastNotified: { type: Date }
        },
        spendingNotification: {
            enabled: { type: Boolean, default: true },
            threshold: { type: Number, default: 80 }, 
            lastNotified: { type: Date }
        }
    }
}, {
    timestamps: true
});

CardSchema.virtual('isExpiringSoon').get(function() {
    const today = new Date();
    const expiryDate = new Date(
        parseInt(`20${this.expiryYear}`), 
        parseInt(this.expiryMonth) - 1
    );
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= this.notificationSettings.expiryNotification.daysBeforeExpiry;
});

CardSchema.virtual('spendingStatus').get(function() {
    if (!this.spendingLimit) return null;
    const percentage = (this.currentSpending / this.spendingLimit) * 100;
    return {
        percentage,
        isNearLimit: percentage >= this.notificationSettings.spendingNotification.threshold
    };
});

export default model<ICard>('Card', CardSchema);
