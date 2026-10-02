"use client";

import { createClient } from '@/lib/supabase/client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      if (data.user && !data.session) {
        setMessage('Check je e-mail voor de verificatie link.');
        return;
      }

      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      setMessage('Registratie mislukt. Probeer het opnieuw.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-10 text-white">
      <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-soft">
        <h1 className="text-3xl font-black">Account aanmaken</h1>
        <p className="mt-2 text-sm text-slate-400">Maak direct een profiel aan en start met leren.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-primary-500"
            placeholder="Voornaam"
            required
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-primary-500"
            placeholder="E-mailadres"
            type="email"
            required
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-primary-500"
            placeholder="Wachtwoord"
            required
          />
          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
            {loading ? 'Registreren...' : 'Registreren'}
          </button>
        </form>

        {message && (
          <div className="mt-4 rounded-xl border border-primary-500/30 bg-primary-500/10 p-3 text-sm text-primary-100">
            {message}
          </div>
        )}
      </div>
    </main>
  );
}
