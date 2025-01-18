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
    }
}, {
    timestamps: true
});

export default model<ICard>('Card', CardSchema);
