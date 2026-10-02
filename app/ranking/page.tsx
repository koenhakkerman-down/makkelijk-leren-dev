import Link from 'next/link';

const leaderboard = [
  { name: 'Emma', time: '28h 10m', streak: '18 dagen' },
  { name: 'Jesse', time: '24h 36m', streak: '15 dagen' },
  { name: 'Milan', time: '18h 05m', streak: '12 dagen' },
  { name: 'Sanne', time: '15h 58m', streak: '9 dagen' },
];

export default function RankingPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-primary-200">Ranglijst</p>
            <h1 className="mt-2 text-3xl font-black">Leertijd en prestaties</h1>
          </div>
          <Link href="/dashboard" className="btn-secondary">Terug naar dashboard</Link>
        </header>

        <div className="card">
          <div className="mb-4 grid grid-cols-[2rem_1fr_120px_120px] gap-4 text-sm font-medium uppercase tracking-wide text-slate-400">
            <span>#</span>
            <span>Gebruiker</span>
            <span>Leertijd</span>
            <span>Streak</span>
          </div>

          {leaderboard.map((entry, index) => (
            <div key={entry.name} className="grid grid-cols-[2rem_1fr_120px_120px] items-center gap-4 border-t border-slate-700 py-4 text-sm text-slate-200 first:border-none">
              <span className="font-bold text-primary-200">{index + 1}</span>
              <span>{entry.name}</span>
              <span>{entry.time}</span>
              <span>{entry.streak}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
