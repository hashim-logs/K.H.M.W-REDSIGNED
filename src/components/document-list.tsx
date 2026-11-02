export type DocumentListItem = {
  title: string;
  href: string;
};

export function DocumentList({
  items,
  label,
}: {
  items: readonly DocumentListItem[];
  label: string;
}) {
  return (
    <ul className="document-list" aria-label={label}>
      {items.map((item) => (
        <li key={item.href}>
          <a href={item.href}>
            <span>{item.title}</span>
            <span className="document-list__format">PDF <span aria-hidden="true">↗</span></span>
          </a>
        </li>
      ))}
    </ul>
  );
}
