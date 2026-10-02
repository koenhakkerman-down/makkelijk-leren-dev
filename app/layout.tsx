import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MakkelijkLeren',
  description: 'Modern learning platform for practice, streaks and progress.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
