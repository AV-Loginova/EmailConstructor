export const HTMLtemplate = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
  </head>
  <body
    style="margin: 0; padding: 0; max-width: 100%; background-color: #f5f5f5"
  >
    <center>
      <table
        border="0"
        cellpadding="0"
        cellspacing="0"
        style="
          max-width: 600px;
          padding: 0;
          margin: 0;
          border-collapse: collapse;
        "
      >
        <tbody>
          <tr height="48" style="border-collapse: collapse"></tr>

          <tr>
            <td
              width="600"
              style="border-collapse: collapse; padding: 0 20px"
              align="center"
            >
              <table
                align="center"
                bgcolor="#ffffff"
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="600"
                style="border-collapse: collapse; border-radius: 8px"
              >
                <tbody>
                  <!--Здесь начинается хедер с лого и ссылкой на логин -->
                  <tr>
                    <td style="padding: 0 52px">
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        width="496"
                        style="border-collapse: collapse; margin: 0"
                      >
                        <tr height="48"></tr>
                        <tr>
                          <td width="248" style="border-collapse: collapse">
                            <img
                              alt="KommoLogo"
                              height="48"
                              src="https://resize.yandex.net/mailservice?url=https%3A%2F%2Fwww.kommo.com%2Fimages%2Fnewsletters%2Fheader%2Ficon.png&amp;proxy=yes&amp;key=8ccdd4bbb9a9e9e2c9666e39646ebdb7"
                              width="48"
                              style="display: block; margin-right: auto"
                            />
                          </td>
                          <td
                            width="248"
                            style="border-collapse: collapse; text-align: right"
                          >
                            <a
                              href="https://www.kommo.com/#login"
                              style="
                                color: #5f43d0;
                                font-family: 'arial', 'helvetica', sans-serif,
                                  'roboto';
                                font-size: 16px;
                                font-weight: 400;
                                line-height: 20px;
                                margin: 0;
                                padding: 0;
                              "
                              data-link-id="21"
                              target="_blank"
                              rel="noopener noreferrer"
                              >Log in</a
                            >
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!--Здесь заканчивается хедер с лого и ссылкой на логин -->
                  <tr>
                    <td
                      style="border-collapse: collapse; padding: 0 52px"
                      align="center"
                    >
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        style="margin: 0; padding: 0"
                        align="center"
                        width="496"
                        style="border-collapse: collapse"
                      >
                        <tbody>
                          <!--Отступ перед заголовком -->
                          <tr>
                            <td
                              height="40"
                              width="496"
                              style="border-collapse: collapse"
                            ></td>
                          </tr>
                          <!--Заголовок -->
                          <tr>
                            <td width="496" style="border-collapse: collapse">
                              <h2
                                style="
                                  color: #0E0142;
                                  font-family: 'arial', 'helvetica', sans-serif,
                                    'roboto';
                                  font-size: 24px;
                                  font-weight: 700;
                                  line-height: 28px;
                                  margin: 0;
                                  padding: 0;
                                "
                              >
                                Hi
                                <a
                                  href="#"
                                  style="
                                    color: #0E0142;
                                    font-family: 'arial', 'helvetica',
                                      sans-serif, 'roboto';
                                    font-size: 24px;
                                    text-decoration: none;
                                  "
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  >{{contact.name}},</a
                                >
                              </h2>
                            </td>
                          </tr>
                          <!--Отступ после заголовка -->
                          <tr>
                            <td
                              height="13"
                              width="496"
                              style="border-collapse: collapse"
                            ></td>
                          </tr>
                          <tr>
                            <td
                              height="13"
                              width="496"
                              style="border-collapse: collapse"
                            ></td>
                          </tr>
                          <!--Тело письма здесь -->

                          <!--Отступ после тела письма-->
                          <tr>
                            <td
                              height="28"
                              width="496"
                              style="border-collapse: collapse"
                            ></td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
        <table
          border="0"
          align="center"
          cellpadding="0"
          cellspacing="0"
          width="600"
          style="border-collapse: collapse"
        >
          <tbody>
            <tr>
              <td
                height="28"
                width="600"
                style="border-collapse: collapse"
              ></td>
            </tr>
            <tr
              ><td align="center" width="600">
                <div>
                  <a
                    class="flex py-12 px-12 lg:px-0 lg:py-0"
                    href="https://www.facebook.com/KommoCRM"
                    target="_blank"
                    aria-label="Facebook"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://i.ibb.co/D1hQ45K/icons8-facebook-30.png"
                      alt="Facebook"
                      style="margin-right: 10px"
                      width="20"
                      height="20"
                  /></a>
                  <a
                    href="https://www.linkedin.com/company/kommo/"
                    target="_blank"
                    aria-label="LinkedIn"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://i.ibb.co/Sd2bmWt/icons8-linkedin-30-1.png"
                      alt="LinkedIn"
                      style="margin-right: 10px"
                      width="20"
                      height="20"
                  /></a>

                  <a
                    href="https://www.instagram.com/kommocrm/"
                    target="_blank"
                    aria-label="Instagram"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://i.ibb.co/mtK6q5C/icons8-instagram-48-1.png"
                      alt="Instagram"
                      style="margin-right: 10px"
                      width="20"
                      height="20"
                  /></a>

                  <a
                    href="https://www.youtube.com/user/amoCRM"
                    target="_blank"
                    aria-label="YouTube"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://i.ibb.co/DkT25sR/icons8-youtube-50.png"
                      alt="YouTube"
                      style="margin-right: 10px"
                      width="20"
                      height="20"
                  /></a>

                  <a
                    href="https://t.me/kommoglobal"
                    target="_blank"
                    aria-label="Telegram"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://i.ibb.co/xMqtVsg/icons8-telegram-50.png"
                      alt="Telegram"
                      width="20"
                      height="20"
                  /></a>
                </div> </td
            ></tr>

            <tr>
              <td
                height="28"
                width="600"
                style="border-collapse: collapse"
              ></td>
            </tr>
            <tr>
              <td align="center" width="600" style="border-collapse: collapse">
                <p
                  style="
                    color: #9aa1a8;
                    font-family: 'arial', 'helvetica', sans-serif, 'roboto';
                    font-size: 12px;
                    font-weight: 400;
                    line-height: 14px;
                    margin: 0;
                    padding: 0;
                  "
                >
                  <a
                    href="#"
                    style="
                      color: #9aa1a8;
                      font-family: 'arial', 'helvetica', sans-serif, 'roboto';
                      font-size: 12px;
                      text-decoration: none;
                    "
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ©2024 QSOFT LLC. All rights reserved.
                  </a>
                </p>
              </td>
            </tr>
            <tr>
              <td align="center" width="600" style="border-collapse: collapse">
                <p
                  style="
                    color: #9aa1a8;
                    font-family: 'arial', 'helvetica', sans-serif, 'roboto';
                    font-size: 12px;
                    font-weight: 400;
                    line-height: 14px;
                    margin: 0;
                    padding: 0;
                  "
                >
                  <a
                    href="#"
                    style="
                      color: #9aa1a8;
                      font-family: 'arial', 'helvetica', sans-serif, 'roboto';
                      font-size: 12px;
                      text-decoration: none;
                    "
                    target="_blank"
                    rel="noopener noreferrer"
                    >222 Columbus Ave Suite 407, San Francisco, CA 94133-4589</a
                  >
                </p>
              </td>
            </tr>
            <tr>
              <td
                height="40"
                width="600"
                style="border-collapse: collapse"
              ></td>
            </tr>
          </tbody>
        </table>
      </table>
    </center>
  </body>
</html>
`;
