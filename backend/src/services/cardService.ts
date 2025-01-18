import Card, { ICard, CardType } from '../models/Card';
import { Types } from 'mongoose';
import { encryptData, decryptData } from '../utils/encryption';

interface CardResponse {
    _id: string;
    user: string;
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

export class CardService {
    static async createCard(userId: string, cardData: Partial<ICard>): Promise<CardResponse> {
        // Encrypt sensitive data
        const encryptedCard = {
            ...cardData,
            cardNumber: encryptData(cardData.cardNumber!),
            cvv: encryptData(cardData.cvv!),
        };

        const card = new Card({
            ...encryptedCard,
            user: new Types.ObjectId(userId)
        });

        const savedCard = await card.save();
        const cardObj = savedCard.toObject();
        
        return {
            ...cardObj,
            cardNumber: decryptData(cardObj.cardNumber),
            cvv: decryptData(cardObj.cvv),
            user: cardObj.user.toString()
        };
    }

    static async getUserCards(userId: string): Promise<CardResponse[]> {
        const cards = await Card.find({ user: new Types.ObjectId(userId) });
        return cards.map(card => {
            const cardObj = card.toObject();
            return {
                ...cardObj,
                cardNumber: decryptData(cardObj.cardNumber),
                cvv: decryptData(cardObj.cvv),
                user: cardObj.user.toString()
            };
        });
    }

    static async getCardById(userId: string, cardId: string): Promise<CardResponse | null> {
        const card = await Card.findOne({
            _id: new Types.ObjectId(cardId),
            user: new Types.ObjectId(userId)
        });

        if (!card) return null;

        const cardObj = card.toObject();
        return {
            ...cardObj,
            cardNumber: decryptData(cardObj.cardNumber),
            cvv: decryptData(cardObj.cvv),
            user: cardObj.user.toString()
        };
    }

    static async updateCard(userId: string, cardId: string, updateData: Partial<ICard>): Promise<CardResponse | null> {
        // Encrypt sensitive data if provided
        const encryptedData = { ...updateData };
        if (updateData.cardNumber) {
            encryptedData.cardNumber = encryptData(updateData.cardNumber);
        }
        if (updateData.cvv) {
            encryptedData.cvv = encryptData(updateData.cvv);
        }

        const card = await Card.findOneAndUpdate(
            {
                _id: new Types.ObjectId(cardId),
                user: new Types.ObjectId(userId)
            },
            { $set: encryptedData },
            { new: true }
        );

        if (!card) return null;

        const cardObj = card.toObject();
        return {
            ...cardObj,
            cardNumber: decryptData(cardObj.cardNumber),
            cvv: decryptData(cardObj.cvv),
            user: cardObj.user.toString()
        };
    }

    static async deleteCard(userId: string, cardId: string): Promise<boolean> {
        const result = await Card.deleteOne({
            _id: new Types.ObjectId(cardId),
            user: new Types.ObjectId(userId)
        });

        return result.deletedCount === 1;
    }
}
