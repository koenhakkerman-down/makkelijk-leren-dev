const questions = [
  {
    prompt: 'Welke van deze getallen is een priemgetal?',
    options: ['9', '13', '21', '27'],
    correct: '13'
  },
  {
    prompt: 'Welke kleur krijg je wanneer je blauw en geel mengt?',
    options: ['Groen', 'Rood', 'Paars', 'Oranje'],
    correct: 'Groen'
  }
];

export default function QuizPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-primary-200">Quiz</p>
            <h1 className="mt-2 text-3xl font-black">Klassieke quizmodus</h1>
          </div>
          <div className="rounded-full border border-primary-400/40 bg-primary-500/10 px-3 py-2 text-sm font-medium text-primary-100">
            Tijd: 00:02:14
          </div>
        </div>

        <div className="card">
          <div className="mb-6 flex items-center justify-between text-sm text-slate-300">
            <span>Vraag 1 van 10</span>
            <span>Stopwatch actief</span>
          </div>

          <h2 className="text-2xl font-bold text-white">{questions[0].prompt}</h2>

          <div className="mt-6 space-y-3">
            {questions[0].options.map((option) => (
              <button key={option} className="flex w-full items-center justify-between rounded-xl border border-slate-700 bg-slate-950/60 p-4 text-left transition hover:border-primary-400 hover:bg-slate-900">
                <span>{option}</span>
                <span className="h-4 w-4 rounded-full border border-slate-500"></span>
              </button>
            ))}
          </div>

          <div className="mt-8 flex justify-between gap-3">
            <button className="btn-secondary">Vorige</button>
            <button className="btn-primary">Volgende</button>
          </div>
        </div>
      </div>
    </main>
  );
}
