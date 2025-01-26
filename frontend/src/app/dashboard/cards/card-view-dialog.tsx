"use client";

import { Card, CardType } from "@/types/card";
import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

interface CardViewDialogProps {
  card: Card | null;
  onClose: () => void;
}

export function CardViewDialog({ card, onClose }: CardViewDialogProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  if (!card) return null;

  // Format card number with spaces
  const formattedCardNumber = card.cardNumber.replace(/(.{4})/g, "$1 ").trim();

  const cardVariants = {
    initial: { opacity: 0, scale: 0.8 },
    enter: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 1, 1],
      },
    },
  };

  const flipVariants = {
    front: {
      rotateY: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    back: {
      rotateY: 180,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.2,
      },
    },
  };

  return (
    <Dialog.Root open={!!card} onOpenChange={() => onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] rounded-lg p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
          <div className="relative">
            <Dialog.Title className="text-lg font-semibold text-white mb-4">
              {card.cardName}
            </Dialog.Title>
            <Dialog.Close className="absolute right-0 top-0 rounded-sm opacity-70 ring-offset-gray-950 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-gray-800">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Dialog.Close>
          </div>

          <div className="perspective-1000">
            <motion.div
              initial="initial"
              animate="enter"
              exit="exit"
              variants={cardVariants}
              className="relative w-[400px] h-[250px] mx-auto cursor-pointer preserve-3d"
              onClick={() => setIsFlipped(!isFlipped)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                animate={isFlipped ? "back" : "front"}
                variants={flipVariants}
                className="absolute w-full h-full preserve-3d"
              >
                {/* Front of the card */}
                <motion.div
                  className={`absolute w-full h-full rounded-xl p-6 backface-hidden shadow-xl
                    ${
                      card.cardBrand.toLowerCase().includes("visa")
                        ? "bg-gradient-to-br from-blue-900 to-blue-600"
                        : card.cardBrand.toLowerCase().includes("mastercard")
                        ? "bg-gradient-to-br from-red-900 to-red-600"
                        : "bg-gradient-to-br from-gray-900 to-gray-600"
                    }
                  `}
                  initial="hidden"
                  animate="visible"
                  variants={contentVariants}
                >
                  <div className="h-full flex flex-col justify-between">
                    {/* Card Brand Logo */}
                    <div className="flex justify-between items-start">
                      <motion.div
                        className="w-16 h-12 bg-white/30 rounded-md flex items-center justify-center text-white font-bold"
                        whileHover={{ scale: 1.05 }}
                      >
                        {card.cardBrand}
                      </motion.div>
                      <div className="text-white text-sm">
                        {card.cardType === CardType.CREDIT ? "Credit" : "Debit"}
                      </div>
                    </div>

                    {/* Card Number */}
                    <div className="text-2xl text-white font-mono tracking-wider">
                      {formattedCardNumber}
                    </div>

                    {/* Card Holder & Expiry */}
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-white/60 text-xs mb-1">
                          CARD HOLDER
                        </div>
                        <div className="text-white font-medium">
                          {card.cardholderName}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white/60 text-xs mb-1">
                          EXPIRES
                        </div>
                        <div className="text-white font-medium">
                          {card.expiryMonth}/{card.expiryYear}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Back of the card */}
                <motion.div
                  className={`absolute w-full h-full rounded-xl backface-hidden rotate-y-180 shadow-xl
                    ${
                      card.cardBrand.toLowerCase().includes("visa")
                        ? "bg-gradient-to-br from-blue-900 to-blue-600"
                        : card.cardBrand.toLowerCase().includes("mastercard")
                        ? "bg-gradient-to-br from-red-900 to-red-600"
                        : "bg-gradient-to-br from-gray-900 to-gray-600"
                    }
                  `}
                  initial="hidden"
                  animate="visible"
                  variants={contentVariants}
                >
                  <div className="h-full flex flex-col">
                    {/* Magnetic Strip */}
                    <div className="w-full h-12 bg-black/30 mt-4" />

                    {/* CVV Strip */}
                    <div className="mt-4 px-6">
                      <div className="bg-white/90 h-8 rounded flex items-center justify-end px-3">
                        <div className="font-mono text-gray-800">
                          CVV {card.cvv}
                        </div>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-4 px-6 flex-1 flex flex-col">
                      <div className="text-white/60 text-xs mb-1">CATEGORY</div>
                      <div className="text-white text-sm mb-2">
                        {card.category.charAt(0).toUpperCase() +
                          card.category.slice(1)}
                      </div>
                      {card.notes && (
                        <div className="flex-1 flex flex-col min-h-0 max-h-[80px]">
                          <div className="text-white/60 text-xs mb-1">
                            NOTES
                          </div>
                          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                            <div className="text-white text-sm bg-black/20 rounded p-2 break-words">
                              {card.notes}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          <div className="mt-4 space-y-4">
            {/* Spending Limit Information */}
            {card.spendingLimit > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold">Spending Information</h4>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Limit: ${card.spendingLimit.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Current Spending: ${card.currentSpending.toLocaleString()}
                  </p>
                  <div className="w-full bg-secondary rounded-full h-2.5">
                    <div
                      className={clsx("h-2.5 rounded-full", {
                        "bg-green-500":
                          (card.currentSpending / card.spendingLimit) * 100 <
                          50,
                        "bg-yellow-500":
                          (card.currentSpending / card.spendingLimit) * 100 >=
                            50 &&
                          (card.currentSpending / card.spendingLimit) * 100 <
                            80,
                        "bg-red-500":
                          (card.currentSpending / card.spendingLimit) * 100 >=
                          80,
                      })}
                      style={{
                        width: `${Math.min(
                          (card.currentSpending / card.spendingLimit) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            <div className="space-y-2">
              <h4 className="font-semibold">Notification Settings</h4>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Expiry Notifications
                  </p>
                  <div
                    className={`text-sm ${
                      card.notificationSettings.expiryNotification.enabled
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {card.notificationSettings.expiryNotification.enabled
                      ? "Enabled"
                      : "Disabled"}
                  </div>
                </div>
                {card.notificationSettings.expiryNotification.enabled && (
                  <p className="text-sm text-muted-foreground">
                    Notifying{" "}
                    {
                      card.notificationSettings.expiryNotification
                        .daysBeforeExpiry
                    }{" "}
                    days before expiry
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Spending Limit Notifications
                  </p>
                  <div
                    className={`text-sm ${
                      card.notificationSettings.spendingNotification.enabled
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {card.notificationSettings.spendingNotification.enabled
                      ? "Enabled"
                      : "Disabled"}
                  </div>
                </div>
                {card.notificationSettings.spendingNotification.enabled && (
                  <p className="text-sm text-muted-foreground">
                    Notifying at{" "}
                    {card.notificationSettings.spendingNotification.threshold}%
                    of spending limit
                  </p>
                )}
              </div>
            </div>
          </div>

          <motion.div
            className="text-center mt-4 text-sm text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Click the card to view {isFlipped ? "front" : "back"}
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
