import QuestionIcon from '../assets/question.svg';
import DownloadIcon from '../assets/download.svg';
import CopyIcon from '../assets/copy.svg';
import UndoIcon from '../assets/undo.svg';
import TrashIcon from '../assets/trash.svg';

type ActionType = 'copy' | 'download' | 'undo' | 'clear' | 'none';

export const codeEditButtons = [
  {
    id: 1,
    name: 'Новая строка',
    lines: 8,
    variant: 'neutral',
    html: `<tr>
    <td
      height="22"
      width="496"
      style="height: 22px; line-height: 22px; border-collapse: collapse"
    >
<!-- Ссылки и картинки вставлять сюда -->
    </td>
  </tr>
  `,
  },
  {
    id: 2,
    name: 'Параграф',
    lines: 22,
    variant: 'neutral',
    html: `<tr>
      <td
        height="15"
        width="496"
        style="
          margin: 0;
          padding: 0;
          height: 15px;
          width: 496px;
          border-collapse: collapse;
          color: #0E0142;
          font-family: 'arial', 'helvetica', sans-serif, 'roboto';
          font-size: 16px;
          font-weight: 400;
          line-height: 20px;
        "
        >
        Вместо меня должен быть текст
        </td
      >
    </tr>
    `,
  },
  {
    id: 3,
    name: 'Картинка',
    lines: 6,
    variant: 'default',
    html: ` <img
    src=""
    alt="Мне нужен источник"
    style=""
    width="496"
    style="height: 496px"
  />
  `,
  },
  {
    id: 4,
    name: 'Заголовок',
    lines: 16,
    variant: 'neutral',
    html: `
    <tr>
      <td height="13" width="496" style="height: 13px; width: 496px; border-collapse: collapse">
        <h2
        style="
        margin: 0;
        padding: 0;
        color: #0E0142;
        font-family: 'arial', 'helvetica', sans-serif,'roboto';
        font-size: 24px;
        font-weight: 700;
        line-height: 28px;
        "
        >
          Я заголовок
        </h2>
      </td>
  </tr>
  `,
  },

  {
    id: 5,
    name: 'Кнопка',
    lines: 32,
    variant: 'neutral',
    html: `<tr height="40" style="height:40px"><td align="left">
      <table border="0" cellpadding="0" cellspacing="0">
        <tbody>
          <tr height="40" style="height: 40px">
            <td align="center" bgcolor="#0e0142" style="border-radius:26px">
              <a href="" rel="noopener noreferrer" target="_blank" style="background-color:#0e0142;border-color:#0e0142;border-radius:26px;border-style:solid;border-width:12px 32px;color:#ffffff !important;font-family:'arial' , 'helvetica' , sans-serif , 'roboto';font-size:16px;font-weight:700;text-decoration:none" data-link-id="26">
                Я кнопка
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </td>
  </tr>
  `,
  },
  {
    id: 6,
    name: 'Ссылка',
    lines: 16,
    variant: 'default',
    html: ` <a rel="noopener noreferrer"
      href=""
      style="
        color: #5f43d0;
        font-family: 'arial', 'helvetica', sans-serif, 'roboto';
        font-size: 16px;
        font-weight: 400;
        line-height: 20px;
        margin: 0;
        padding: 0;
        word-break: break-word;
      "
      target="_blank"
      rel="noopener noreferrer"
      >Я ссылка
    </a>
  `,
  },
  {
    id: 7,
    name: 'Список',
    lines: 17,
    variant: 'neutral',
    html: ` <tr>
      <td style="border-collapse: collapse">
        <ul
          style="
            margin: 0;
            padding: 0;
            list-style: none;
            color: #0E0142;
            font-family: 'arial', 'helvetica', sans-serif, 'roboto';
            font-size: 16px;
            font-weight: 400;
            line-height: 20px;
          "
        >
        Вместо меня должны быть элементы списка
        </ul>
      </td>
    </tr>
  `,
  },
  {
    id: 8,
    name: 'Элемент списка',
    lines: 3,
    variant: 'default',
    html: ` <li style="padding: 2px 0 2px 6px"
      >
      Я элемент списка, помести меня в список
      </li>
  `,
  },
  {
    id: 9,
    name: 'Фон',
    lines: 19,
    variant: 'neutral',
    html: ` <tr>
    <td
      height="14"
      width="496"
      style="height: 14px; width: 496px; line-height: 20px; border-collapse: collapse; background-color: #f9f7ff"
    >
      <p style="
          padding: 18px 16px;
          border-collapse: collapse;
          color: #0E0142;
          font-family: 'arial', 'helvetica', sans-serif, 'roboto';
          font-size: 16px;
          font-weight: 400;
          line-height: 20px;
          margin: 0;
          ">
<!-- Я элемент с фоном -->
      </p>
    </td>
  </tr>
  `,
  },
  {
    id: 10,
    name: 'Подпись',
    lines: 19,
    variant: 'neutral',
    html: ` <tr width="496" style="width: 496px">
  <td style="border-collapse: collapse">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="496" style="
        border-collapse: collapse;
        margin: 0;
        font-family: 'arial', 'helvetica',
          sans-serif, 'roboto';
        font-size: 16px;
        font-weight: 400;
        line-height: 20px;
        color: #0e0142;
      ">
      <tbody><tr style="line-height: 20px">
        <td style="
            font-size: 20px;
            font-weight: 700;
          ">{{profile.name}}</td>
      </tr>
      <tr style="line-height: 20px">
        <td style="
            color: #0e014299;
            font-size: 14px;
            opacity: 0.6;
          ">Sales representative | Kommo Sales
          Team</td>
      </tr>
      <tr>
        <td height="15" style="border-collapse: collapse" width="496"></td>
      </tr>
      <tr height="41" style="height: 41px">
        <td width="" align="left"  style="border-radius: 26px">
          <a href="{{profile.phone}}?utm_source=dp&amp;utm_campaign=comm&amp;utm_medium=email" rel="noopener noreferrer" target="_blank" style="
              height: 40px;
              width: 200px;
              padding: 0 65px;
              background-color: #0e0142;
              border-color: #0e0142;
              border-radius: 26px;
              border-style: solid;
              border-width: 12px 32px !important;
              color: #ffffff !important;
              font-family: 'arial', 'helvetica',
                sans-serif, 'roboto';
              font-size: 16px;
              font-weight: 700;
              text-decoration: none;
            ">
            Get a spot
          </a>
        </td>
        <td width="520" style="width: 520px"></td>
      </tr>
    </tbody></table>
  </td>
</tr>
  `,
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
