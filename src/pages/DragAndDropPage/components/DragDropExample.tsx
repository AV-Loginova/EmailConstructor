import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import DraggableItem from './DraggableItem';
import DropZone from './DropZone';
import { blockLibrary } from './blockLibrary';

const DragDropExample = () => {
  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflowY;
    const previousHtmlOverflow = document.documentElement.style.overflowY;

    document.body.style.overflowY = 'auto';
    document.documentElement.style.overflowY = 'auto';

    return () => {
      document.body.style.overflowY = previousBodyOverflow;
      document.documentElement.style.overflowY = previousHtmlOverflow;
    };
  }, []);

  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 pb-10 md:p-6">
        <div className="navbar rounded-[2rem] border border-base-300 bg-base-100 px-5 shadow-sm">
          <div className="flex-1">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                Sandbox
              </p>
              <h1 className="text-2xl font-semibold leading-tight md:text-3xl">
                Drag-and-drop конструктор письма
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-base-content/70">
                Песочница живет отдельно от основного редактора: здесь можно
                собирать письмо из блоков, менять шаблон и открывать итоговый preview
                в максимально близком к email-вёрстке виде.
              </p>
            </div>
          </div>

          <div className="flex-none">
            <Link className="btn btn-neutral btn-sm md:btn-md" to="/">
              Вернуться в основной редактор
            </Link>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="sticky top-4 h-fit rounded-[2rem] border border-base-300 bg-base-100 p-4 shadow-sm">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Блоки письма</h2>
              <p className="mt-2 text-sm leading-6 text-base-content/70">
                Перетаскивайте элементы в письмо или между существующими секциями.
              </p>
            </div>

            <div className="space-y-3">
              {blockLibrary.map((block) => (
                <DraggableItem key={block.type} block={block} />
              ))}
            </div>
          </aside>

          <DropZone />
        </div>
      </div>
    </div>
  );
};

export default DragDropExample;
