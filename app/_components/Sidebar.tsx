'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGamepad,
  faDownload,
  faFolderOpen,
  faBook,
  faGhost,
  faUser,
  faHashtag,
  faCode
} from '@fortawesome/free-solid-svg-icons'

export default function Sidebar() {
  const pathname = usePathname()
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
        },
        {
          path: '/publishers',
          name: 'Publishers',
          icon: faBook
        },
      ]
    }
  ]

  return (
    <aside className={`hidden xl:block shrink-0 w-1/6 pt-16`}>
      <ul>
        {menu.map((item) => {
          return (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`block py-2.5 text-2xl font-medium pr-11 hover:text-neutral-500 transition-colors duration-300 ease-in-out xl:text-[26px] ${pathname === item.path ? 'font-bold' : ''}`}
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
                          className={`flex items-center gap-3 py-1.5 pr-11 group ${pathname === child.path ? 'font-bold' : ''}`}
                        >
                          {child.icon && (
                            <span className={`rounded w-8 h-8 grid place-items-center transition-colors duration-300 ease-in-out ${pathname === child.path ? 'bg-white text-black' : 'bg-white/20 group-hover:bg-white group-hover:text-black'}`}>
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
