"use client";

import { useEffect, useState } from "react";
import { Card } from "@/types/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CardModal } from "./card-modal";
import { CardList } from "./card-list";
import { cardService } from "@/services/cardService";
import { useToast } from "@/components/ui/use-toast";

export default function CardsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | undefined>(undefined);
  const { toast } = useToast();

  const fetchCards = async () => {
    try {
      const response = await cardService.getAllCards();
      setCards(response);
    } catch (error) {
      console.error("Error fetching cards:", error);
      toast({
        title: "Failed to fetch cards",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleAddCard = () => {
    setSelectedCard(undefined);
    setIsModalOpen(true);
  };

  const handleEditCard = (card: Card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const handleDeleteCard = async (cardId: string) => {
    try {
      await cardService.deleteCard(cardId);
      toast({
        title: "Card deleted successfully",
        variant: "success",
      });
      fetchCards();
    } catch (error) {
      console.error("Error deleting card:", error);
      toast({
        title: "Failed to delete card",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-white">Cards</h1>
        <Button
          onClick={handleAddCard}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Card
        </Button>
      </div>

      <CardList
        cards={cards}
        onEdit={handleEditCard}
        onDelete={handleDeleteCard}
      />

      <CardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        card={selectedCard}
        onSuccess={fetchCards}
      />
    </div>
  );
}
