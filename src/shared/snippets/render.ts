import {
  BUTTON,
  COLORS,
  EMAIL_WIDTH,
  FONT_FAMILY,
  HEADING,
  SPACING,
  TEXT,
} from './styles';

// Trusted markup that must be inserted as is (nested snippets, editor output).
export interface RawHtml {
  readonly __html: string;
}

export type Content = string | RawHtml;

export const raw = (html: string): RawHtml => ({ __html: html });

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export const escapeAttr = escapeHtml;

const content = (value: Content) =>
  typeof value === 'string' ? escapeHtml(value) : value.__html;

export const renderNewLine = ({
  content: inner = raw('<!-- Ссылки и картинки вставлять сюда -->'),
}: { content?: Content } = {}) => `<tr>
    <td
      height="${SPACING.newLineHeight}"
      width="${EMAIL_WIDTH}"
      style="height: ${SPACING.newLineHeight}px; line-height: ${SPACING.newLineHeight}px; border-collapse: collapse"
    >
${content(inner)}
    </td>
  </tr>
  `;

export const renderParagraph = ({
  text = 'Вместо меня должен быть текст',
}: { text?: Content } = {}) => `<tr>
      <td
        height="${SPACING.paragraphHeight}"
        width="${EMAIL_WIDTH}"
        style="
          margin: 0;
          padding: 0;
          height: ${SPACING.paragraphHeight}px;
          width: ${EMAIL_WIDTH}px;
          border-collapse: collapse;
          color: ${COLORS.text};
          font-family: ${FONT_FAMILY};
          font-size: ${TEXT.fontSize}px;
          font-weight: ${TEXT.fontWeight};
          line-height: ${TEXT.lineHeight}px;
        "
        >
        ${content(text)}
        </td
      >
    </tr>
    `;

export const renderImage = ({
  src = '',
  alt = 'Мне нужен источник',
}: { src?: string; alt?: string } = {}) => ` <img
    src="${escapeAttr(src)}"
    alt="${escapeAttr(alt)}"
    width="${EMAIL_WIDTH}"
  />
  `;

export const renderHeading = ({
  text = 'Я заголовок',
}: { text?: Content } = {}) => `
    <tr>
      <td height="${SPACING.headingHeight}" width="${EMAIL_WIDTH}" style="height: ${SPACING.headingHeight}px; width: ${EMAIL_WIDTH}px; border-collapse: collapse">
        <h2
        style="
        margin: 0;
        padding: 0;
        color: ${COLORS.text};
        font-family: ${FONT_FAMILY};
        font-size: ${HEADING.fontSize}px;
        font-weight: ${HEADING.fontWeight};
        line-height: ${HEADING.lineHeight}px;
        "
        >
          ${content(text)}
        </h2>
      </td>
  </tr>
  `;

export const renderButton = ({
  text = 'Я кнопка',
  href = '',
}: { text?: Content; href?: string } = {}) => `<tr height="${BUTTON.height}" style="height:${BUTTON.height}px"><td align="left">
      <table border="0" cellpadding="0" cellspacing="0">
        <tbody>
          <tr height="${BUTTON.height}" style="height: ${BUTTON.height}px">
            <td align="center" bgcolor="${COLORS.buttonBg}" style="border-radius:${BUTTON.borderRadius}px">
              <a href="${escapeAttr(href)}" rel="noopener noreferrer" target="_blank" style="background-color:${COLORS.buttonBg};border-color:${COLORS.buttonBg};border-radius:${BUTTON.borderRadius}px;border-style:solid;border-width:${BUTTON.borderWidth};color:${COLORS.buttonText} !important;font-family:${FONT_FAMILY};font-size:${BUTTON.fontSize}px;font-weight:${BUTTON.fontWeight};text-decoration:none" data-link-id="26">
                ${content(text)}
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </td>
  </tr>
  `;

export const renderLink = ({
  text = 'Я ссылка',
  href = '',
}: { text?: Content; href?: string } = {}) => ` <a rel="noopener noreferrer"
      href="${escapeAttr(href)}"
      style="
        color: ${COLORS.link};
        font-family: ${FONT_FAMILY};
        font-size: ${TEXT.fontSize}px;
        font-weight: ${TEXT.fontWeight};
        line-height: ${TEXT.lineHeight}px;
        margin: 0;
        padding: 0;
        word-break: break-word;
      "
      target="_blank"
      rel="noopener noreferrer"
      >${content(text)}
    </a>
  `;

export const renderList = ({
  items = 'Вместо меня должны быть элементы списка',
}: { items?: Content } = {}) => ` <tr>
      <td style="border-collapse: collapse">
        <ul
          style="
            margin: 0;
            padding: 0;
            list-style: none;
            color: ${COLORS.text};
            font-family: ${FONT_FAMILY};
            font-size: ${TEXT.fontSize}px;
            font-weight: ${TEXT.fontWeight};
            line-height: ${TEXT.lineHeight}px;
          "
        >
        ${content(items)}
        </ul>
      </td>
    </tr>
  `;

export const renderListItem = ({
  text = 'Я элемент списка, помести меня в список',
}: { text?: Content } = {}) => ` <li style="padding: ${SPACING.listItemPadding}"
      >
      ${content(text)}
      </li>
  `;

export const renderBackground = ({
  content: inner = raw('<!-- Я элемент с фоном -->'),
}: { content?: Content } = {}) => ` <tr>
    <td
      height="${SPACING.backgroundHeight}"
      width="${EMAIL_WIDTH}"
      style="height: ${SPACING.backgroundHeight}px; width: ${EMAIL_WIDTH}px; line-height: ${TEXT.lineHeight}px; border-collapse: collapse; background-color: ${COLORS.background}"
    >
      <p style="
          padding: ${SPACING.backgroundPadding};
          border-collapse: collapse;
          color: ${COLORS.text};
          font-family: ${FONT_FAMILY};
          font-size: ${TEXT.fontSize}px;
          font-weight: ${TEXT.fontWeight};
          line-height: ${TEXT.lineHeight}px;
          margin: 0;
          ">
${content(inner)}
      </p>
    </td>
  </tr>
  `;

export const renderSignature = ({
  name = '{{profile.name}}',
  position = `Sales representative | Kommo Sales
          Team`,
  buttonText = 'Get a spot',
  href = '{{profile.phone}}?utm_source=dp&utm_campaign=comm&utm_medium=email',
}: {
  name?: Content;
  position?: Content;
  buttonText?: Content;
  href?: string;
} = {}) => ` <tr width="${EMAIL_WIDTH}" style="width: ${EMAIL_WIDTH}px">
  <td style="border-collapse: collapse">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="${EMAIL_WIDTH}" style="
        border-collapse: collapse;
        margin: 0;
        font-family: ${FONT_FAMILY};
        font-size: ${TEXT.fontSize}px;
        font-weight: ${TEXT.fontWeight};
        line-height: ${TEXT.lineHeight}px;
        color: ${COLORS.text};
      ">
      <tbody><tr style="line-height: ${TEXT.lineHeight}px">
        <td style="
            font-size: 20px;
            font-weight: 700;
          ">${content(name)}</td>
      </tr>
      <tr style="line-height: ${TEXT.lineHeight}px">
        <td style="
            color: ${COLORS.textMuted};
            font-size: 14px;
            opacity: 0.6;
          ">${content(position)}</td>
      </tr>
      <tr>
        <td height="15" style="border-collapse: collapse" width="${EMAIL_WIDTH}"></td>
      </tr>
      <tr height="41" style="height: 41px">
        <td width="" align="left"  style="border-radius: ${BUTTON.borderRadius}px">
          <a href="${escapeAttr(href)}" rel="noopener noreferrer" target="_blank" style="
              height: 40px;
              width: 200px;
              padding: 0 65px;
              background-color: ${COLORS.buttonBg};
              border-color: ${COLORS.buttonBg};
              border-radius: ${BUTTON.borderRadius}px;
              border-style: solid;
              border-width: ${BUTTON.borderWidth} !important;
              color: ${COLORS.buttonText} !important;
              font-family: ${FONT_FAMILY};
              font-size: ${BUTTON.fontSize}px;
              font-weight: ${BUTTON.fontWeight};
              text-decoration: none;
            ">
            ${content(buttonText)}
          </a>
        </td>
        <td width="520" style="width: 520px"></td>
      </tr>
    </tbody></table>
  </td>
</tr>
  `;
