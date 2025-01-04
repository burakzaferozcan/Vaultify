import { Shield } from "lucide-react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  showText?: boolean;
  href?: string;
}

export function Logo({ className = "", showText = true, href }: LogoProps) {
  return (
    <Link
      href={href ? href : "/"}
      className={`flex items-center space-x-2 ${className}`}
    >
      <Shield className="h-8 w-8 text-purple-500" />
      {showText && (
        <span className="text-2xl font-light text-purple-500 ">Vaultify</span>
      )}
    </Link>
  );
}
