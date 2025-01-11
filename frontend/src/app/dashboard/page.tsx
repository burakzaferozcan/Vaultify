"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Key,
  ShieldCheck,
  AlertTriangle,
  Clock,
  RefreshCcw,
  Shield,
} from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { PasswordOverview } from "@/components/dashboard/password-overview";
import { passwordService } from "@/services/passwordService";
import { Password } from "@/types/password";

export default function DashboardPage() {
  const { user } = useAuth();
  const [passwords, setPasswords] = useState<Password[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const data = await passwordService.getAllPasswords();
        setPasswords(data);
      } catch (error) {
        console.error("Error fetching passwords:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPasswords();
  }, []);

  const calculatePasswordStats = () => {
    const totalPasswords = passwords.length;
    const weakPasswords = passwords.filter(
      (p) => calculatePasswordStrength(p.password) <= 2
    ).length;
    const reusedPasswords = passwords.filter(
      (p) =>
        passwords.filter((other) => other.password === p.password).length > 1
    ).length;

    const oldPasswords = passwords.filter((p) => {
      const updatedAt = new Date(p.updatedAt);
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
      return updatedAt < ninetyDaysAgo;
    }).length;

    return {
      totalPasswords,
      weakPasswords,
      reusedPasswords,
      oldPasswords,
    };
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

  const stats = calculatePasswordStats();
  const strengthDistribution = calculateStrengthDistribution();

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Welcome back, {user?.name}!
        </h2>
        <p className="text-muted-foreground">
          Here&apos;s an overview of your vault security
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Passwords"
          value={stats.totalPasswords}
          icon={Key}
          description="Stored in your vault"
        />
        <StatsCard
          title="Weak Passwords"
          value={stats.weakPasswords}
          icon={AlertTriangle}
          description="Need to be strengthened"
        />
        <StatsCard
          title="Reused Passwords"
          value={stats.reusedPasswords}
          icon={RefreshCcw}
          description="Used in multiple accounts"
        />
        <StatsCard
          title="Old Passwords"
          value={stats.oldPasswords}
          icon={Clock}
          description="Not updated in 90 days"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <PasswordOverview
          totalPasswords={stats.totalPasswords}
          strengthDistribution={strengthDistribution}
          reusedPasswords={stats.reusedPasswords}
          oldPasswords={stats.oldPasswords}
        />
        <div className="space-y-4">
          {/* Buraya Recent Activity veya Security Tips eklenebilir */}
        </div>
      </div>
    </div>
  );
}
