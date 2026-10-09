import { EMAIL_WIDTH } from '@shared/snippets/styles';

import { templateMarketing } from './templateMarketing';
import { templateSales } from './templateSales';
import { templateSystem } from './templateSystem';

export type SkeletonName = 'marketing' | 'system' | 'sales';

// Sales body spans the whole 600px letter, like the signature below it.
export const SALES_BODY_WIDTH = 600;

export const bodyWidth = (name: SkeletonName) =>
  name === 'sales' ? SALES_BODY_WIDTH : EMAIL_WIDTH;

// In sales the slot sits right before the manager signature.
export const BODY_SLOT = '<!-- Тело письма -->';

export const skeletons: Record<SkeletonName, string> = {
  marketing: templateMarketing,
  system: templateSystem,
  sales: templateSales,
};

export const splitSkeleton = (name: SkeletonName) => {
  const html = skeletons[name];
  const index = html.indexOf(BODY_SLOT);
  if (index === -1) {
    throw new Error(`Skeleton "${name}" has no body slot`);
  }
  return {
    head: html.slice(0, index),
    tail: html.slice(index + BODY_SLOT.length),
  };
};

export const insertBody = (name: SkeletonName, bodyHtml: string) => {
  const { head, tail } = splitSkeleton(name);
  return head + bodyHtml + tail;
};
