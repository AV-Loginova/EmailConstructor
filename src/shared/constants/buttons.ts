import QuestionIcon from '@assets/question.svg';
import DownloadIcon from '@assets/download.svg';
import CopyIcon from '@assets/copy.svg';
import UndoIcon from '@assets/undo.svg';
import TrashIcon from '@assets/trash.svg';
import {
  renderBackground,
  renderButton,
  renderHeading,
  renderImage,
  renderLink,
  renderList,
  renderListItem,
  renderNewLine,
  renderParagraph,
  renderSignature,
} from '@shared/snippets/render';

type ActionType = 'copy' | 'download' | 'undo' | 'clear' | 'none';

export const codeEditButtons = [
  {
    id: 1,
    name: 'Новая строка',
    lines: 8,
    variant: 'neutral',
    html: renderNewLine(),
  },
  {
    id: 2,
    name: 'Параграф',
    lines: 22,
    variant: 'neutral',
    html: renderParagraph(),
  },
  {
    id: 3,
    name: 'Картинка',
    lines: 4,
    variant: 'default',
    html: renderImage(),
  },
  {
    id: 4,
    name: 'Заголовок',
    lines: 16,
    variant: 'neutral',
    html: renderHeading(),
  },

  {
    id: 5,
    name: 'Кнопка',
    lines: 32,
    variant: 'neutral',
    html: renderButton(),
  },
  {
    id: 6,
    name: 'Ссылка',
    lines: 16,
    variant: 'default',
    html: renderLink(),
  },
  {
    id: 7,
    name: 'Список',
    lines: 17,
    variant: 'neutral',
    html: renderList(),
  },
  {
    id: 8,
    name: 'Элемент списка',
    lines: 3,
    variant: 'default',
    html: renderListItem(),
  },
  {
    id: 9,
    name: 'Фон',
    lines: 19,
    variant: 'neutral',
    html: renderBackground(),
  },
  {
    id: 10,
    name: 'Подпись',
    lines: 19,
    variant: 'neutral',
    html: renderSignature(),
  },
];

export const templateManipulateButtons = [
  {
    id: 1,
    alt: 'Copy Icon',
    src: CopyIcon,
    action: 'copy' as ActionType,
  },
  {
    id: 2,
    alt: 'Download Icon',
    src: DownloadIcon,
    action: 'download' as ActionType,
  },
  {
    id: 3,
    alt: 'Undo Icon',
    src: UndoIcon,
    action: 'undo' as ActionType,
  },
  {
    id: 4,
    alt: 'Clear Icon',
    src: TrashIcon,
    action: 'clear' as ActionType,
  },
  {
    id: 5,
    alt: 'Question Icon',
    src: QuestionIcon,
    action: 'none' as ActionType,
    title:
      'Элементы, которые должны находиться внутри новой строки или списка, отмечены серой кнопкой.',
  },
];
