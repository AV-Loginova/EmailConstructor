import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

const Code = ({ children }: { children: ReactNode }) => (
  <code className="px-1 rounded bg-base-200 whitespace-nowrap">{children}</code>
);

const Example = ({
  source,
  translation,
}: {
  source: string;
  translation: string;
}) => (
  <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 mt-2 p-3 rounded-lg bg-base-200 text-sm">
    <span className="opacity-60">EN</span>
    <span>{source}</span>
    <span className="opacity-60">ES</span>
    <span>{translation}</span>
  </div>
);

const Section = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <section className="space-y-2">
    <h2 className="text-lg font-semibold">{title}</h2>
    {children}
  </section>
);

const TranslationsHelpPage = () => (
  <div className="h-screen overflow-y-auto bg-base-100">
    <header className="p-2 border-b border-base-300">
      <Link className="btn btn-ghost btn-sm" to="/builder">
        ← Конструктор
      </Link>
    </header>
    <main className="max-w-2xl mx-auto px-4 pt-8 pb-16 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Как составить таблицу переводов</h1>
        {/* BOM inside the file: Excel otherwise opens UTF-8 accents as garbage. */}
        <a
          className="btn btn-outline btn-sm"
          href="/translations-example.csv"
          download="translations-example.csv"
        >
          Скачать пример CSV
        </a>
      </div>

      <Section title="Формат">
        <p>
          CSV-файл. Первая строка — коды языков, первая колонка — текст письма
          на английском. Каждая строка — один абзац, заголовок или пункт списка.
        </p>
        <div className="overflow-x-auto">
          <table className="table table-sm border border-base-300">
            <thead>
              <tr>
                <th>EN</th>
                <th>ES</th>
                <th>PT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Hi {'{{contact.name}}'}!</td>
                <td>¡Hola, {'{{contact.name}}'}!</td>
                <td>Olá, {'{{contact.name}}'}!</td>
              </tr>
              <tr>
                <td>Book a demo</td>
                <td>Reserva una demo</td>
                <td>Agende uma demo</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm opacity-70">
          Текст в первой колонке должен совпадать с письмом. Переменные пишите
          как есть: <Code>{'{{contact.name}}'}</Code>. Звёздочки и скобки в ней
          можно ставить, чтобы переводчик видел жирное и ссылки, — на поиск они
          не влияют.
        </p>
      </Section>

      <Section title="Жирный текст">
        <p>
          Оберните слова в звёздочки: <Code>*текст*</Code>.
        </p>
        <Example source="Try it *for free*" translation="Pruébalo *gratis*" />
      </Section>

      <Section title="Ссылки">
        <p>
          Текст ссылки — в квадратных скобках, адрес для этого языка — сразу
          после них в круглых: <Code>[текст](адрес)</Code>.
        </p>
        <Example
          source="Read our [guide] or [contact us]"
          translation="Lee nuestra [guía](https://kommo.com/es/guide) o [contáctanos](https://kommo.com/es/contact)"
        />
        <p className="text-sm opacity-70">
          Без адреса, просто <Code>[текст]</Code>, ссылка ведёт туда же, что в
          письме: первые скобки — на первую ссылку абзаца, вторые — на вторую.
        </p>
      </Section>

      <Section title="Кнопки и картинки">
        <p>
          Надпись кнопки и описание картинки (alt) — отдельные строки таблицы.
          Чтобы сменить ссылку, оберните перевод так же:{' '}
          <Code>[Reserva](адрес)</Code>.
        </p>
      </Section>

      <Section title="Если перевода нет">
        <p>
          Останется английский текст. Такие места подсвечиваются жёлтым в
          редакторе и попадают в отчёт перед скачиванием.
        </p>
      </Section>
    </main>
  </div>
);

export default TranslationsHelpPage;
