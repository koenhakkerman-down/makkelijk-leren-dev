# MakkelijkLeren

MakkelijkLeren is een moderne leerplatform MVP gebouwd met Next.js, Tailwind CSS en Supabase. De app is ontworpen als een bedrijfsklare basis voor een educatieve webapp met quizzes, gamification, content ownership, dagelijkse doelen, streaks, badges en adminfunctie.

## Tech stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Supabase Postgres + Auth + Storage
- Vercel-ready

## Snel starten

1. Installeer afhankelijkheden:
   npm install
2. Maak een `.env.local` aan op basis van `.env.example`
3. Configureer je Supabase URL en keys
4. Start de app:
   npm run dev
5. Open http://localhost:3000

## Belangrijkste onderdelen

- Auth en gebruikersprofielen
- Rollen: user, content_maker, admin
- Dashboard met doelen, streaks, badges en voortgang
- Content maker with ownership rules
- Quiz-modus met stopwatch en directe feedback
- Ranglijst en statistieken
- Reportages + audit logging
- Supabase-ready schema

## Deploy

Zet de environment variables uit `.env.example` in je Vercel-project.
