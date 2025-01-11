"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface PasswordStrengthDistribution {
  veryWeak: number;
  weak: number;
  fair: number;
  strong: number;
  veryStrong: number;
}

interface PasswordOverviewProps {
  totalPasswords: number;
  strengthDistribution: PasswordStrengthDistribution;
  reusedPasswords: number;
  oldPasswords: number;
}

export function PasswordOverview({
  totalPasswords,
  strengthDistribution,
  reusedPasswords,
  oldPasswords,
}: PasswordOverviewProps) {
  const getPercentage = (value: number) => {
    return totalPasswords > 0 ? (value / totalPasswords) * 100 : 0;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">Password Health</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Very Strong</span>
            <span className="text-green-500">
              {strengthDistribution.veryStrong} passwords
            </span>
          </div>
          <Progress
            value={getPercentage(strengthDistribution.veryStrong)}
            className="bg-gray-700 h-2"
          >
            <div
              className="h-full bg-green-500 transition-all"
              style={{
                width: `${getPercentage(strengthDistribution.veryStrong)}%`,
              }}
            />
          </Progress>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Strong</span>
            <span className="text-emerald-500">
              {strengthDistribution.strong} passwords
            </span>
          </div>
          <Progress
            value={getPercentage(strengthDistribution.strong)}
            className="bg-gray-700 h-2"
          >
            <div
              className="h-full bg-emerald-500 transition-all"
              style={{
                width: `${getPercentage(strengthDistribution.strong)}%`,
              }}
            />
          </Progress>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Fair</span>
            <span className="text-yellow-500">
              {strengthDistribution.fair} passwords
            </span>
          </div>
          <Progress
            value={getPercentage(strengthDistribution.fair)}
            className="bg-gray-700 h-2"
          >
            <div
              className="h-full bg-yellow-500 transition-all"
              style={{ width: `${getPercentage(strengthDistribution.fair)}%` }}
            />
          </Progress>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Weak</span>
            <span className="text-orange-500">
              {strengthDistribution.weak} passwords
            </span>
          </div>
          <Progress
            value={getPercentage(strengthDistribution.weak)}
            className="bg-gray-700 h-2"
          >
            <div
              className="h-full bg-orange-500 transition-all"
              style={{ width: `${getPercentage(strengthDistribution.weak)}%` }}
            />
          </Progress>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Very Weak</span>
            <span className="text-red-500">
              {strengthDistribution.veryWeak} passwords
            </span>
          </div>
          <Progress
            value={getPercentage(strengthDistribution.veryWeak)}
            className="bg-gray-700 h-2"
          >
            <div
              className="h-full bg-red-500 transition-all"
              style={{
                width: `${getPercentage(strengthDistribution.veryWeak)}%`,
              }}
            />
          </Progress>
        </div>

        <div className="mt-6 space-y-2 pt-4 border-t border-gray-800">
          <div className="flex items-center justify-between text-sm">
            <span className="text-yellow-500">Reused Passwords</span>
            <span>{reusedPasswords}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-orange-500">
              Old Passwords ({">"}90 days)
            </span>
            <span>{oldPasswords}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
