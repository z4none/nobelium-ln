import Link from 'next/link'

const TagItem = ({ tag }) => (
  <Link href={`/tag/${encodeURIComponent(tag)}`}>
    <a>
      <p className="bg-blue-500 text-white text-xs font-normal mr-2 px-1.5 py-0.5 rounded">
        {tag}
      </p>
    </a>
  </Link>
)

export default TagItem
