import nodemailer from "nodemailer";
import { config } from "../config";

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.emailAddress,
        pass: config.emailPassword,
      },
    });
  }

  async sendExpiryNotification(
    email: string,
    cardName: string,
    daysUntilExpiry: number
  ) {
    const mailOptions = {
      from: config.emailAddress,
      to: email,
      subject: `Card Expiry Alert - ${cardName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Card Expiry Notification</h2>
          <p style="color: #666; font-size: 16px;">Your card <strong>${cardName}</strong> will expire in ${daysUntilExpiry} days.</p>
          <div style="background-color: #f8f8f8; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="color: #666; margin: 0;">Please take necessary action to ensure uninterrupted service.</p>
          </div>
          <p style="color: #888; font-size: 14px;">This is an automated notification from Vaultify.</p>
        </div>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(
        `Expiry notification email sent to ${email} for card ${cardName}`
      );
    } catch (error) {
      console.error("Error sending expiry notification email:", error);
      throw error;
    }
  }

  async sendSpendingLimitNotification(
    email: string,
    cardName: string,
    percentage: number,
    limit: number
  ) {
    const mailOptions = {
      from: config.emailAddress,
      to: email,
      subject: `Spending Limit Alert - ${cardName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Spending Limit Alert</h2>
          <p style="color: #666; font-size: 16px;">Your card <strong>${cardName}</strong> has reached ${percentage}% of its spending limit.</p>
          <div style="background-color: #f8f8f8; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="color: #666; margin: 0;">Current spending limit: $${limit.toLocaleString()}</p>
            <div style="background-color: #eee; height: 20px; border-radius: 10px; margin: 10px 0;">
              <div 
                style="background-color: ${
                  percentage >= 80
                    ? "#ff4444"
                    : percentage >= 50
                    ? "#ffbb33"
                    : "#00C851"
                }; 
                       height: 100%; 
                       width: ${percentage}%; 
                       border-radius: 10px;"
              ></div>
            </div>
          </div>
          <p style="color: #888; font-size: 14px;">This is an automated notification from Vaultify.</p>
        </div>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(
        `Spending limit notification email sent to ${email} for card ${cardName}`
      );
    } catch (error) {
      console.error("Error sending spending limit notification email:", error);
      throw error;
    }
  }
}

export const emailService = new EmailService();
