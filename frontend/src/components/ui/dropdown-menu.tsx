"use client";

import React, {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
} from "react";

interface DropdownMenuContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DropdownMenuContext = createContext<DropdownMenuContextType>({
  open: false,
  setOpen: () => {},
});

interface DropdownMenuProps {
  children: React.ReactNode;
}

export function DropdownMenu({ children }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block text-left">{children}</div>
    </DropdownMenuContext.Provider>
  );
}

interface DropdownMenuTriggerProps {
  asChild?: boolean;
  children: React.ReactNode;
}

export function DropdownMenuTrigger({
  asChild,
  children,
}: DropdownMenuTriggerProps) {
  const { open, setOpen } = useContext(DropdownMenuContext);
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(!open);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpen]);

  return (
    <div ref={triggerRef} onClick={handleClick} className="relative">
      {children}
    </div>
  );
}

interface DropdownMenuContentProps {
  className?: string;
  align?: "start" | "end";
  children: React.ReactNode;
}

export function DropdownMenuContent({
  className = "",
  align = "end",
  children,
}: DropdownMenuContentProps) {
  const { open } = useContext(DropdownMenuContext);

  if (!open) return null;

  return (
    <div
      className={`absolute z-50 ${
        align === "end" ? "right-0" : "left-0"
      } mt-2 min-w-[8rem] overflow-hidden rounded-md border border-gray-700 bg-gray-800 shadow-md animate-in fade-in-0 zoom-in-95`}
    >
      <div className="p-1">{children}</div>
    </div>
  );
}

interface DropdownMenuItemProps {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export function DropdownMenuItem({
  className = "",
  onClick,
  children,
}: DropdownMenuItemProps) {
  const { setOpen } = useContext(DropdownMenuContext);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    setOpen(false);
  };

  return (
    <button
      className={`relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-700 hover:text-gray-50 focus:bg-gray-700 focus:text-gray-50 ${className}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

interface DropdownMenuLabelProps {
  className?: string;
  children: React.ReactNode;
}

export function DropdownMenuLabel({
  className = "",
  children,
}: DropdownMenuLabelProps) {
  return (
    <div
      className={`px-2 py-1.5 text-sm font-semibold text-gray-300 ${className}`}
    >
      {children}
    </div>
  );
}

interface DropdownMenuSeparatorProps {
  className?: string;
}

export function DropdownMenuSeparator({
  className = "",
}: DropdownMenuSeparatorProps) {
  return (
    <div className={`-mx-1 my-1 h-px bg-gray-700 ${className}`} />
  );
}
