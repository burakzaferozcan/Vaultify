import cron from 'node-cron';
import { NotificationService } from '../services/notificationService';

// Run every day at midnight
export const startNotificationCron = () => {
  cron.schedule('0 0 * * *', async () => {
    console.log('Running notification checks...');
    
    try {
      // Check for expiring cards
      await NotificationService.checkExpiringCards();
      
      // Check spending limits
      await NotificationService.checkSpendingLimits();
      
      console.log('Notification checks completed successfully');
    } catch (error) {
      console.error('Error in notification cron job:', error);
    }
  });
  
  console.log('Notification cron job scheduled');
};
