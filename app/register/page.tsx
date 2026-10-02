export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-10 text-white">
      <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-soft">
        <h1 className="text-3xl font-black">Account aanmaken</h1>
        <p className="mt-2 text-sm text-slate-400">Maak direct een profiel aan en start met leren.</p>
        <div className="mt-6 space-y-4">
          <input className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-primary-500" placeholder="Voornaam" />
          <input className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-primary-500" placeholder="E-mailadres" />
          <input type="password" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-primary-500" placeholder="Wachtwoord" />
          <button className="btn-primary w-full">Registreren</button>
        </div>
      </div>
    </main>
  );
}
