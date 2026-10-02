import Link from 'next/link';

export default function ContentMakerPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-primary-200">Content maker</p>
            <h1 className="mt-2 text-3xl font-black">Mijn content</h1>
          </div>
          <Link href="/content-maker/new" className="btn-primary">Nieuwe set</Link>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {[
            'Wiskunde challenge',
            'Nederlands kernbegrippen',
            'Rekenen klas 2',
            'Geschiedenis samenvattingen',
          ].map((title) => (
            <div key={title} className="card">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">{title}</h2>
                <span className="rounded-full bg-accent-500/10 px-2 py-1 text-xs font-semibold text-accent-500">Gepubliceerd</span>
              </div>
              <p className="mt-3 text-sm text-slate-400">Deze content is eigendom van de maker en voldoet aan de database- en RLS-regels.</p>
              <div className="mt-5 flex gap-3">
                <button className="btn-secondary flex-1">Bewerken</button>
                <button className="btn-primary flex-1">Bekijken</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
