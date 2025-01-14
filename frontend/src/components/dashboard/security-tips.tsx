import { useEffect, useState } from "react";
import { Password } from "@/types/password";
import { passwordService } from "@/services/passwordService";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface SecurityTip {
  id: string;
  title: string;
  description: string;
  severity: "high" | "medium" | "low" | "success";
  action?: {
    text: string;
    onClick: () => void;
  };
}

export function SecurityTips() {
  const [tips, setTips] = useState<SecurityTip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const analyzeSecurity = async () => {
      try {
        const passwords = await passwordService.getAllPasswords();
        const securityTips = generateSecurityTips(passwords);
        setTips(securityTips);
      } catch (error) {
        console.error("Error analyzing security:", error);
      } finally {
        setLoading(false);
      }
    };

    analyzeSecurity();
  }, []);

  const generateSecurityTips = (passwords: Password[]): SecurityTip[] => {
    const tips: SecurityTip[] = [];

    // Zayıf şifreleri kontrol et
    const weakPasswords = passwords.filter(
      (p) => calculatePasswordStrength(p.password) <= 2
    );
    if (weakPasswords.length > 0) {
      tips.push({
        id: "weak-passwords",
        title: "Weak Passwords Detected",
        description: `You have ${weakPasswords.length} weak password${
          weakPasswords.length > 1 ? "s" : ""
        }. Consider updating them to improve security.`,
        severity: "high",
        action: {
          text: "View Weak Passwords",
          onClick: () => {
            // Navigate to passwords page with filter
          },
        },
      });
    }

    // Tekrarlanan şifreleri kontrol et
    const reusedPasswords = passwords.filter(
      (p) => passwords.filter((other) => other.password === p.password).length > 1
    );
    if (reusedPasswords.length > 0) {
      tips.push({
        id: "reused-passwords",
        title: "Reused Passwords Found",
        description: "Using unique passwords for each account is recommended.",
        severity: "medium",
        action: {
          text: "Generate New Passwords",
          onClick: () => {
            // Open password generator
          },
        },
      });
    }

    // Eski şifreleri kontrol et
    const oldPasswords = passwords.filter((p) => {
      const updatedAt = new Date(p.updatedAt);
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
      return updatedAt < ninetyDaysAgo;
    });
    if (oldPasswords.length > 0) {
      tips.push({
        id: "old-passwords",
        title: "Passwords Need Rotation",
        description: `${oldPasswords.length} password${
          oldPasswords.length > 1 ? "s" : ""
        } haven't been updated in over 90 days.`,
        severity: "low",
      });
    }

    // İyi durumda olan şifreleri kontrol et
    const strongPasswords = passwords.filter(
      (p) => calculatePasswordStrength(p.password) >= 4
    );
    if (strongPasswords.length === passwords.length && passwords.length > 0) {
      tips.push({
        id: "strong-passwords",
        title: "Great Password Hygiene!",
        description: "All your passwords are strong and secure.",
        severity: "success",
      });
    }

    return tips;
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

  const getSeverityIcon = (severity: SecurityTip["severity"]) => {
    const iconProps = { className: "h-4 w-4 text-white" };

    switch (severity) {
      case "high":
        return <AlertTriangle {...iconProps} />;
      case "medium":
        return <AlertTriangle {...iconProps} />;
      case "low":
        return <Info {...iconProps} />;
      case "success":
        return <CheckCircle2 {...iconProps} />;
    }
  };

  const getSeverityClass = (severity: SecurityTip["severity"]) => {
    switch (severity) {
      case "high":
        return "border-red-900/50 bg-red-900/20";
      case "medium":
        return "border-yellow-900/50 bg-yellow-900/20";
      case "low":
        return "border-blue-900/50 bg-blue-900/20";
      case "success":
        return "border-green-900/50 bg-green-900/20";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Security Tips</CardTitle>
        <CardDescription>
          Recommendations to improve your security
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {loading ? (
            <div className="text-center text-sm text-gray-500">
              Analyzing security...
            </div>
          ) : tips.length === 0 ? (
            <div className="text-center text-sm text-gray-500">
              No security recommendations at this time
            </div>
          ) : (
            tips.map((tip) => (
              <div
                key={tip.id}
                className={cn(
                  "flex items-start space-x-3 rounded-lg border p-3",
                  getSeverityClass(tip.severity)
                )}
              >
                <div className="mt-0.5">{getSeverityIcon(tip.severity)}</div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium text-white">{tip.title}</p>
                  <p className="text-sm text-gray-300">{tip.description}</p>
                  {tip.action && (
                    <button
                      onClick={tip.action.onClick}
                      className="text-sm font-medium text-primary-foreground hover:underline"
                    >
                      {tip.action.text}
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
