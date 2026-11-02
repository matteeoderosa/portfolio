export default function TagList({ tags, label }: { tags: string[]; label?: string }) {
  if (tags.length === 0) return null;
  return (
    <ul className="tag-list mono" aria-label={label}>
      {tags.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}
