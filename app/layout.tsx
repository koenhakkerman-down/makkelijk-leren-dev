import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MakkelijkLeren',
  description: 'MakkelijkLeren — een moderne leerapp voor quizzen, streaks en voortgang.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
