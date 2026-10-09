export const EMAIL_WIDTH = 496;

export const FONT_FAMILY = "'arial', 'helvetica', sans-serif, 'roboto'";

export const COLORS = {
  text: '#0E0142',
  textMuted: '#0e014299',
  link: '#5f43d0',
  buttonBg: '#0e0142',
  buttonText: '#ffffff',
  background: '#f9f7ff',
} as const;

export const TEXT = { fontSize: 16, fontWeight: 400, lineHeight: 20 } as const;

export const HEADING = {
  fontSize: 24,
  fontWeight: 700,
  lineHeight: 28,
} as const;

export const BUTTON = {
  height: 40,
  borderRadius: 26,
  borderWidth: '12px 32px',
  fontSize: 16,
  fontWeight: 700,
  // Space between buttons sharing a row.
  gap: 16,
} as const;

export const BACKGROUND = { borderRadius: 16 } as const;

export const SPACING = {
  newLineHeight: 22,
  paragraphHeight: 15,
  headingHeight: 13,
  backgroundHeight: 14,
  backgroundPadding: '18px 16px',
  listItemPadding: '2px 0 2px 6px',
  discListPadding: '0 0 0 20px',
} as const;
