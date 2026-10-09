import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { templates } from '@shared/constants/templates';

import { BlockType, EmailBlock, createBlockByType } from './blockLibrary';

type TemplateName = 'marketing' | 'system' | 'sales';

type PaletteDragItem = {
  kind: 'palette-block';
  blockType: BlockType;
};

type EmailDragItem = {
  kind: 'email-block';
  id: string;
  index: number;
};

type DragItem = PaletteDragItem | EmailDragItem;

type TemplatePreset = {
  name: TemplateName;
  eyebrow: string;
  title: string;
  subtitle: string;
  topLink: string;
  headerClassName: string;
  heroClassName: string;
  noteClassName: string;
  buttonClassName: string;
  footerTitle: string;
  footerCopy: string;
  footerLinks: string[];
  previewBackgroundClassName: string;
};

const templatePresets: Record<TemplateName, TemplatePreset> = {
  marketing: {
    name: 'marketing',
    eyebrow: 'Marketing template',
    title: 'Продуктовый анонс или промо-письмо',
    subtitle:
      'Большой hero, мягкий футер и заметный CTA как в маркетинговых письмах.',
    topLink: 'View product',
    headerClassName: 'bg-base-100',
    heroClassName: 'bg-neutral text-neutral-content',
    noteClassName: 'bg-warning/15 text-warning-content',
    buttonClassName: 'bg-primary text-primary-content',
    footerTitle: 'kommo marketing team',
    footerCopy:
      'Use this footer area for legal text, social links and support contacts.',
    footerLinks: ['Instagram', 'LinkedIn', 'YouTube'],
    previewBackgroundClassName: 'bg-base-200',
  },
  system: {
    name: 'system',
    eyebrow: 'System template',
    title: 'Транзакционное или сервисное письмо',
    subtitle: 'Структурный хедер, чистое тело и спокойный служебный футер.',
    topLink: 'Log in',
    headerClassName: 'bg-base-100',
    heroClassName: 'bg-primary/10 text-base-content',
    noteClassName: 'bg-info/15 text-base-content',
    buttonClassName: 'bg-primary text-primary-content',
    footerTitle: 'Support and system notifications',
    footerCopy:
      'Place product help, settings links and formal email details here.',
    footerLinks: ['Help center', 'Status page', 'Account settings'],
    previewBackgroundClassName: 'bg-base-300/50',
  },
  sales: {
    name: 'sales',
    eyebrow: 'Sales template',
    title: 'Персональное письмо от менеджера',
    subtitle:
      'Более личная подача, карточка контакта и мягкий подвал с контактами.',
    topLink: 'Book a call',
    headerClassName: 'bg-base-100',
    heroClassName: 'bg-secondary/15 text-base-content',
    noteClassName: 'bg-accent/15 text-base-content',
    buttonClassName: 'bg-neutral text-neutral-content',
    footerTitle: 'Sales contact footer',
    footerCopy:
      'Here can live the manager signature, title, CTA and extra contact details.',
    footerLinks: ['Email', 'Calendar', 'WhatsApp'],
    previewBackgroundClassName: 'bg-base-200',
  },
};

const starterBlocksByTemplate: Record<TemplateName, EmailBlock[]> = {
  marketing: [
    createBlockByType('heading'),
    createBlockByType('paragraph'),
    createBlockByType('button'),
    createBlockByType('highlight'),
  ],
  system: [
    { ...createBlockByType('heading'), text: 'Обновление по вашему аккаунту' },
    {
      ...createBlockByType('paragraph'),
      text: 'Это тестовый системный блок. Здесь удобно показывать статус, изменения в продукте или инструкцию для следующего шага.',
    },
    createBlockByType('divider'),
    createBlockByType('paragraph'),
  ],
  sales: [
    {
      ...createBlockByType('heading'),
      text: 'Есть идея для вашего следующего письма',
    },
    {
      ...createBlockByType('paragraph'),
      text: 'Персонализируйте вступление и быстро соберите письмо с акцентом на диалог, пользу и следующий контакт.',
    },
    createBlockByType('button'),
  ],
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const formatTextHtml = (value: string) =>
  escapeHtml(value).replace(/\n/g, '<br />');

const renderBlocksHtml = (blocks: EmailBlock[], preset: TemplatePreset) =>
  blocks
    .map((block) => {
      if (block.type === 'heading') {
        return `<tr><td style="padding:0 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:32px;line-height:38px;font-weight:700;color:#151129;">${formatTextHtml(block.text ?? '')}</td></tr>`;
      }

      if (block.type === 'paragraph') {
        return `<tr><td style="padding:0 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:28px;color:#463f63;">${formatTextHtml(block.text ?? '')}</td></tr>`;
      }

      if (block.type === 'button') {
        return `<tr><td style="padding:8px 0 16px"><span style="display:block;padding-bottom:8px;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:16px;letter-spacing:0.24em;text-transform:uppercase;color:#6f58d9;">${formatTextHtml(block.secondaryText ?? '')}</span><a href="#" style="display:inline-block;padding:14px 28px;border-radius:999px;background:${preset.name === 'sales' ? '#1d1b2f' : '#5f43d0'};color:#ffffff;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:700;">${formatTextHtml(block.text ?? '')}</a></td></tr>`;
      }

      if (block.type === 'highlight') {
        return `<tr><td style="padding:0 0 16px"><table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse"><tr><td style="padding:18px 20px;border-radius:20px;background:#fff1df;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:28px;color:#8a3b12;">${formatTextHtml(block.text ?? '')}</td></tr></table></td></tr>`;
      }

      if (block.type === 'divider') {
        return '<tr><td style="padding:8px 0 16px"><div style="height:1px;background:#e3dff0;"></div></td></tr>';
      }

      return `<tr><td style="height:${block.height ?? 32}px;line-height:${block.height ?? 32}px;font-size:0">&nbsp;</td></tr>`;
    })
    .join('');

const buildEmailHtml = (blocks: EmailBlock[], preset: TemplatePreset) => {
  const footerLinks = preset.footerLinks
    .map(
      (link) =>
        `<a href="#" style="color:#6f58d9;text-decoration:none;margin-right:16px;">${escapeHtml(link)}</a>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(preset.title)}</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f4f6;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f6;border-collapse:collapse;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;border-collapse:collapse;background:#ffffff;border-radius:24px;overflow:hidden;">
            <tr>
              <td style="padding:28px 40px 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;letter-spacing:0.24em;text-transform:uppercase;color:#6f58d9;">
                ${escapeHtml(preset.eyebrow)}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 40px 24px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tr>
                    <td style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:20px;color:#151129;">kommo</td>
                    <td align="right" style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:20px;color:#6f58d9;">${escapeHtml(preset.topLink)}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 24px 24px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:${preset.name === 'sales' ? '#f1ecff' : preset.name === 'system' ? '#f3f0ff' : '#19162b'};border-radius:24px;">
                  <tr>
                    <td style="padding:32px 28px;font-family:Arial,Helvetica,sans-serif;color:${preset.name === 'marketing' ? '#ffffff' : '#151129'};">
                      <div style="font-size:12px;line-height:18px;letter-spacing:0.22em;text-transform:uppercase;opacity:0.72;">${escapeHtml(preset.eyebrow)}</div>
                      <div style="padding-top:12px;font-size:28px;line-height:34px;font-weight:700;">${escapeHtml(preset.title)}</div>
                      <div style="padding-top:12px;font-size:15px;line-height:24px;opacity:0.84;">${escapeHtml(preset.subtitle)}</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 40px 8px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  ${renderBlocksHtml(blocks, preset)}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 24px 28px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:#f7f5fb;border-radius:24px;">
                  <tr>
                    <td style="padding:24px 28px;font-family:Arial,Helvetica,sans-serif;">
                      <div style="font-size:14px;line-height:20px;font-weight:700;color:#151129;">${escapeHtml(preset.footerTitle)}</div>
                      <div style="padding-top:10px;font-size:14px;line-height:24px;color:#5b5573;">${escapeHtml(preset.footerCopy)}</div>
                      <div style="padding-top:18px;font-size:14px;line-height:20px;">${footerLinks}</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};

type EditableFieldProps = {
  value: string;
  onChange: (value: string) => void;
  className: string;
  multiline?: boolean;
};

const EditableField: React.FC<EditableFieldProps> = ({
  value,
  onChange,
  className,
  multiline = false,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!multiline || !textareaRef.current) {
      return;
    }

    textareaRef.current.style.height = '0px';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [multiline, value]);

  if (multiline) {
    return (
      <textarea
        ref={textareaRef}
        rows={1}
        dir="ltr"
        spellCheck={false}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={className}
        style={{ unicodeBidi: 'plaintext' }}
      />
    );
  }

  return (
    <input
      dir="ltr"
      spellCheck={false}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={className}
      style={{ unicodeBidi: 'plaintext' }}
    />
  );
};

type CanvasBlockProps = {
  block: EmailBlock;
  index: number;
  isSelected: boolean;
  buttonClassName: string;
  noteClassName: string;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
  onDuplicate: (id: string) => void;
  onUpdate: (id: string, patch: Partial<EmailBlock>) => void;
  onInsertAt: (type: BlockType, index: number) => void;
  onMove: (from: number, to: number) => void;
};

const CanvasBlock: React.FC<CanvasBlockProps> = ({
  block,
  index,
  isSelected,
  buttonClassName,
  noteClassName,
  onSelect,
  onRemove,
  onDuplicate,
  onUpdate,
  onInsertAt,
  onMove,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: 'EMAIL_BLOCK',
      item: { kind: 'email-block', id: block.id, index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [block.id, index]
  );

  const [{ isOver }, dropRef] = useDrop(
    () => ({
      accept: ['PALETTE_BLOCK', 'EMAIL_BLOCK'],
      hover: (item: DragItem) => {
        if (item.kind !== 'email-block' || item.index === index) {
          return;
        }

        onMove(item.index, index);
        item.index = index;
      },
      drop: (item: DragItem, monitor) => {
        if (monitor.didDrop()) {
          return undefined;
        }

        if (item.kind === 'palette-block') {
          onInsertAt(item.blockType, index);
        }

        return { handled: true };
      },
      collect: (monitor) => ({
        isOver: monitor.isOver({ shallow: true }),
      }),
    }),
    [index, onInsertAt, onMove]
  );

  dragRef(dropRef(ref));

  const wrapperClassName = [
    'group relative rounded-[1.5rem] border bg-base-100/80 p-4 transition',
    isSelected
      ? 'border-primary shadow-lg'
      : 'border-transparent hover:border-base-300',
    isOver ? 'ring-2 ring-primary/25' : '',
  ].join(' ');

  const controlButtonClassName =
    'btn btn-ghost btn-xs rounded-full opacity-0 transition group-hover:opacity-100';

  return (
    <div
      ref={ref}
      className={wrapperClassName}
      style={{ opacity: isDragging ? 0.38 : 1 }}
      onClick={() => onSelect(block.id)}
    >
      <div className="absolute right-3 top-3 flex gap-1">
        <button
          type="button"
          className={controlButtonClassName}
          onClick={(event) => {
            event.stopPropagation();
            onDuplicate(block.id);
          }}
        >
          Дубль
        </button>
        <button
          type="button"
          className={`${controlButtonClassName} text-error`}
          onClick={(event) => {
            event.stopPropagation();
            onRemove(block.id);
          }}
        >
          Удалить
        </button>
      </div>

      {block.type === 'heading' && (
        <EditableField
          value={block.text ?? ''}
          onChange={(text) => {
            onSelect(block.id);
            onUpdate(block.id, { text });
          }}
          className="w-full border-none bg-transparent p-0 text-left text-[32px] font-semibold leading-[1.15] text-base-content outline-none placeholder:text-base-content/40"
        />
      )}

      {block.type === 'paragraph' && (
        <EditableField
          multiline
          value={block.text ?? ''}
          onChange={(text) => {
            onSelect(block.id);
            onUpdate(block.id, { text });
          }}
          className="w-full resize-none overflow-hidden border-none bg-transparent p-0 text-left text-[16px] leading-7 text-base-content/80 outline-none"
        />
      )}

      {block.type === 'button' && (
        <div className="inline-flex max-w-full flex-col gap-2">
          <EditableField
            value={block.secondaryText ?? ''}
            onChange={(secondaryText) => {
              onSelect(block.id);
              onUpdate(block.id, { secondaryText });
            }}
            className="w-44 border-none bg-transparent p-0 text-left text-[11px] uppercase tracking-[0.22em] text-primary outline-none"
          />
          <div className={`inline-flex rounded-full ${buttonClassName}`}>
            <EditableField
              value={block.text ?? ''}
              onChange={(text) => {
                onSelect(block.id);
                onUpdate(block.id, { text });
              }}
              className="min-w-[220px] border-none bg-transparent px-6 py-4 text-center text-[16px] font-semibold outline-none"
            />
          </div>
        </div>
      )}

      {block.type === 'highlight' && (
        <div className={`rounded-[1.25rem] px-6 py-5 ${noteClassName}`}>
          <EditableField
            multiline
            value={block.text ?? ''}
            onChange={(text) => {
              onSelect(block.id);
              onUpdate(block.id, { text });
            }}
            className="w-full resize-none overflow-hidden border-none bg-transparent p-0 text-left text-[16px] leading-7 outline-none"
          />
        </div>
      )}

      {block.type === 'divider' && <div className="h-px w-full bg-base-300" />}

      {block.type === 'spacer' && (
        <div
          className="flex items-center justify-center rounded-[1.25rem] border border-dashed border-base-300 bg-base-200/70 text-sm font-medium text-base-content/55"
          style={{ minHeight: block.height ?? 32 }}
        >
          {block.secondaryText ?? `${block.height ?? 32} px`}
        </div>
      )}
    </div>
  );
};

type EmailShellProps = {
  blocks: EmailBlock[];
  preset: TemplatePreset;
  selectedBlockId: string | null;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
  onDuplicate: (id: string) => void;
  onUpdate: (id: string, patch: Partial<EmailBlock>) => void;
  onInsertAt: (type: BlockType, index: number) => void;
  onMove: (from: number, to: number) => void;
};

const EmailShell: React.FC<EmailShellProps> = ({
  blocks,
  preset,
  selectedBlockId,
  onSelect,
  onRemove,
  onDuplicate,
  onUpdate,
  onInsertAt,
  onMove,
}) => {
  const [{ isOverCanvas }, canvasDropRef] = useDrop(
    () => ({
      accept: ['PALETTE_BLOCK', 'EMAIL_BLOCK'],
      drop: (item: DragItem, monitor) => {
        if (monitor.didDrop()) {
          return undefined;
        }

        if (item.kind === 'palette-block') {
          onInsertAt(item.blockType, blocks.length);
        }

        return { handled: true };
      },
      collect: (monitor) => ({
        isOverCanvas: monitor.isOver({ shallow: true }),
      }),
    }),
    [blocks.length, onInsertAt]
  );

  return (
    <div
      className={`mx-auto rounded-[2rem] p-4 md:p-6 ${preset.previewBackgroundClassName}`}
    >
      <div
        ref={canvasDropRef}
        className={`mx-auto max-w-[680px] rounded-[2rem] border border-base-300 bg-base-100 shadow-xl transition ${
          isOverCanvas ? 'ring-2 ring-primary/30' : ''
        }`}
      >
        <div
          className={`rounded-t-[2rem] border-b border-base-300 ${preset.headerClassName}`}
        >
          <div className="flex items-center justify-between px-6 py-5">
            <div className="text-sm font-semibold tracking-[0.22em] text-primary uppercase">
              kommo
            </div>
            <button
              type="button"
              className="btn btn-ghost btn-sm pointer-events-none"
            >
              {preset.topLink}
            </button>
          </div>
        </div>

        <div className="px-4 pt-4 md:px-6 md:pt-6">
          <div
            className={`rounded-[1.75rem] px-6 py-8 md:px-8 ${preset.heroClassName}`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">
              {preset.eyebrow}
            </p>
            <h3 className="mt-3 max-w-[480px] text-[26px] font-semibold leading-[1.15] md:text-[30px]">
              {preset.title}
            </h3>
            <p className="mt-3 max-w-[460px] text-sm leading-6 opacity-80 md:text-base">
              {preset.subtitle}
            </p>
          </div>
        </div>

        <div className="px-6 py-6 md:px-8 md:py-8">
          <div className="flex flex-col gap-3">
            {blocks.map((block, index) => (
              <CanvasBlock
                key={block.id}
                block={block}
                index={index}
                isSelected={selectedBlockId === block.id}
                buttonClassName={preset.buttonClassName}
                noteClassName={preset.noteClassName}
                onSelect={onSelect}
                onRemove={onRemove}
                onDuplicate={onDuplicate}
                onUpdate={onUpdate}
                onInsertAt={onInsertAt}
                onMove={onMove}
              />
            ))}

            {!blocks.length && (
              <div className="rounded-[1.5rem] border border-dashed border-base-300 px-6 py-14 text-center text-base-content/60">
                Перетащите первый блок в письмо.
              </div>
            )}
          </div>
        </div>

        <div className="px-4 pb-4 md:px-6 md:pb-6">
          <div className="rounded-[1.75rem] border border-base-300 bg-base-200/60 px-6 py-6">
            <p className="text-sm font-semibold">{preset.footerTitle}</p>
            <p className="mt-2 max-w-[500px] text-sm leading-6 text-base-content/70">
              {preset.footerCopy}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {preset.footerLinks.map((link) => (
                <button
                  key={link}
                  type="button"
                  className="btn btn-ghost btn-sm pointer-events-none"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DropZone: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateName>('marketing');
  const [blocks, setBlocks] = useState<EmailBlock[]>(
    starterBlocksByTemplate.marketing
  );
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const currentPreset = templatePresets[selectedTemplate];

  const finalPreviewHtml = useMemo(
    () => buildEmailHtml(blocks, currentPreset),
    [blocks, currentPreset]
  );

  const replaceWithStarterBlocks = useCallback((templateName: TemplateName) => {
    setBlocks(
      starterBlocksByTemplate[templateName].map((block) => ({
        ...block,
        id: crypto.randomUUID(),
      }))
    );
    setSelectedBlockId(null);
  }, []);

  const insertBlockAt = useCallback((type: BlockType, index: number) => {
    setBlocks((currentBlocks) => {
      const nextBlock = createBlockByType(type);
      const nextBlocks = [...currentBlocks];
      nextBlocks.splice(index, 0, nextBlock);
      return nextBlocks;
    });
  }, []);

  const moveBlock = useCallback((from: number, to: number) => {
    setBlocks((currentBlocks) => {
      if (
        from === to ||
        from < 0 ||
        to < 0 ||
        from >= currentBlocks.length ||
        to >= currentBlocks.length
      ) {
        return currentBlocks;
      }

      const nextBlocks = [...currentBlocks];
      const [movedBlock] = nextBlocks.splice(from, 1);
      nextBlocks.splice(to, 0, movedBlock);
      return nextBlocks;
    });
  }, []);

  const updateBlock = useCallback((id: string, patch: Partial<EmailBlock>) => {
    setBlocks((currentBlocks) =>
      currentBlocks.map((block) =>
        block.id === id ? { ...block, ...patch } : block
      )
    );
  }, []);

  const duplicateBlock = useCallback((id: string) => {
    setBlocks((currentBlocks) => {
      const blockIndex = currentBlocks.findIndex((block) => block.id === id);

      if (blockIndex === -1) {
        return currentBlocks;
      }

      const clone = { ...currentBlocks[blockIndex], id: crypto.randomUUID() };
      const nextBlocks = [...currentBlocks];
      nextBlocks.splice(blockIndex + 1, 0, clone);
      return nextBlocks;
    });
  }, []);

  const removeBlock = useCallback((id: string) => {
    setBlocks((currentBlocks) =>
      currentBlocks.filter((block) => block.id !== id)
    );
    setSelectedBlockId((currentId) => (currentId === id ? null : currentId));
  }, []);

  return (
    <>
      <section className="space-y-4">
        <div className="flex flex-col gap-3 rounded-[2rem] border border-base-300 bg-base-100 p-4 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Email shell
            </p>
            <h2 className="text-xl font-semibold">
              Правдоподобный preview письма
            </h2>
            <p className="mt-2 text-sm leading-6 text-base-content/70">
              Шаблон меняет хедер, герой и футер. Контент внутри можно собирать
              drag-and-drop.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              className="select select-bordered w-full max-w-xs"
              value={selectedTemplate}
              onChange={(event) =>
                setSelectedTemplate(event.target.value as TemplateName)
              }
            >
              {templates.map((template) => (
                <option key={template.id} value={template.name}>
                  {template.title}
                </option>
              ))}
            </select>

            <button
              type="button"
              className="btn btn-outline"
              onClick={() => replaceWithStarterBlocks(selectedTemplate)}
            >
              Сбросить блоки
            </button>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setIsPreviewOpen(true)}
            >
              Открыть финальный preview
            </button>
          </div>
        </div>

        <EmailShell
          blocks={blocks}
          preset={currentPreset}
          selectedBlockId={selectedBlockId}
          onSelect={setSelectedBlockId}
          onRemove={removeBlock}
          onDuplicate={duplicateBlock}
          onUpdate={updateBlock}
          onInsertAt={insertBlockAt}
          onMove={moveBlock}
        />
      </section>

      {isPreviewOpen && (
        <div className="modal modal-open">
          <div className="modal-box h-[85vh] w-11/12 max-w-6xl bg-base-100 p-4 md:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold">
                  Финальный preview письма
                </h3>
                <p className="mt-1 text-sm text-base-content/70">
                  Это приближённый итоговый вид письма в HTML-оболочке
                  выбранного шаблона.
                </p>
              </div>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setIsPreviewOpen(false)}
              >
                Закрыть
              </button>
            </div>

            <iframe
              title="Final email preview"
              className="h-[calc(85vh-96px)] w-full rounded-[1.5rem] border border-base-300 bg-white"
              srcDoc={finalPreviewHtml}
            />
          </div>
          <button
            type="button"
            className="modal-backdrop"
            onClick={() => setIsPreviewOpen(false)}
          >
            close
          </button>
        </div>
      )}
    </>
  );
};

export default DropZone;
