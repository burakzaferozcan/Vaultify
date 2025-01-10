"use client";

import { cn } from "@/lib/utils";

interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const calculateStrength = (password: string): number => {
    let score = 0;

    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;

    // Character type checks
    if (/[A-Z]/.test(password)) score += 1; // Uppercase
    if (/[a-z]/.test(password)) score += 1; // Lowercase
    if (/[0-9]/.test(password)) score += 1; // Numbers
    if (/[^A-Za-z0-9]/.test(password)) score += 1; // Special characters

    // Normalize score to 0-4 range
    return Math.min(4, Math.floor(score * 0.7));
  };

  const getStrengthText = (strength: number): string => {
    switch (strength) {
      case 0:
        return "Very Weak";
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Strong";
      case 4:
        return "Very Strong";
      default:
        return "Very Weak";
    }
  };

  const getStrengthColor = (strength: number): string => {
    switch (strength) {
      case 0:
        return "bg-red-500";
      case 1:
        return "bg-orange-500";
      case 2:
        return "bg-yellow-500";
      case 3:
        return "bg-green-500";
      case 4:
        return "bg-emerald-500";
      default:
        return "bg-red-500";
    }
  };

  const strength = calculateStrength(password);
  const strengthText = getStrengthText(strength);
  const strengthColor = getStrengthColor(strength);

  return (
    <div className="mt-2 space-y-2">
      <div className="flex h-2 items-center gap-2">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-full w-full rounded-full transition-colors",
              index <= strength - 1 ? strengthColor : "bg-gray-700"
            )}
          />
        ))}
      </div>
      <p
        className={cn(
          "text-xs font-medium",
          strength === 0 && "text-red-500",
          strength === 1 && "text-orange-500",
          strength === 2 && "text-yellow-500",
          strength === 3 && "text-green-500",
          strength === 4 && "text-emerald-500"
        )}
      >
        Password Strength: {strengthText}
      </p>
    </div>
  );
}
