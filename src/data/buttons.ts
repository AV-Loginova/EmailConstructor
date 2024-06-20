export const buttons = [
  {
    id: 1,
    name: "Новая строка",
    lines: 8,
    variant: "success",
    html: `<tr>
    <td
      height="13"
      width="496"
      style="border-collapse: collapse"
    >
<!-- Ссылки и картинки вставлять сюда -->
    </td>
  </tr>
  `,
  },
  {
    id: 2,
    name: "Параграф",
    lines: 18,
    variant: "success",
    html: `<tr>
      <td
        height="13"
        width="496"
        style="
          border-collapse: collapse;
          color: #000000;
          font-family: 'arial', 'helvetica', sans-serif, 'roboto';
          font-size: 16px;
          font-weight: 400;
          line-height: 20px;
          margin: 0;
          padding: 0;
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
    name: "Картинка",
    lines: 6,
    variant: "warning",
    html: ` <img
    src=""
    alt="Мне нужен источник"
    style=""
    width=""
    height=""
  />
  `,
  },
  {
    id: 4,
    name: "Заголовок",
    lines: 16,
    variant: "success",
    html: `<tr>
      <td height="13" width="496" style="border-collapse: collapse">
        <h2
          style="
            color: #000000;
            font-family: 'arial', 'helvetica', sans-serif, 'roboto';
            font-size: 24px;
            font-weight: 700;
            line-height: 28px;
            margin: 0;
            padding: 0;
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
    name: "Кнопка",
    lines: 32,
    variant: "success",
    html: `<tr>
    <td align="left">
      <table border="0" cellpadding="0" cellspacing="0">
        <tbody>
          <tr>
            <td align="center" bgcolor="#0e0142" style="border-radius: 26px">
              <a
                href="{{profile.phone}}"
                style="
                  background-color: #0e0142;
                  border-color: #0e0142;
                  border-radius: 26px;
                  border-style: solid;
                  border-width: 12px 32px 12px 32px;
                  color: #ffffff;
                  display: block;
                  font-family: 'arial', 'helvetica', sans-serif, 'roboto';
                  font-size: 16px;
                  font-weight: 700;
                  text-decoration: none;
                  cursor: pointer;
                "
                data-link-id="87"
                target="_blank"
                rel="noopener noreferrer"
                >Я кнопка
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
    name: "Ссылка",
    lines: 14,
    variant: "warning",
    html: ` <a
      href=""
      style="
        color: #5f43d0;
        font-family: 'arial', 'helvetica', sans-serif, 'roboto';
        font-size: 16px;
        font-weight: 400;
        line-height: 20px;
        margin: 0;
        padding: 0;
      "
      data-link-id="21"
      target="_blank"
      rel="noopener noreferrer"
      >Я ссылка</a>
  `,
  },
  {
    id: 7,
    name: "Список",
    lines: 17,
    variant: "success",
    html: ` <tr>
      <td style="border-collapse: collapse">
        <ul
          style="
            list-style: none;
            color: #000000;
            font-family: 'arial', 'helvetica', sans-serif, 'roboto';
            font-size: 16px;
            font-weight: 400;
            line-height: 20px;
            margin: 0;
            padding: 0;
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
    name: "Элемент списка",
    lines: 3,
    variant: "warning",
    html: ` <li style="padding-bottom: 8px"
      >
      Я элемент списка, помести меня в список
      </li>
  `,
  },
];
