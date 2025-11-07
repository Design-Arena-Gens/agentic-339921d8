import Breadcrumbs from '@/components/Breadcrumbs';
import MathRenderer from '@/components/MathRenderer';
import QuizEngine from '@/components/QuizEngine';
import { getAllTopicParams, getLevels, getTopic } from '@/data/topics';
import type { LevelKey } from '@/lib/types';
import type { Metadata } from 'next';

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllTopicParams().map((p) => ({ level: p.level, slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { level: LevelKey; slug: string } }): Promise<Metadata> {
  const topic = getTopic(params.level, params.slug);
  return {
    title: topic ? `${topic.title} | A Level Maths Tutor` : 'Topic',
    description: topic?.summary,
  };
}

export default function TopicPage({ params }: { params: { level: LevelKey; slug: string } }) {
  const { level, slug } = params;
  const levelInfo = getLevels().find((l) => l.key === level);
  const topic = getTopic(level, slug);

  if (!topic) return <div>Topic not found.</div>;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: levelInfo?.label ?? 'Level', href: `/topics/${level}` }, { label: topic.title }]} />

      <header>
        <h1 className="text-2xl font-semibold mb-1">{topic.title}</h1>
        <p className="text-gray-600">{topic.summary}</p>
      </header>

      <article className="prose max-w-none">
        {topic.sections.map((s) => (
          <section key={s.heading}>
            <h2>{s.heading}</h2>
            <p>{s.content.includes('\\') ? <MathRenderer block>{s.content}</MathRenderer> : s.content}</p>
          </section>
        ))}
      </article>

      <section>
        <h2 className="text-xl font-semibold">Practice</h2>
        <QuizEngine questions={topic.questions} />
      </section>

      {topic.references && topic.references.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold">Further reading</h2>
          <ul className="list-disc ml-6">
            {topic.references.map((r) => (
              <li key={r.url}>
                <a className="text-brand-700 hover:underline" href={r.url} target="_blank" rel="noreferrer">{r.title}</a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
