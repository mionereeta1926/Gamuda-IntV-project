function Sidebar() {
  const sessions = [
    "Budget Analysis",
    "Risk Assessment",
    "Project Delays",
  ];

  return (
    <div className="w-72 bg-white border-r p-4">
      <h2 className="font-semibold text-lg mb-4">Sessions</h2>

      <div className="space-y-2">
        {sessions.map((session, index) => (
          <div
            key={index}
            className="p-3 rounded-lg bg-slate-100 hover:bg-slate-200 cursor-pointer"
          >
            {session}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;