import Link from 'next/link'

const Tags = ({ tags, currentTag }) => {
  if (!tags) return null
  return (
    <div className="tag-container">
      <ul className="flex max-w-full mt-4 overflow-x-auto flex-wrap">
        {Object.keys(tags).map(key => {
          const selected = key === currentTag
          return (
            <li
              key={key}
              className={`m-1 font-medium text-sm whitespace-nowrap hover:border-gray-400 ${
                selected
                  ? 'text-white bg-black border-black'
                  : 'bg-gray-200 border-gray-200 text-gray-500'
              }`}
            >
              <Link
                key={key}
                href={selected ? '/search' : `/tag/${encodeURIComponent(key)}`}
              >
                <a className="px-2 py-1 block">
                  {`${key} (${tags[key]})`}
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Tags
