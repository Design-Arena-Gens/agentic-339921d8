import Link from 'next/link';

export default function TopicCard(props: { href: string; title: string; summary: string }) {
  return (
    <Link href={props.href} className="block rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-shadow">
      <h3 className="font-medium mb-1">{props.title}</h3>
      <p className="text-sm text-gray-600">{props.summary}</p>
    </Link>
  );
}
