import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'katex/dist/katex.min.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'A Level Maths Tutor | Further Maths Included',
  description: 'Interactive A Level and Further Maths lessons with worked examples and quizzes.',
  metadataBase: new URL('https://agentic-339921d8.vercel.app'),
  openGraph: {
    title: 'A Level Maths Tutor',
    description: 'Interactive lessons, examples, and quizzes for A Level & Further Maths',
    url: 'https://agentic-339921d8.vercel.app',
    siteName: 'A Level Maths Tutor',
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-900 min-h-screen`}>        
        <header className="border-b border-gray-100 bg-white/60 backdrop-blur sticky top-0 z-30">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-semibold text-brand-700">A Level Maths Tutor</Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/topics/a-level" className="hover:text-brand-700">A Level</Link>
              <Link href="/topics/further-maths" className="hover:text-brand-700">Further Maths</Link>
              <a href="https://agentic-339921d8.vercel.app" className="hover:text-brand-700" target="_blank" rel="noreferrer">Live</a>
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
        <footer className="border-t border-gray-100 mt-12 py-6 text-center text-sm text-gray-500">Built for A Level and Further Maths learners</footer>
      </body>
    </html>
  );
}
