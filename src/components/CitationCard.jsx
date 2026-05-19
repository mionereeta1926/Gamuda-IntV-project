function CitationCard({ citations = [] }) {
  return (
    <div className="bg-slate-100 p-2 rounded-xl border text-[8px] leading-tight">
      <p className="font-semibold mb-1">
        Documents referred:
      </p>

      {citations.map((citation, idx) => (
        <p key={idx} className="text-slate-700">
          {idx + 1}. {citation.source}
          {/* {citation.page && ` (Page ${citation.page})`} */}
        </p>
      ))}
    </div>
  );
}

export default CitationCard;