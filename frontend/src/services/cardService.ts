import { Card } from '@/types/card';
import axios from '@/lib/axios';

export const cardService = {
    async getAllCards(): Promise<Card[]> {
        const response = await axios.get('/cards');
        return response.data;
    },

    async getCard(id: string): Promise<Card> {
        const response = await axios.get(`/cards/${id}`);
        return response.data;
    },

    async createCard(cardData: Omit<Card, '_id' | 'createdAt' | 'updatedAt'>): Promise<Card> {
        const response = await axios.post('/cards', cardData);
        return response.data;
    },

    async updateCard(id: string, cardData: Partial<Card>): Promise<Card> {
        const response = await axios.put(`/cards/${id}`, cardData);
        return response.data;
    },

    async deleteCard(id: string): Promise<void> {
        await axios.delete(`/cards/${id}`);
    }
};
