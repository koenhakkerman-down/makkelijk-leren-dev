import Link from 'next/link';

const navItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Leren', href: '/lessons' },
  { label: 'Quiz', href: '/quiz' },
  { label: 'Ranglijst', href: '/ranking' },
  { label: 'Badges', href: '/badges' },
  { label: 'Content Maker', href: '/content-maker' },
  { label: 'Admin', href: '/admin' },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-2xl font-black tracking-tight text-primary-300">
            MakkelijkLeren
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-slate-300 transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-primary-400 hover:text-white">
              Inloggen
            </Link>
            <Link href="/register" className="rounded-full bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition hover:bg-primary-400">
              Aanmelden
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <span className="inline-flex rounded-full border border-primary-400/20 bg-primary-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary-200">
            Learn. Practice. Grow.
          </span>
          <h1 className="mt-6 text-5xl font-black leading-tight tracking-tight md:text-6xl">
            Leer sneller, blijf gemotiveerd en bouw elke dag een streak op.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-300">
            MakkelijkLeren combineert kleine leerzets, quizzen, vooruitgang, badges en dagelijkse doelen in één moderne leerervaring.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/dashboard" className="rounded-full bg-primary-500 px-6 py-3 font-semibold text-white shadow-lg shadow-primary-500/25 transition hover:bg-primary-400">
              Naar dashboard
            </Link>
            <Link href="/lessons" className="rounded-full border border-white/10 bg-slate-900 px-6 py-3 font-semibold text-slate-100 transition hover:border-primary-400 hover:text-white">
              Bekijk lessen
            </Link>
          </div>

          <div className="mt-10 grid max-w-lg grid-cols-3 gap-4 text-left">
            <StatCard label="Dagelijks doel" value="5 vragen" />
            <StatCard label="Streak" value="12 dagen" />
            <StatCard label="Leertijd" value="2h 40m" />
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur">
          <div className="rounded-2xl border border-primary-400/30 bg-gradient-to-br from-primary-500/15 via-slate-900 to-accent-500/10 p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-300">Vandaag</span>
              <span className="rounded-full bg-green-500/15 px-2 py-1 text-xs font-semibold text-green-300">Doel behaald</span>
            </div>
            <div className="mt-6 flex items-end justify-between">
              <div>
                <div className="text-4xl font-black text-white">78%</div>
                <div className="text-sm text-slate-300">Voortgang</div>
              </div>
              <div className="h-20 w-20 rounded-full border-[8px] border-primary-400 border-t-transparent"></div>
            </div>
            <div className="mt-6 space-y-3 text-sm text-slate-200">
              <div className="flex justify-between"><span>Beantwoorde vragen</span><span>18/20</span></div>
              <div className="flex justify-between"><span>Correct</span><span>14</span></div>
              <div className="flex justify-between"><span>Badge</span><span>Streak Master</span></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
      <div className="text-xs uppercase tracking-wide text-slate-400">{label}</div>
      <div className="mt-2 text-lg font-bold text-white">{value}</div>
    </div>
  );
}
