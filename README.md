# MakkelijkLeren

MakkelijkLeren is een moderne leerplatform MVP gebouwd met Next.js, Tailwind CSS en Supabase. De app is ontworpen als een schaalbare foundation voor een educatieve webapp met quizzes, gamification, content ownership, dagelijks doel, streaks, stats en admin-functionaliteit.

## Technische stack

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
3. Configureer je Supabase-project URL en keys
4. Draai lokaal:
   npm run dev
5. Open: http://localhost:3000

## Database

Gebruik het SQL-schema in `supabase/schema.sql` in je Supabase project.

## Belangrijkste kenmerken

- Auth en gebruikersprofielen
- Rollen: user, content_maker, admin
- Dashboard met doelen, streaks, badges en voortgang
- Content Maker flows en content ownership
- Quiz modus met stopwatch en directe feedback
- Gamification: doelen, streaks, badges, ranglijst, statistieken
- Admin rapportages en correcties
- RLS-gedreven beveiliging

## Product architectuur

Het project is opgezet als MVP foundation. De volgende gebieden zijn het belangrijkst voor een volgende implementatiefase:

- Supabase Auth + Row Level Security
- Database services and server-side authorization
- Quiz engine en vraagtype abstraction
- Content editor en media opslag
- Reporting and audit logging

## Deploy

Deze app is geschikt voor deploy op Vercel. Zet in Vercel de environment variables uit `.env.example`.
