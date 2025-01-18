import { Request, Response } from 'express';
import { CardService } from '../services/cardService';
import { validateCardData } from '../utils/validation';

export class CardController {
    static async createCard(req: Request, res: Response) {
        try {
            const userId = req.user.id;
            const cardData = req.body;

            // Validate card data
            const validationError = validateCardData(cardData);
            if (validationError) {
                return res.status(400).json({ error: validationError });
            }

            const card = await CardService.createCard(userId, cardData);
            res.status(201).json(card);
        } catch (error) {
            console.error('Error creating card:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async getUserCards(req: Request, res: Response) {
        try {
            const userId = req.user.id;
            const cards = await CardService.getUserCards(userId);
            res.json(cards);
        } catch (error) {
            console.error('Error fetching cards:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async getCardById(req: Request, res: Response) {
        try {
            const userId = req.user.id;
            const cardId = req.params.cardId;

            const card = await CardService.getCardById(userId, cardId);
            if (!card) {
                return res.status(404).json({ error: 'Card not found' });
            }

            res.json(card);
        } catch (error) {
            console.error('Error fetching card:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async updateCard(req: Request, res: Response) {
        try {
            const userId = req.user.id;
            const cardId = req.params.cardId;
            const updateData = req.body;

            // Validate update data
            const validationError = validateCardData(updateData, true);
            if (validationError) {
                return res.status(400).json({ error: validationError });
            }

            const updatedCard = await CardService.updateCard(userId, cardId, updateData);
            if (!updatedCard) {
                return res.status(404).json({ error: 'Card not found' });
            }

            res.json(updatedCard);
        } catch (error) {
            console.error('Error updating card:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async deleteCard(req: Request, res: Response) {
        try {
            const userId = req.user.id;
            const cardId = req.params.cardId;

            const deleted = await CardService.deleteCard(userId, cardId);
            if (!deleted) {
                return res.status(404).json({ error: 'Card not found' });
            }

            res.status(204).send();
        } catch (error) {
            console.error('Error deleting card:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
