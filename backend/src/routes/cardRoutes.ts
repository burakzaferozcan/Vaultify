import { Router } from 'express';
import { CardController } from '../controllers/cardController';
import { auth } from '../middleware/auth';

const router = Router();

// All routes are protected with auth middleware
router.use(auth);

// Create a new card
router.post('/', CardController.createCard);

// Get all cards for the authenticated user
router.get('/', CardController.getUserCards);

// Get a specific card by ID
router.get('/:cardId', CardController.getCardById);

// Update a card
router.put('/:cardId', CardController.updateCard);

// Delete a card
router.delete('/:cardId', CardController.deleteCard);

export default router;
