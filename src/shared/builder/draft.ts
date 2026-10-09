import { SkeletonName } from '@shared/templates/skeleton';

import { DocNode, TranslationTable } from './compile';

export interface BuilderDraft {
  skeleton: SkeletonName;
  // Each skeleton keeps its own text: switching must not carry it over.
  docs: Partial<Record<SkeletonName, DocNode>>;
  table: TranslationTable | null;
}

// Separate from `mail`, which belongs to the main editor and `/translate`.
const DRAFT_KEY = 'builderDraft';

const SKELETON_NAMES: SkeletonName[] = ['marketing', 'system', 'sales'];

const isDoc = (value: unknown): value is DocNode =>
  !!value && typeof value === 'object' && (value as DocNode).type === 'doc';

const isTable = (value: unknown): value is TranslationTable =>
  Array.isArray(value) &&
  value.every(
    (row) => Array.isArray(row) && row.every((cell) => typeof cell === 'string')
  );

const emptyDraft = (): BuilderDraft => ({
  skeleton: 'marketing',
  docs: {},
  table: null,
});

// A corrupt or outdated draft must not break the page, so anything unexpected falls back to empty.
export const loadDraft = (): BuilderDraft => {
  try {
    const parsed = JSON.parse(localStorage.getItem(DRAFT_KEY) ?? 'null');
    if (!parsed || typeof parsed !== 'object') return emptyDraft();
    return {
      skeleton: SKELETON_NAMES.includes(parsed.skeleton)
        ? parsed.skeleton
        : 'marketing',
      docs: Object.fromEntries(
        SKELETON_NAMES.filter((name) => isDoc(parsed.docs?.[name])).map(
          (name) => [name, parsed.docs[name]]
        )
      ),
      table: isTable(parsed.table) ? parsed.table : null,
    };
  } catch {
    return emptyDraft();
  }
};

export const saveDraft = (draft: BuilderDraft) => {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch {
    // Quota exceeded or storage disabled: the draft just isn't kept.
  }
};
