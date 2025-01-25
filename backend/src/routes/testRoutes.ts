import express from 'express';
import { NotificationService } from '../services/notificationService';
import { emailService } from '../services/emailService';

const router = express.Router();

// Test expiry notifications
router.post('/test-expiry-notification', async (req, res) => {
    try {
        await NotificationService.checkExpiringCards();
        res.json({ message: 'Expiry notification check triggered successfully' });
    } catch (error) {
        console.error('Error triggering expiry notifications:', error);
        res.status(500).json({ error: 'Failed to trigger expiry notifications' });
    }
});

// Test spending limit notifications
router.post('/test-spending-notification', async (req, res) => {
    try {
        await NotificationService.checkSpendingLimits();
        res.json({ message: 'Spending notification check triggered successfully' });
    } catch (error) {
        console.error('Error triggering spending notifications:', error);
        res.status(500).json({ error: 'Failed to trigger spending notifications' });
    }
});

// Test direct email sending
router.post('/test-email', async (req, res) => {
    try {
        await emailService.sendExpiryNotification(
            req.body.email,
            'Test Card',
            7
        );
        res.json({ message: 'Test email sent successfully' });
    } catch (error) {
        console.error('Error sending test email:', error);
        res.status(500).json({ error: 'Failed to send test email' });
    }
});

export default router;
