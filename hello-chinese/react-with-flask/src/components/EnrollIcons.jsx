// Small line icons used across the enrollment flow, replacing the Chinese
// character labels. Each one is chosen for what it labels.
import React from "react";

const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };

// Chinese class — an open book with a speech mark
export const ChineseIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M3.5 5.5c2.6-.9 5-.9 7.3.6v12c-2.3-1.5-4.7-1.5-7.3-.6v-12Z" {...base} />
    <path d="M20.5 5.5c-2.6-.9-5-.9-7.3.6v12c2.3-1.5 4.7-1.5 7.3-.6v-12Z" {...base} />
    <path d="M12 6.1v12" {...base} />
  </svg>
);

// Step-In — a sprout: first shoots
export const SproutIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 20v-7" {...base} />
    <path d="M12 13c0-2.8-2.2-5-5-5 0 2.8 2.2 5 5 5Z" {...base} />
    <path d="M12 13c0-2.4 1.9-4.3 4.3-4.3 0 2.4-1.9 4.3-4.3 4.3Z" {...base} />
  </svg>
);

// Step-Up — a growing plant with more leaves
export const PlantIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 21V8" {...base} />
    <path d="M12 14c-.2-2.6-2.3-4.3-4.9-4.4.2 2.6 2.3 4.3 4.9 4.4Z" {...base} />
    <path d="M12 11.5c.2-2.6 2.3-4.3 4.9-4.4-.2 2.6-2.3 4.3-4.9 4.4Z" {...base} />
    <path d="M12 8c-.2-2.2-1.6-3.6-3.7-4 .2 2.2 1.6 3.6 3.7 4Z" {...base} />
  </svg>
);

// Step-Beyond — a tree: fully grown
export const TreeIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 21v-5.5" {...base} />
    <path d="M12 15.5a5 5 0 0 0 2.6-9.3 4 4 0 0 0-7.5 1.6A3.6 3.6 0 0 0 9.4 15c.8.4 1.7.5 2.6.5Z" {...base} />
    <path d="M12 15.5 9.6 13M12 13.5l2.3-2.2" {...base} />
  </svg>
);

// Tutoring / learning support — two people
export const PeopleIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="9" cy="8.5" r="3.2" {...base} />
    <circle cx="16.5" cy="9.5" r="2.4" {...base} />
    <path d="M3.5 19c0-2.9 2.5-4.6 5.5-4.6s5.5 1.7 5.5 4.6" {...base} />
    <path d="M16.5 14.6c2.3.2 4 1.7 4 4.4" {...base} />
  </svg>
);

// Math enrichment — a calculator
export const MathIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <rect x="4.5" y="3" width="15" height="18" rx="2.5" {...base} />
    <rect x="7" y="5.6" width="10" height="3.4" rx="1" {...base} />
    <circle cx="9" cy="13" r="1" fill="currentColor" stroke="none" />
    <circle cx="12" cy="13" r="1" fill="currentColor" stroke="none" />
    <circle cx="15" cy="13" r="1" fill="currentColor" stroke="none" />
    <circle cx="9" cy="17" r="1" fill="currentColor" stroke="none" />
    <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
    <circle cx="15" cy="17" r="1" fill="currentColor" stroke="none" />
  </svg>
);

// Section head — a stack of books (curriculum / pathway)
export const PathwayIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 6.5A2 2 0 0 1 6 4.5h12a2 2 0 0 1 2 2v11a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v-11Z" {...base} />
    <path d="M8.5 8.5h7M8.5 11.5h4.5" {...base} />
  </svg>
);

export const LEVEL_ICONS = { stepin: SproutIcon, stepup: PlantIcon, stepbeyond: TreeIcon };
