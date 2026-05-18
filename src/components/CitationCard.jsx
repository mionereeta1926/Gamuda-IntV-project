function CitationCard({ source, page }) {
  return (
    <div className="bg-slate-100 p-3 rounded-xl border">
      <p className="font-medium text-sm">{source}</p>
      {/* <p className="text-xs text-slate-500 mt-1">Page {page}</p> */}
    </div>
  );
}

export default CitationCard;