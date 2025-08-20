export function TagBadge({ tag }: { tag: string }) {
  return (
    <span className="text-xs rounded-full border px-2 py-0.5 text-gray-600 dark:text-gray-300">#{tag}</span>
  )
}
