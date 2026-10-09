interface PreviewModalProps {
  html: string;
  onClose: () => void;
}

const PreviewModal = ({ html, onClose }: PreviewModalProps) => (
  <div className="modal modal-open" onClick={onClose}>
    <div
      className="modal-box w-auto max-w-[90vw] p-4 flex flex-col gap-3"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg">Предпросмотр</h3>
        <button className="btn btn-sm btn-ghost" onClick={onClose}>
          Закрыть
        </button>
      </div>
      <iframe
        title="Предпросмотр письма"
        srcDoc={html}
        sandbox=""
        className="w-[680px] h-[75vh] bg-white rounded"
      />
    </div>
  </div>
);

export default PreviewModal;
