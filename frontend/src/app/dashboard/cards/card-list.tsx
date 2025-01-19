"use client";

import { Card } from "@/types/card";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { CardViewDialog } from "./card-view-dialog";

interface CardListProps {
  cards: Card[];
  onEdit: (card: Card) => void;
  onDelete: (cardId: string) => void;
}

export function CardList({ cards, onEdit, onDelete }: CardListProps) {
  const [viewCard, setViewCard] = useState<Card | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card._id}
            className="rounded-lg border shadow-sm border-gray-800 bg-gray-800/50 p-6"
          >
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-white">
                {card.cardName}
              </h3>
              <p className="text-sm text-gray-400">{card.cardBrand}</p>
            </div>
            <div className="space-y-2 text-gray-300">
              <p className="text-sm">
                Card Number: **** **** **** {card.cardNumber.slice(-4)}
              </p>
              <p className="text-sm">Cardholder: {card.cardholderName}</p>
              <p className="text-sm">
                Expires: {card.expiryMonth}/{card.expiryYear}
              </p>
              <p className="text-sm">
                Type: {card.cardType.charAt(0).toUpperCase() + card.cardType.slice(1)}
              </p>
              <p className="text-sm">
                Category: {card.category.charAt(0).toUpperCase() + card.category.slice(1)}
              </p>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setViewCard(card)}
                className="h-8 w-8 text-gray-400 hover:text-white bg-gray-900 border-gray-800"
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onEdit(card)}
                className="h-8 w-8 text-gray-400 hover:text-white bg-gray-900 border-gray-800"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onDelete(card._id)}
                className="h-8 w-8 text-red-500 hover:text-red-400 bg-gray-900 border-gray-800"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <CardViewDialog
        card={viewCard}
        onClose={() => setViewCard(null)}
      />
    </>
  );
}
