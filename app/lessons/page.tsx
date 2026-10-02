export default function LessonsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <p className="text-sm uppercase tracking-[0.2em] text-primary-200">Lessen</p>
          <h1 className="mt-2 text-3xl font-black">Sets en lessen</h1>
        </header>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[
            { title: 'Biologie basics', questions: 12, level: 'Beginner' },
            { title: 'Rekenen: procenten', questions: 8, level: 'Gemiddeld' },
            { title: 'Nederlands taal', questions: 15, level: 'Beginner' },
            { title: 'Geschiedenis', questions: 10, level: 'Vorderingen' },
            { title: 'Chemie', questions: 9, level: 'Gemiddeld' },
            { title: 'Kunstmatige intelligentie', questions: 11, level: 'Gevorderd' }
          ].map((lesson) => (
            <article key={lesson.title} className="card">
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full bg-primary-500/10 px-2 py-1 text-xs font-semibold text-primary-200">{lesson.level}</span>
                <span className="text-xs text-slate-400">{lesson.questions} vragen</span>
              </div>
              <h2 className="text-xl font-bold text-white">{lesson.title}</h2>
              <p className="mt-2 text-sm text-slate-400">Korte oefenreeks met interactieve vraagvormen en directe feedback.</p>
              <button className="btn-primary mt-5 w-full">Openen</button>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
