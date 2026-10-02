export default function AdminPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <p className="text-sm uppercase tracking-[0.2em] text-primary-200">Admin</p>
          <h1 className="mt-2 text-3xl font-black">Beheer & rapportages</h1>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="card">
            <h2 className="text-lg font-bold">Website-statistieken</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <div className="flex justify-between"><span>Gebruikers</span><span>1243</span></div>
              <div className="flex justify-between"><span>Vragen beantwoord</span><span>84.200</span></div>
              <div className="flex justify-between"><span>Leertijd</span><span>640h</span></div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-bold">Rapportages</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <div className="flex justify-between"><span>Open</span><span>6</span></div>
              <div className="flex justify-between"><span>In behandeling</span><span>2</span></div>
              <div className="flex justify-between"><span>Afgerond</span><span>18</span></div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-bold">Correcties</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <div className="flex justify-between"><span>Ranglijst reset</span><span>2</span></div>
              <div className="flex justify-between"><span>Statistieken gecorrigeerd</span><span>5</span></div>
              <div className="flex justify-between"><span>Audit logs</span><span>94</span></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
