import Link from 'next/link'

export default function Sidebar() {
    const menu = [
        {
            path: '/',
            name: 'Home',
        },
        {
            path: '/reviews',
            name: 'Reviews',
        },
        {
            path: '/games',
            name: 'All Games',
        },
        {
            path: '/browse',
            name: 'Browse',
            children: [
                {
                    path: '/reviews',
                    name: 'Reviews'
                },
                {
                    path: '/collections',
                    name: 'Collections'
                },
                {
                    path: '/platforms',
                    name: 'Platforms'
                },
                {
                    path: '/stores',
                    name: 'Stores'
                },
                {
                    path: '/genres',
                    name: 'Genres'
                },
                {
                    path: '/creators',
                    name: 'Creators'
                },
                {
                    path: '/tags',
                    name: 'Tags'
                },
                {
                    path: '/developers',
                    name: 'Developers'
                }
            ]
        },
    ]

    return (
        <aside className='hidden lg:block shrink-0'>
            <ul>
                {menu.map((item) => {
                    return <li key={item.path}>
                        <Link href={item.path} className="block py-2 text-2xl font-medium">{item.name}</Link>
                        {item.children && <ul>
                            {item.children.map((child) => {
                                return <li key={child.path}>
                                    <Link href={child.path} className="block py-2">{child.name}</Link>
                                </li>
                            })}
                        </ul>
                        }
                    </li>
                })}
            </ul>
        </aside>
    )
}
