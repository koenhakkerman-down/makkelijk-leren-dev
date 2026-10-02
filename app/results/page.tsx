import Link from 'next/link';

export default function ResultsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-primary-200">Resultaten</p>
          <h1 className="mt-2 text-4xl font-black">Quiz afgerond</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <ResultCard label="Aantal vragen" value="10" />
          <ResultCard label="Goed" value="8" />
          <ResultCard label="Fout" value="2" />
          <ResultCard label="Percentage" value="80%" />
        </div>

        <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-900 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm text-slate-400">Leertijd</div>
              <div className="mt-2 text-2xl font-black text-white">00:02:14</div>
            </div>
            <div>
              <div className="text-sm text-slate-400">Badge</div>
              <div className="mt-2 text-lg font-bold text-primary-200">Eerste quiz</div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <Link href="/quiz" className="btn-primary">Opnieuw oefenen</Link>
          <Link href="/dashboard" className="btn-secondary">Naar dashboard</Link>
        </div>
      </div>
    </main>
  );
}

function ResultCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="card text-center">
      <div className="text-sm text-slate-400">{label}</div>
      <div className="mt-3 text-3xl font-black text-white">{value}</div>
    </div>
  );
}
