import type { ReactNode } from "react";

type IconProps = {
  className?: string;
  filled?: boolean;
};

function Icon({
  className,
  children,
  size = 22,
}: {
  className?: string;
  children: ReactNode;
  size?: number;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Icon>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <circle cx="11" cy="11" r="6" />
      <path d="M16 16l4.5 4.5" />
    </Icon>
  );
}

export function HeartIcon({ className, filled = false }: IconProps) {
  return (
    <Icon className={className}>
      <path
        d="M12 19.4s-6.4-4-6.4-8.2A3.5 3.5 0 0 1 12 8.6a3.5 3.5 0 0 1 6.4 2.6c0 4.2-6.4 8.2-6.4 8.2z"
        fill={filled ? "currentColor" : "none"}
      />
    </Icon>
  );
}

export function BagIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M6.5 8h11l-.8 11H7.3L6.5 8z" />
      <path d="M9 8V7a3 3 0 0 1 6 0v1" />
    </Icon>
  );
}

export function UserIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="8" r="3" />
      <path d="M5.5 19.2c1.4-2.8 3.4-4.2 6.5-4.2s5.1 1.4 6.5 4.2" />
    </Icon>
  );
}

export function ChevronIcon({ className }: IconProps) {
  return (
    <Icon className={className} size={16}>
      <path d="M6 9l6 6 6-6" />
    </Icon>
  );
}

export function FilterIcon({ className }: IconProps) {
  return (
    <Icon className={className} size={18}>
      <path d="M4 6h16l-6 7.2V19l-4 1.5v-7.3L4 6z" />
    </Icon>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <Icon className={className} size={16}>
      <path d="M5 12.5l4.2 4.2L19 7.5" />
    </Icon>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Icon>
  );
}

export function InstagramIcon() {
  return (
    <Icon size={18}>
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <circle cx="12" cy="12" r="3.2" />
      <circle cx="17.2" cy="6.8" r="0.7" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function LinkedInIcon() {
  return (
    <Icon size={18}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.2 10.2V16M8.2 8h.01M11.2 16v-3.2a1.8 1.8 0 0 1 3.6 0V16" />
    </Icon>
  );
}
