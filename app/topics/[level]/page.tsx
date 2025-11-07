import { getLevels, getTopicsByLevel } from '@/data/topics';
import type { LevelKey } from '@/lib/types';
import TopicCard from '@/components/TopicCard';
import Breadcrumbs from '@/components/Breadcrumbs';

export const dynamicParams = false;

export async function generateStaticParams() {
  return getLevels().map((l) => ({ level: l.key }));
}

export default function LevelPage({ params }: { params: { level: LevelKey } }) {
  const { level } = params;
  const levelInfo = getLevels().find((l) => l.key === level);
  const topics = getTopicsByLevel(level);

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: levelInfo?.label ?? 'Level' }]} />
      <h1 className="text-2xl font-semibold mb-2">{levelInfo?.label}</h1>
      <p className="text-gray-600 mb-6">Choose a topic to begin.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map((t) => (
          <TopicCard key={t.slug} href={`/topics/${level}/${t.slug}`} title={t.title} summary={t.summary} />
        ))}
      </div>
    </div>
  );
}
