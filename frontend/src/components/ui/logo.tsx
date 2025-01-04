import { Shield } from "lucide-react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center space-x-2 ${className}`}>
      <Shield className="h-8 w-8 text-purple-500" />
      {showText && (
        <span className="text-2xl font-light text-purple-500 ">Vaultify</span>
      )}
    </Link>
  );
}
