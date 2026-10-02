import Link from 'next/link';

const cards = [
  { label: 'Dagelijks doel', value: '5/5 vragen', tone: 'primary' },
  { label: 'Streak', value: '12 dagen', tone: 'accent' },
  { label: 'Leertijd', value: '2h 40m', tone: 'slate' },
  { label: 'Badges', value: '8 behaald', tone: 'primary' },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-primary-200">Dashboard</p>
            <h1 className="mt-2 text-3xl font-black">Welkom terug</h1>
          </div>
          <Link href="/quiz" className="btn-primary">Start quiz</Link>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <div key={card.label} className="card">
              <div className="text-sm text-slate-300">{card.label}</div>
              <div className="mt-4 text-3xl font-black text-white">{card.value}</div>
            </div>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="card">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Recente activiteit</h2>
              <span className="text-sm text-slate-400">Laatste 7 dagen</span>
            </div>
            <div className="space-y-4">
              {[
                'Quiz "Wiskunde basics" afgerond',
                'Dagelijks doel gehaald',
                'Badge "Eerste quiz" unlocked',
                'Nieuwe set toegevoegd: Biologie 1'
              ].map((item) => (
                <div key={item} className="flex items-center justify-between border-b border-slate-700 pb-3 last:border-none last:pb-0">
                  <span>{item}</span>
                  <span className="text-xs text-slate-400">Vandaag</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold">Aanbevolen</h2>
            <div className="mt-4 space-y-4">
              <CardItem title="Rekenen: percentages" meta="8 vragen" />
              <CardItem title="Woordenschat: thema 3" meta="12 vragen" />
              <CardItem title="Geschiedenis: 20e eeuw" meta="10 vragen" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function CardItem({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-4">
      <div className="font-semibold text-white">{title}</div>
      <div className="mt-1 text-sm text-slate-400">{meta}</div>
    </div>
  );
}
