<div className="flex flex-col min-h-screen">
  {/* ================= Top Section ================= */}
  <div className="flex flex-1 items-center justify-center gap-8 p-4">
    {/* ---- Avatar Box ---- */}
    <div className="w-40 h-40 md:w-60 md:h-60 lg:w-80 lg:h-80 overflow-hidden rounded-full border-2 border-red-500 flex items-center justify-center">
      <img
        src="/avatar1.png"
        alt="avatar"
        className="w-full h-full object-cover"
      />
    </div>

    {/* ---- Top Buttons ---- */}
    <div className="flex flex-col gap-4">
      <button className="bg-yellow-800 text-white rounded-sm text-2xl px-6 py-3">
        All Tasks
      </button>
      <button className="bg-yellow-800 text-white rounded-sm text-2xl px-6 py-3">
        Current Rank
      </button>
    </div>
  </div>

  {/* ================= Bottom Section ================= */}
  <div className="flex flex-col flex-1 gap-5 border-2 border-white p-2 rounded-sm text-5xl">
    <button className="bg-yellow-800 px-4 py-1 rounded-sm font-bold italic flex-1">
      BODY
    </button>
    <button className="bg-yellow-800 px-4 py-1 rounded-sm font-bold italic flex-1">
      MIND
    </button>
    <button className="bg-yellow-800 px-4 py-1 rounded-sm font-bold italic flex-1">
      WEALTH
    </button>
  </div>
</div>;
