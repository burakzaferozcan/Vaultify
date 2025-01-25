import Card from "../models/Card";
import { User } from "../models/User";
import { emailService } from "./emailService";

export class NotificationService {
  static async checkExpiringCards() {
    try {
      console.log('Starting expiry check...');
      const cards = await Card.find({
        "notificationSettings.expiryNotification.enabled": true,
      });
      console.log('Found cards:', cards.length);

      for (const card of cards) {
        console.log(`Checking card: ${card.cardName}`);
        console.log('Is expiring soon:', card.isExpiringSoon);
        console.log('Last notified:', card.notificationSettings.expiryNotification.lastNotified);
        
        if (
          card.isExpiringSoon &&
          this.shouldNotify(
            card.notificationSettings.expiryNotification.lastNotified
          )
        ) {
          console.log(`Card ${card.cardName} needs notification`);
          const user = await User.findById(card.userId);
          if (!user) {
            console.log('User not found for card:', card.cardName);
            continue;
          }
          console.log('Found user:', user.email);

          const today = new Date();
          const expiryDate = new Date(
            parseInt(`20${card.expiryYear}`),
            parseInt(card.expiryMonth) - 1
          );
          const daysUntilExpiry = Math.ceil(
            (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
          );
          console.log('Days until expiry:', daysUntilExpiry);

          await emailService.sendExpiryNotification(
            user.email,
            card.cardName,
            daysUntilExpiry
          );
          console.log('Email sent successfully');

          card.notificationSettings.expiryNotification.lastNotified = new Date();
          await card.save();
          console.log('Card updated with new notification timestamp');
        } else {
          console.log(`Card ${card.cardName} does not need notification`);
        }
      }
    } catch (error) {
      console.error('Error checking expiring cards:', error);
    }
  }

  static async checkSpendingLimits() {
    try {
      console.log('Starting spending limit check...');
      const cards = await Card.find({
        "notificationSettings.spendingNotification.enabled": true,
        spendingLimit: { $gt: 0 },
      });
      console.log('Found cards:', cards.length);

      for (const card of cards) {
        console.log(`Checking card: ${card.cardName}`);
        const status = card.spendingStatus;
        console.log('Spending status:', status);
        console.log('Last notified:', card.notificationSettings.spendingNotification.lastNotified);

        if (
          status?.isNearLimit &&
          this.shouldNotify(
            card.notificationSettings.spendingNotification.lastNotified
          )
        ) {
          console.log(`Card ${card.cardName} needs notification`);
          const user = await User.findById(card.userId);
          if (!user) {
            console.log('User not found for card:', card.cardName);
            continue;
          }
          console.log('Found user:', user.email);

          const percentage = Math.round(
            (card.currentSpending / card.spendingLimit) * 100
          );
          console.log('Spending percentage:', percentage);

          await emailService.sendSpendingLimitNotification(
            user.email,
            card.cardName,
            percentage,
            card.spendingLimit
          );
          console.log('Email sent successfully');

          card.notificationSettings.spendingNotification.lastNotified = new Date();
          await card.save();
          console.log('Card updated with new notification timestamp');
        } else {
          console.log(`Card ${card.cardName} does not need notification`);
        }
      }
    } catch (error) {
      console.error('Error checking spending limits:', error);
    }
  }

  private static shouldNotify(lastNotified?: Date): boolean {
    if (!lastNotified) return true;

    const now = new Date();
    const daysSinceLastNotification = Math.floor(
      (now.getTime() - lastNotified.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Notify once every 3 days
    return daysSinceLastNotification >= 3;
  }
}
