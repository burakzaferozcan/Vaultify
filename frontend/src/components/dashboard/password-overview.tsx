"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Password } from "@/types/password";

interface PasswordOverviewProps {
  passwords: Password[];
  loading: boolean;
}

export function PasswordOverview({ passwords, loading }: PasswordOverviewProps) {
  const calculateStrengthDistribution = () => {
    const distribution = {
      veryWeak: 0,
      weak: 0,
      fair: 0,
      strong: 0,
      veryStrong: 0,
    };

    passwords.forEach((password) => {
      const strength = calculatePasswordStrength(password.password);
      switch (strength) {
        case 0:
          distribution.veryWeak++;
          break;
        case 1:
          distribution.weak++;
          break;
        case 2:
          distribution.fair++;
          break;
        case 3:
          distribution.strong++;
          break;
        case 4:
        case 5:
          distribution.veryStrong++;
          break;
      }
    });

    return distribution;
  };

  const calculatePasswordStrength = (password: string): number => {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return Math.min(5, Math.floor(score * 0.8));
  };

  const getPercentage = (value: number) => {
    return passwords.length > 0 ? (value / passwords.length) * 100 : 0;
  };

  const strengthDistribution = calculateStrengthDistribution();

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Password Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-sm text-gray-500">Loading...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

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
            className="h-2 bg-gray-700"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Strong</span>
            <span className="text-blue-500">
              {strengthDistribution.strong} passwords
            </span>
          </div>
          <Progress
            value={getPercentage(strengthDistribution.strong)}
            className="h-2 bg-gray-700"
          />
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
            className="h-2 bg-gray-700"
          />
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
            className="h-2 bg-gray-700"
          />
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
            className="h-2 bg-gray-700"
          />
        </div>
      </CardContent>
    </Card>
  );
}
