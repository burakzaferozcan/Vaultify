"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardType } from "@/types/card";
import { z } from "zod";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const CATEGORIES = ["personal", "business", "shopping", "travel"] as const;
type Category = (typeof CATEGORIES)[number];

const cardFormSchema = z.object({
  cardName: z.string().min(1, "Card name is required"),
  cardholderName: z.string().min(1, "Cardholder name is required"),
  cardNumber: z.string().min(1, "Card number is required").max(16),
  expiryMonth: z.string().min(1, "Expiry month is required").max(2),
  expiryYear: z.string().min(1, "Expiry year is required").max(2),
  cvv: z.string().min(1, "CVV is required").max(3, "CVV must be 3 digits"),
  cardType: z.nativeEnum(CardType),
  cardBrand: z.string().min(1, "Card brand is required"),
  category: z.enum(CATEGORIES),
  notes: z.string().optional(),
  spendingLimit: z
    .number()
    .min(0, "Spending limit must be positive")
    .optional(),
  notificationSettings: z.object({
    expiryNotification: z.object({
      enabled: z.boolean(),
      daysBeforeExpiry: z.number().min(1).max(90),
    }),
    spendingNotification: z.object({
      enabled: z.boolean(),
      threshold: z.number().min(1).max(100),
    }),
  }),
});

type CardFormData = z.infer<typeof cardFormSchema>;

interface CardFormProps {
  initialData?: Card;
  onSubmit: (data: CardFormData) => void;
  onCancel: () => void;
}

export function CardForm({ initialData, onSubmit, onCancel }: CardFormProps) {
  const form = useForm<CardFormData>({
    resolver: zodResolver(cardFormSchema),
    defaultValues: {
      cardName: initialData?.cardName || "",
      cardholderName: initialData?.cardholderName || "",
      cardNumber: initialData?.cardNumber || "",
      expiryMonth: initialData?.expiryMonth || "",
      expiryYear: initialData?.expiryYear || "",
      cvv: initialData?.cvv || "",
      cardType: initialData?.cardType || CardType.CREDIT,
      cardBrand: initialData?.cardBrand || "",
      category: (initialData?.category as Category) || "personal",
      notes: initialData?.notes || "",
      spendingLimit: initialData?.spendingLimit || 0,
      notificationSettings: {
        expiryNotification: {
          enabled:
            initialData?.notificationSettings?.expiryNotification?.enabled ||
            false,
          daysBeforeExpiry:
            initialData?.notificationSettings?.expiryNotification
              ?.daysBeforeExpiry || 30,
        },
        spendingNotification: {
          enabled:
            initialData?.notificationSettings?.spendingNotification?.enabled ||
            false,
          threshold:
            initialData?.notificationSettings?.spendingNotification
              ?.threshold || 80,
        },
      },
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-3">
          <FormField
            control={form.control}
            name="cardName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Card Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Personal Debit Card"
                    className="bg-gray-900 border-gray-800"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="cardholderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cardholder Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., John Doe"
                      className="bg-gray-900 border-gray-800"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter card number"
                      maxLength={16}
                      className="bg-gray-900 border-gray-800"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <FormField
              control={form.control}
              name="expiryMonth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Month</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="MM"
                      maxLength={2}
                      className="bg-gray-900 border-gray-800"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expiryYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Year</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="YY"
                      maxLength={2}
                      className="bg-gray-900 border-gray-800"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cvv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CVV</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      maxLength={3}
                      className="bg-gray-900 border-gray-800"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="cardBrand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Brand</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Visa"
                      className="bg-gray-900 border-gray-800"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cardType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Type</FormLabel>
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full justify-between bg-gray-900 border-gray-800"
                      >
                        {field.value.charAt(0).toUpperCase() +
                          field.value.slice(1)}
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-[200px] bg-gray-900 border-gray-800"
                    >
                      {Object.values(CardType).map((type) => (
                        <DropdownMenuItem
                          key={type}
                          onClick={() => field.onChange(type)}
                          className="text-white hover:bg-gray-800"
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-between bg-gray-900 border-gray-800"
                    >
                      {field.value.charAt(0).toUpperCase() +
                        field.value.slice(1)}
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-[200px] bg-gray-900 border-gray-800"
                  >
                    {CATEGORIES.map((category) => (
                      <DropdownMenuItem
                        key={category}
                        onClick={() => field.onChange(category)}
                        className="text-white hover:bg-gray-800"
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-3 py-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-3">
                <Label htmlFor="spendingLimit">Spending Limit</Label>
                <Input
                  id="spendingLimit"
                  type="number"
                  min="0"
                  {...form.register("spendingLimit", { valueAsNumber: true })}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label>Expiry Notification Settings</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="expiryEnabled"
                  checked={form.watch(
                    "notificationSettings.expiryNotification.enabled"
                  )}
                  onCheckedChange={(checked) =>
                    form.setValue(
                      "notificationSettings.expiryNotification.enabled",
                      checked as boolean
                    )
                  }
                />
                <Label htmlFor="expiryEnabled">
                  Enable expiry notifications
                </Label>
              </div>
              {form.watch(
                "notificationSettings.expiryNotification.enabled"
              ) && (
                <div className="ml-6">
                  <Label htmlFor="daysBeforeExpiry">
                    Days before expiry to notify
                  </Label>
                  <Input
                    id="daysBeforeExpiry"
                    type="number"
                    min="1"
                    max="90"
                    {...form.register(
                      "notificationSettings.expiryNotification.daysBeforeExpiry",
                      {
                        valueAsNumber: true,
                      }
                    )}
                  />
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Label>Spending Limit Notification Settings</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="spendingEnabled"
                  checked={form.watch(
                    "notificationSettings.spendingNotification.enabled"
                  )}
                  onCheckedChange={(checked) =>
                    form.setValue(
                      "notificationSettings.spendingNotification.enabled",
                      checked as boolean
                    )
                  }
                />
                <Label htmlFor="spendingEnabled">
                  Enable spending limit notifications
                </Label>
              </div>
              {form.watch(
                "notificationSettings.spendingNotification.enabled"
              ) && (
                <div className="ml-6">
                  <Label htmlFor="threshold">Notification threshold (%)</Label>
                  <Input
                    id="threshold"
                    type="number"
                    min="1"
                    max="100"
                    {...form.register(
                      "notificationSettings.spendingNotification.threshold",
                      {
                        valueAsNumber: true,
                      }
                    )}
                  />
                </div>
              )}
            </div>
          </div>

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Add any additional notes..."
                    className="min-h-[100px] bg-gray-900 border-gray-800"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="bg-gray-900 border-gray-800 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {initialData ? "Update" : "Add"} Card
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
