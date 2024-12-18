export const templateWithNewFooterV2 = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <table
      style="
        margin: 0;
        padding: 0;
        width: 100%;
        max-width: 100%;
        background-color: #f5f5f5;
      "
    >
      <tr>
        <td>
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
                                <td
                                  width="248"
                                  style="border-collapse: collapse"
                                >
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
                                  style="
                                    border-collapse: collapse;
                                    text-align: right;
                                  "
                                >
                                  <a
                                    href="https://www.kommo.com/#login"
                                    style="
                                      color: #5f43d0;
                                      font-family: 'arial', 'helvetica',
                                        sans-serif, 'roboto';
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
                                  <td
                                    width="496"
                                    style="border-collapse: collapse"
                                  >
                                    <h2
                                      style="
                                        color: #0e0142;
                                        font-family: 'arial', 'helvetica',
                                          sans-serif, 'roboto';
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
                                          color: #0e0142;
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
                                    style="
                                      border-collapse: collapse;
                                      min-width: 496px;
                                    "
                                  ></td>
                                </tr>
                                <!--Тело письма здесь -->

                                <!--Отступ после тела письма-->
                                <tr>
                                  <td
                                    height="15"
                                    width="496"
                                    style="
                                      border-collapse: collapse;
                                      border-bottom: 1px;
                                      border-bottom-style: solid;
                                      border-bottom-color: #e7e6ec;
                                    "
                                  ></td>
                                </tr>
                                <center>
                                  <table
                                    align="center"
                                    style="
                                      width: 496px;
                                      min-width: 496px;
                                      margin: 0;
                                      padding: 0;
                                      line-height: 0;
                                      color: #0e0142;
                                      font-family: 'arial', 'helvetica',
                                        sans-serif, 'roboto';
                                      border-collapse: collapse;
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                    "
                                    cellpadding="0"
                                    cellspacing="0"
                                  >
                                    <tbody>
                                      <tr>
                                        <td style="height: 32px"></td>
                                      </tr>
                                      <tr
                                        style="
                                          height: 24px;
                                          line-height: 45px;
                                          font-size: 20px;
                                          font-weight: 700;
                                          letter-spacing: -0.6px;
                                          white-space: nowrap;
                                        "
                                      >
                                        <td>Need help?</td>
                                      </tr>
                                      <tr style="height: 15px"></tr>
                                      <tr style="height: 93px">
                                        <td
                                          style="
                                            width: 157px;
                                            height: 92px;
                                            background-color: #f9f7ff;
                                            border-radius: 16px;
                                          "
                                        >
                                          <center>
                                            <a
                                              style="text-decoration: none"
                                              href="https://kommo.com"
                                            >
                                              <table
                                                cellpadding="0"
                                                cellspacing="0"
                                                style="
                                                  margin: 0;
                                                  padding: 0;
                                                  line-height: 0;
                                                  color: #0e0142;
                                                  font-family: 'arial',
                                                    'helvetica', sans-serif,
                                                    'roboto';
                                                  border-collapse: collapse;
                                                  width: 124px;
                                                  height: 92px;
                                                "
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      style="height: 14px"
                                                    ></td>
                                                  </tr>
                                                  <tr>
                                                    <td style="height: 32px">
                                                      <table
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        style="
                                                          text-align: center;
                                                          margin: 0;
                                                          padding: 0;
                                                          line-height: 0;
                                                          color: #0e0142;
                                                          font-family: 'arial',
                                                            'helvetica',
                                                            sans-serif, 'roboto';
                                                          border-collapse: collapse;
                                                          width: 32px;
                                                          height: 32px;
                                                        "
                                                      >
                                                        <tbody>
                                                          <tr>
                                                            <td
                                                              style="
                                                                width: 32px;
                                                                height: 32px;
                                                                background-color: #5f43d0;
                                                                border-radius: 8px;
                                                              "
                                                            >
                                                              <table
                                                                cellpadding="0"
                                                                cellspacing="0"
                                                                style="
                                                                  text-align: center;
                                                                  margin: 0;
                                                                  padding: 0;
                                                                  line-height: 0;
                                                                  color: #0e0142;
                                                                  font-family: 'arial',
                                                                    'helvetica',
                                                                    sans-serif,
                                                                    'roboto';
                                                                  border-collapse: collapse;
                                                                  width: 32px;
                                                                  height: 32px;
                                                                "
                                                              >
                                                                <tr>
                                                                  <td
                                                                    style="
                                                                      height: 8px;
                                                                    "
                                                                  ></td>
                                                                </tr>
                                                                <tr>
                                                                  <td
                                                                    style="
                                                                      height: 18px;
                                                                    "
                                                                  >
                                                                    <img
                                                                      style="
                                                                        width: 18px;
                                                                        height: 18px;
                                                                      "
                                                                      src="https://i.ibb.co/W6P6d5k/message.png"
                                                                      alt="message"
                                                                    />
                                                                  </td>
                                                                </tr>
                                                                <td
                                                                  style="
                                                                    height: 6px;
                                                                  "
                                                                ></td>
                                                              </table>
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      style="height: 9px"
                                                    ></td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      style="
                                                        height: 10px;
                                                        line-height: 14px;
                                                        font-size: 14px;
                                                        font-weight: 600;
                                                        letter-spacing: -0.3px;
                                                        white-space: nowrap;
                                                      "
                                                    >
                                                      Chat in Kommo
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      style="height: 17px"
                                                    ></td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </a>
                                          </center>
                                        </td>
                                        <td style="width: 13px"></td>
                                        <td
                                          style="
                                            width: 157px;
                                            height: 92px;
                                            background-color: #f9f7ff;
                                            border-radius: 16px;
                                          "
                                        >
                                          <center>
                                            <a
                                              style="text-decoration: none"
                                              href="https://kommo.com"
                                            >
                                              <table
                                                cellpadding="0"
                                                cellspacing="0"
                                                style="
                                                  margin: 0;
                                                  padding: 0;
                                                  line-height: 0;
                                                  color: #0e0142;
                                                  font-family: 'arial',
                                                    'helvetica', sans-serif,
                                                    'roboto';
                                                  border-collapse: collapse;
                                                  width: 124px;
                                                  height: 92px;
                                                "
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      style="height: 14px"
                                                    ></td>
                                                  </tr>
                                                  <tr>
                                                    <td style="height: 32px">
                                                      <table
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        style="
                                                          text-align: center;
                                                          margin: 0;
                                                          padding: 0;
                                                          line-height: 0;
                                                          color: #0e0142;
                                                          font-family: 'arial',
                                                            'helvetica',
                                                            sans-serif, 'roboto';
                                                          border-collapse: collapse;
                                                          width: 32px;
                                                          height: 32px;
                                                        "
                                                      >
                                                        <tbody>
                                                          <tr>
                                                            <td
                                                              style="
                                                                width: 32px;
                                                                height: 32px;
                                                                background-color: #5f43d0;
                                                                border-radius: 8px;
                                                              "
                                                            >
                                                              <table
                                                                cellpadding="0"
                                                                cellspacing="0"
                                                                style="
                                                                  text-align: center;
                                                                  margin: 0;
                                                                  padding: 0;
                                                                  line-height: 0;
                                                                  color: #0e0142;
                                                                  font-family: 'arial',
                                                                    'helvetica',
                                                                    sans-serif,
                                                                    'roboto';
                                                                  border-collapse: collapse;
                                                                  width: 32px;
                                                                  height: 32px;
                                                                "
                                                              >
                                                                <tr>
                                                                  <td
                                                                    style="
                                                                      height: 8px;
                                                                    "
                                                                  ></td>
                                                                </tr>
                                                                <tr>
                                                                  <td
                                                                    style="
                                                                      height: 16px;
                                                                    "
                                                                  >
                                                                    <img
                                                                      style="
                                                                        width: 18px;
                                                                        height: 16px;
                                                                      "
                                                                      src="https://i.ibb.co/yVQyZht/envelope.png"
                                                                      alt="email"
                                                                    />
                                                                  </td>
                                                                </tr>
                                                                <tr>
                                                                  <td
                                                                    style="
                                                                      height: 8px;
                                                                    "
                                                                  ></td>
                                                                </tr>
                                                              </table>
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      style="height: 9px"
                                                    ></td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      style="
                                                        height: 10px;
                                                        line-height: 14px;
                                                        font-size: 14px;
                                                        font-weight: 600;
                                                        letter-spacing: -0.3px;
                                                        white-space: nowrap;
                                                      "
                                                    >
                                                      Send an email
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      style="height: 17px"
                                                    ></td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </a>
                                          </center>
                                        </td>
                                        <td style="width: 13px"></td>
                                        <td
                                          style="
                                            width: 157px;
                                            height: 92px;
                                            background-color: #f9f7ff;
                                            border-radius: 16px;
                                          "
                                        >
                                          <center>
                                            <a
                                              style="text-decoration: none"
                                              href="https://kommo.com"
                                            >
                                              <table
                                                cellpadding="0"
                                                cellspacing="0"
                                                style="
                                                  margin: 0;
                                                  padding: 0;
                                                  line-height: 0;
                                                  color: #0e0142;
                                                  font-family: 'arial',
                                                    'helvetica', sans-serif,
                                                    'roboto';
                                                  border-collapse: collapse;
                                                  width: 124px;
                                                  height: 92px;
                                                "
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      style="height: 14px"
                                                    ></td>
                                                  </tr>
                                                  <tr>
                                                    <td style="height: 32px">
                                                      <table
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        style="
                                                          text-align: center;
                                                          margin: 0;
                                                          padding: 0;
                                                          line-height: 0;
                                                          color: #0e0142;
                                                          font-family: 'arial',
                                                            'helvetica',
                                                            sans-serif, 'roboto';
                                                          border-collapse: collapse;
                                                          width: 32px;
                                                          height: 32px;
                                                        "
                                                      >
                                                        <tbody>
                                                          <tr>
                                                            <td
                                                              style="
                                                                width: 32px;
                                                                height: 32px;
                                                                background-color: #25d366;
                                                                border-radius: 8px;
                                                              "
                                                            >
                                                              <table
                                                                cellpadding="0"
                                                                cellspacing="0"
                                                                style="
                                                                  text-align: center;
                                                                  margin: 0;
                                                                  padding: 0;
                                                                  line-height: 0;
                                                                  color: #0e0142;
                                                                  font-family: 'arial',
                                                                    'helvetica',
                                                                    sans-serif,
                                                                    'roboto';
                                                                  border-collapse: collapse;
                                                                  width: 32px;
                                                                  height: 32px;
                                                                "
                                                              >
                                                                <tr>
                                                                  <td
                                                                    style="
                                                                      height: 6px;
                                                                    "
                                                                  ></td>
                                                                </tr>
                                                                <tr>
                                                                  <td
                                                                    style="
                                                                      height: 20px;
                                                                    "
                                                                  >
                                                                    <img
                                                                      style="
                                                                        width: 20px;
                                                                        height: 20px;
                                                                      "
                                                                      src="https://i.ibb.co/BN0hcr0/WhatsApp.png"
                                                                      alt="WhatsApp"
                                                                    />
                                                                  </td>
                                                                </tr>
                                                                <tr>
                                                                  <td
                                                                    style="
                                                                      height: 6px;
                                                                    "
                                                                  ></td>
                                                                </tr>
                                                              </table>
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      style="height: 9px"
                                                    ></td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      style="
                                                        height: 10px;
                                                        line-height: 14px;
                                                        font-size: 14px;
                                                        font-weight: 600;
                                                        letter-spacing: -0.3px;
                                                        white-space: nowrap;
                                                      "
                                                    >
                                                      Chat in WhatsApp
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      style="height: 17px"
                                                    ></td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </a>
                                          </center>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style="height: 70px"></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </center>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
              <tr>
                <td style="border-collapse: collapse">
                  <table
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      border-collapse: collapse;
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                    "
                    width="600"
                  >
                    <tr>
                      <td style="height: 40px"></td>
                    </tr>
                    <tr>
                      <td style="height: 48px">
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          style="
                            text-align: center;
                            margin: 0;
                            padding: 0;
                            line-height: 0;
                            color: #0e0142;
                            font-family: 'arial', 'helvetica', sans-serif,
                              'roboto';
                            border-collapse: collapse;
                            width: 600px;
                            height: 48px;
                          "
                        >
                          <tr>
                            <td style="width: 51px"></td>
                            <td style="width: 48px">
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                style="
                                  text-align: center;
                                  margin: 0;
                                  padding: 0;
                                  line-height: 0;
                                  background-color: #eae9ed;
                                  color: #0e0142;
                                  font-family: 'arial', 'helvetica', sans-serif,
                                    'roboto';
                                  border-collapse: collapse;
                                  width: 48px;
                                  height: 48px;
                                  border-radius: 50%;
                                "
                              >
                                <tr>
                                  <td>
                                    <a
                                      href="https://www.linkedin.com/company/kommo"
                                      ><img
                                        style="width: 24px; height: 24px"
                                        src="https://i.ibb.co/R3KrwMM/link.png"
                                        alt="LinkedIn"
                                    /></a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                            <td style="width: 48px"></td>
                            <td style="width: 48px">
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                style="
                                  text-align: center;
                                  margin: 0;
                                  padding: 0;
                                  line-height: 0;
                                  background-color: #eae9ed;
                                  color: #0e0142;
                                  font-family: 'arial', 'helvetica', sans-serif,
                                    'roboto';
                                  border-collapse: collapse;
                                  width: 48px;
                                  height: 48px;
                                  border-radius: 50%;
                                "
                              >
                                <tr>
                                  <td>
                                    <a href="https://m.me/279272215431766"
                                      ><img
                                        style="width: 24px; height: 24px"
                                        src="https://i.ibb.co/XDWbgpF/facebook.png"
                                        alt="facebook"
                                    /></a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                            <td style="width: 48px"></td>
                            <td style="width: 48px">
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                style="
                                  text-align: center;
                                  margin: 0;
                                  padding: 0;
                                  line-height: 0;
                                  background-color: #eae9ed;
                                  color: #0e0142;
                                  font-family: 'arial', 'helvetica', sans-serif,
                                    'roboto';
                                  border-collapse: collapse;
                                  width: 48px;
                                  height: 48px;
                                  border-radius: 50%;
                                "
                              >
                                <tr>
                                  <td>
                                    <a href="https://ig.me/m/kommocrm">
                                      <img
                                        style="width: 24px; height: 24px"
                                        src="https://i.ibb.co/RPZFcS4/insta.png"
                                        alt="Instagram"
                                    /></a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                            <td style="width: 48px"></td>
                            <td style="width: 48px">
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                style="
                                  text-align: center;
                                  margin: 0;
                                  padding: 0;
                                  line-height: 0;
                                  background-color: #eae9ed;
                                  color: #0e0142;
                                  font-family: 'arial', 'helvetica', sans-serif,
                                    'roboto';
                                  border-collapse: collapse;
                                  width: 48px;
                                  height: 48px;
                                  border-radius: 50%;
                                "
                              >
                                <tr>
                                  <td>
                                    <a href="https://t.me/amoCRMsupportBot"
                                      ><img
                                        style="width: 24px; height: 24px"
                                        src="https://i.ibb.co/CvnkJsc/telegram.png"
                                        alt="Telegram"
                                    /></a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                            <td style="width: 48px"></td>
                            <td style="width: 48px">
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                style="
                                  text-align: center;
                                  margin: 0;
                                  padding: 0;
                                  line-height: 0;
                                  background-color: #eae9ed;
                                  color: #0e0142;
                                  font-family: 'arial', 'helvetica', sans-serif,
                                    'roboto';
                                  border-collapse: collapse;
                                  width: 48px;
                                  height: 48px;
                                  border-radius: 50%;
                                "
                              >
                                <tr>
                                  <td>
                                    <a
                                      href="https://www.youtube.com/channel/UCcYhnXmssheJmhguzSfmgdw"
                                      ><img
                                        style="width: 24px; height: 17px"
                                        src="https://i.ibb.co/G5vQvFd/youtube.png"
                                        alt="Telegram"
                                    /></a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                            <td style="width: 120px"></td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="height: 37px"></td>
                    </tr>
                    <tr>
                      <td>
                        <center>
                          <table
                            cellpadding="0"
                            cellspacing="0"
                            style="
                              margin: 0;
                              padding: 0;
                              line-height: 0;
                              color: #8680a0;
                              font-family: 'arial', 'helvetica', sans-serif,
                                'roboto';
                              border-collapse: collapse;
                              width: 496px;
                              font-size: 16px;
                              letter-spacing: -0.2px;
                            "
                          >
                            <tbody>
                              <tr>
                                <td style="height: 24px">
                                  ©2024 QSOFT. All rights reserved.
                                </td>
                              </tr>
                              <tr>
                                <td style="height: 24px">
                                  222 Columbus Ave Suite 407, San Francisco, CA
                                  94133-4589
                                </td>
                              </tr>
                              <tr>
                                <td style="height: 12px"></td>
                              </tr>
                              <tr>
                                <td style="height: 24px; letter-spacing: 0px">
                                  You received this email because you signed up
                                  for a Kommo account.
                                </td>
                              </tr>
                              <tr>
                                <td style="height: 24px; letter-spacing: 0px">
                                  <a
                                    style="
                                      color: #8680a0;
                                      font-family: 'arial', 'helvetica',
                                        sans-serif, 'roboto';
                                      font-size: 16px;
                                      font-weight: 400;
                                      line-height: 20px;
                                      margin: 0;
                                      padding: 0;
                                    "
                                    href="https://kommo.com"
                                  >
                                    Unsubscribe & Manage preferences</a
                                  >
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style="
                                    height: 38px;
                                    border-bottom: 1px solid #e7e6ec;
                                  "
                                ></td>
                              </tr>
                              <tr>
                                <td style="height: 15px"></td>
                              </tr>
                              <tr>
                                <td style="height: 54px; width: 496px">
                                  <table
                                    cellpadding="0"
                                    cellspacing="0"
                                    style="
                                      margin: 0;
                                      padding: 0;
                                      line-height: 0;
                                      font-family: 'arial', 'helvetica',
                                        sans-serif, 'roboto';
                                      border-collapse: collapse;
                                      width: 496px;
                                      height: 54px;
                                    "
                                  >
                                    <tr style="height: 54px">
                                      <td style="height: 54px">
                                        <a href="https://kommo.com"
                                          ><img
                                            style="height: 24px; width: 113px"
                                            src="https://i.ibb.co/4SM1m8T/kommo.png"
                                            alt="Kommo"
                                        /></a>
                                      </td>
                                      <td
                                        style="height: 54px; width: 288px"
                                      ></td>
                                      <td style="height: 54px">
                                        <a href="https://about.meta.com/">
                                          <img
                                            style="height: 54px; width: 95px"
                                            src="https://i.ibb.co/MnMpnfb/meta.png"
                                            alt="meta"
                                        /></a>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td style="height: 88px"></td>
                              </tr>
                            </tbody>
                          </table>
                        </center>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </center>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
