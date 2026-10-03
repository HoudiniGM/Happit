import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export const IconHome = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.5V21h14V9.5" />
    <path d="M9.5 21v-6h5v6" />
  </svg>
);

export const IconCalendar = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
    <path d="M3 9h18M8 2.5v4M16 2.5v4" />
  </svg>
);

export const IconUsers = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3.5 20c0-3.3 2.5-5.5 5.5-5.5s5.5 2.2 5.5 5.5" />
    <path d="M16 5.2a3 3 0 0 1 0 5.8M18 20c0-2.3-1-4.2-2.6-5.2" />
  </svg>
);

export const IconWallet = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="6" width="18" height="13" rx="2.5" />
    <path d="M3 10h18M16.5 14.5h.01" />
    <path d="M17 6V4.5a1 1 0 0 0-1.3-.95L4 7" />
  </svg>
);

export const IconStore = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 9.5V20h16V9.5" />
    <path d="M3 9.5 4.4 5a1 1 0 0 1 .96-.7h13.3a1 1 0 0 1 .96.7L21 9.5" />
    <path d="M3 9.5a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 3 0" />
    <path d="M9.5 20v-5h5v5" />
  </svg>
);

export const IconBell = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 9a6 6 0 0 1 12 0c0 5 1.5 6.5 1.5 6.5h-15S6 14 6 9Z" />
    <path d="M10 19a2 2 0 0 0 4 0" />
  </svg>
);

export const IconCheck = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 12.5 9 17.5 20 6.5" />
  </svg>
);

export const IconArrowRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
);

export const IconArrowLeft = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M20 12H4M10 6l-6 6 6 6" />
  </svg>
);

export const IconStar = (p: IconProps) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}>
    <path d="M12 3.5l2.6 5.3 5.9.85-4.25 4.15 1 5.85L12 17.9l-5.25 2.75 1-5.85L3.5 9.65l5.9-.85L12 3.5Z" />
  </svg>
);

export const IconMapPin = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);

export const IconClock = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const IconShield = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3 5 6v5.5c0 4.3 3 7.5 7 9.5 4-2 7-5.2 7-9.5V6l-7-3Z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

export const IconShare = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="6" cy="12" r="2.5" />
    <circle cx="17" cy="6" r="2.5" />
    <circle cx="17" cy="18" r="2.5" />
    <path d="M8.2 10.8 14.8 7.2M8.2 13.2l6.6 3.6" />
  </svg>
);

export const IconPlus = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconChevronRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M9 6l6 6-6 6" />
  </svg>
);

export const IconSmartphone = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
    <path d="M10.5 18.5h3" />
  </svg>
);

export const IconMonitor = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="2.5" y="4" width="19" height="12.5" rx="2" />
    <path d="M9 20.5h6M12 16.5v4" />
  </svg>
);

export const IconLogout = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" />
    <path d="M10 16l-4-4 4-4M6 12h10" />
  </svg>
);

export const IconSparkle = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3v4M12 17v4M5 12H3M21 12h-2M6.3 6.3 7.7 7.7M16.3 16.3l1.4 1.4M17.7 6.3 16.3 7.7M7.7 16.3 6.3 17.7" />
  </svg>
);
