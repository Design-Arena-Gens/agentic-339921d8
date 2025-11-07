import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Master A Level Maths</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Structured lessons, worked examples, and interactive quizzes for A Level and Further Maths.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/topics/a-level" className="px-4 py-2 rounded-md bg-brand-600 text-white hover:bg-brand-700">Start A Level</Link>
          <Link href="/topics/further-maths" className="px-4 py-2 rounded-md border border-brand-200 text-brand-700 hover:bg-brand-50">Start Further Maths</Link>
        </div>
      </section>

      <section className="grid sm:grid-cols-2 gap-6">
        <div className="rounded-xl border border-gray-100 p-6 shadow-sm">
          <h2 className="font-semibold mb-2">Concept-first lessons</h2>
          <p className="text-gray-600">Clear explanations with beautifully rendered mathematics and key takeaways.</p>
        </div>
        <div className="rounded-xl border border-gray-100 p-6 shadow-sm">
          <h2 className="font-semibold mb-2">Practice that adapts</h2>
          <p className="text-gray-600">Mix of quick checks and exam-style questions with step-by-step solutions.</p>
        </div>
      </section>
    </div>
  );
}
