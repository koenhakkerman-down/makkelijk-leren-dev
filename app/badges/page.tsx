export default function BadgesPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <p className="text-sm uppercase tracking-[0.2em] text-primary-200">Badges</p>
          <h1 className="mt-2 text-3xl font-black">Prestaties & beloningen</h1>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            ['Eerste quiz', 'Voltooi je eerste quiz.', 'Unlocked'],
            ['Streak Master', 'Behaal 7 dagen achter elkaar.', 'Unlocked'],
            ['Leergeluk', 'Beantwoord 50 vragen goed.', 'Locked'],
            ['Snelste leerling', 'Bouw 20 minuten leertijd op.', 'Locked'],
            ['Doelverdubbeler', 'Voltooi 3 dagelijkse doelen.', 'Unlocked'],
            ['Kennisrover', 'Ontdek 5 verschillende lessen.', 'Locked'],
          ].map(([name, description, status]) => (
            <div key={name} className="card">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 text-2xl font-black">
                {name[0]}
              </div>
              <h2 className="text-lg font-bold text-white">{name}</h2>
              <p className="mt-2 text-sm text-slate-400">{description}</p>
              <div className="mt-5 text-xs font-semibold uppercase tracking-wide text-slate-300">{status}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
