export type BlockType =
  | 'heading'
  | 'paragraph'
  | 'button'
  | 'highlight'
  | 'divider'
  | 'spacer';

export interface EmailBlock {
  id: string;
  type: BlockType;
  text?: string;
  secondaryText?: string;
  height?: number;
}

export interface BlockDefinition {
  type: BlockType;
  label: string;
  description: string;
  badge: string;
  accent: string;
  createBlock: () => EmailBlock;
}

const createId = () => crypto.randomUUID();

export const blockLibrary: BlockDefinition[] = [
  {
    type: 'heading',
    label: 'Заголовок',
    description: 'Крупный заголовок для начала письма или нового смыслового блока.',
    badge: 'Text',
    accent: '#0E0142',
    createBlock: () => ({
      id: createId(),
      type: 'heading',
      text: 'Напишите заголовок письма',
    }),
  },
  {
    type: 'paragraph',
    label: 'Параграф',
    description: 'Обычный текстовый блок для объяснения предложения или контекста.',
    badge: 'Copy',
    accent: '#2563eb',
    createBlock: () => ({
      id: createId(),
      type: 'paragraph',
      text: 'Добавьте основной текст письма. Здесь можно описать выгоду, контекст и следующий шаг.',
    }),
  },
  {
    type: 'button',
    label: 'Кнопка',
    description: 'CTA-блок с коротким действием, которое можно поменять прямо в превью.',
    badge: 'CTA',
    accent: '#7c3aed',
    createBlock: () => ({
      id: createId(),
      type: 'button',
      text: 'Открыть предложение',
      secondaryText: 'Кнопка действия',
    }),
  },
  {
    type: 'highlight',
    label: 'Акцентный блок',
    description: 'Плашка для важной мысли, оффера или короткой заметки.',
    badge: 'Note',
    accent: '#ea580c',
    createBlock: () => ({
      id: createId(),
      type: 'highlight',
      text: 'Подсветите здесь ключевую мысль или краткое предложение для получателя.',
    }),
  },
  {
    type: 'divider',
    label: 'Разделитель',
    description: 'Тонкая линия, которая помогает визуально разделять секции письма.',
    badge: 'Layout',
    accent: '#64748b',
    createBlock: () => ({
      id: createId(),
      type: 'divider',
    }),
  },
  {
    type: 'spacer',
    label: 'Отступ',
    description: 'Пустое пространство между блоками для более свободной композиции письма.',
    badge: 'Space',
    accent: '#16a34a',
    createBlock: () => ({
      id: createId(),
      type: 'spacer',
      height: 32,
      secondaryText: '32 px',
    }),
  },
];

export const createBlockByType = (type: BlockType): EmailBlock => {
  const definition = blockLibrary.find((block) => block.type === type);

  if (!definition) {
    throw new Error(`Unknown block type: ${type}`);
  }

  return definition.createBlock();
};
