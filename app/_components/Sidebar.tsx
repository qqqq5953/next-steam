import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGamepad,
  faDownload,
  faFolderOpen,
  faComment,
  faGhost,
  faUser,
  faHashtag,
  faCode
} from '@fortawesome/free-solid-svg-icons'

export default function Sidebar() {
  const menu = [
    {
      path: '/',
      name: 'Home'
    },
    {
      path: '/reviews',
      name: 'Reviews'
    },
    {
      path: '/games',
      name: 'All Games'
    },
    {
      path: '/browse',
      name: 'Browse',
      children: [
        {
          path: '/platforms',
          name: 'Platforms',
          icon: faGamepad
        },
        {
          path: '/stores',
          name: 'Stores',
          icon: faDownload
        },
        {
          path: '/collections',
          name: 'Collections',
          icon: faFolderOpen
        },
        {
          path: '/reviews',
          name: 'Reviews',
          icon: faComment
        },
        {
          path: '/genres',
          name: 'Genres',
          icon: faGhost
        },
        {
          path: '/creators',
          name: 'Creators',
          icon: faUser
        },
        {
          path: '/tags',
          name: 'Tags',
          icon: faHashtag
        },
        {
          path: '/developers',
          name: 'Developers',
          icon: faCode
        }
      ]
    }
  ]

  return (
    <aside className="hidden xl:block shrink-0 pt-8">
      <ul>
        {menu.map((item) => {
          return (
            <li key={item.path}>
              <Link
                href={item.path}
                className="block py-2.5 text-2xl font-medium pr-11 hover:text-neutral-500 transition-colors duration-300 ease-in-out"
              >
                {item.name}
              </Link>
              {item.children && (
                <ul>
                  {item.children.map((child) => {
                    return (
                      <li key={child.path}>
                        <Link
                          href={child.path}
                          className="flex items-center gap-3 py-1.5 group pr-11"
                        >
                          {child.icon && (
                            <span className="bg-white/20 rounded w-8 h-8 grid place-items-center group-hover:bg-white group-hover:text-black">
                              <FontAwesomeIcon
                                icon={child.icon}
                                className="fa-sm"
                              />
                            </span>
                          )}
                          <span>{child.name}</span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
