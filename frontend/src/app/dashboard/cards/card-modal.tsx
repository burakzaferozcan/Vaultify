"use client";

import { Card } from "@/types/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CardForm } from "./card-form";
import { cardService } from "@/services/cardService";
import { useToast } from "@/components/ui/use-toast";

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  card?: Card;
  onSuccess: () => void;
}

export function CardModal({
  isOpen,
  onClose,
  card,
  onSuccess,
}: CardModalProps) {
  const { toast } = useToast();

  const handleSubmit = async (data: any) => {
    try {
      if (card?._id) {
        // Update existing card
        await cardService.updateCard(card._id, data);
        toast({
          title: "Card updated successfully!",
          variant: "success",
        });
      } else {
        // Create new card
        await cardService.createCard(data);
        toast({
          title: "Card added successfully!",
          variant: "success",
        });
      }
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error("Error:", error);
      toast({
        title: card ? "Failed to update card" : "Failed to add card",
        description:
          error.response?.data?.error ||
          (card ? "Failed to update card" : "Failed to add card"),
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]" onClose={onClose}>
        <DialogHeader>
          <DialogTitle>{card ? "Edit Card" : "Add New Card"}</DialogTitle>
        </DialogHeader>
        <CardForm
          initialData={card}
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
