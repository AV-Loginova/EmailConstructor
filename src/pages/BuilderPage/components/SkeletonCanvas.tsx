import { ReactNode, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import {
  bodyWidth,
  insertBody,
  SkeletonName,
} from '@shared/templates/skeleton';

import { editorStyles } from '../editorStyles';

const SLOT_ATTR = 'data-builder-slot';

const slotRow = (width: number) =>
  `<tr><td ${SLOT_ATTR} width="${width}" style="width: ${width}px"></td></tr>`;

interface SkeletonCanvasProps {
  skeleton: SkeletonName;
  children: ReactNode;
}

// Shadow root keeps the email isolated from app styles (theme, tailwind preflight) and vice versa.
const SkeletonCanvas = ({ skeleton, children }: SkeletonCanvasProps) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const [slot, setSlot] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const root = host.shadowRoot ?? host.attachShadow({ mode: 'open' });
    root.innerHTML = `<style>${editorStyles}</style>${insertBody(skeleton, slotRow(bodyWidth(skeleton)))}`;
    setSlot(root.querySelector<HTMLElement>(`[${SLOT_ATTR}]`));
  }, [skeleton]);

  return (
    <div ref={hostRef} className="w-fit" data-skeleton={skeleton}>
      {slot && createPortal(children, slot)}
    </div>
  );
};

export default SkeletonCanvas;
