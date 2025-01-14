"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Key,
  ShieldCheck,
  AlertTriangle,
  Clock,
  RefreshCw,
  Shield,
} from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { PasswordOverview } from "@/components/dashboard/password-overview";
import { RecentActivities } from "@/components/dashboard/recent-activities";
import { SecurityTips } from "@/components/dashboard/security-tips";
import { QuickActions } from "@/components/dashboard/quick-actions";
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

  const stats = calculatePasswordStats();

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-6 p-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome back!</h2>
        <p className="text-muted-foreground">
          Here&apos;s a summary of your password security
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Passwords"
          value={stats.totalPasswords}
          description="Stored passwords"
          icon={Key}
          trend="neutral"
        />
        <StatsCard
          title="Weak Passwords"
          value={stats.weakPasswords}
          description="Need strengthening"
          icon={AlertTriangle}
          trend="down"
        />
        <StatsCard
          title="Reused Passwords"
          value={stats.reusedPasswords}
          description="Used multiple times"
          icon={RefreshCw}
          trend="down"
        />
        <StatsCard
          title="Old Passwords"
          value={stats.oldPasswords}
          description="Over 90 days old"
          icon={Clock}
          trend="down"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PasswordOverview passwords={passwords} loading={loading} />
        </div>
        <div>
          <SecurityTips />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentActivities />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
