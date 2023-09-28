import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/base-ui/Sheet'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faRightToBracket,
    faUserPlus
} from '@fortawesome/free-solid-svg-icons'

import Link from 'next/link'

export default function Menu() {
    const menuItems = [
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

    return <Sheet>
        <SheetTrigger>Menu</SheetTrigger>
        <SheetContent className="bg-white rounded-2xl text-black">
            <SheetHeader className="relative">
                <SheetTitle className="text-2xl text-left">Home</SheetTitle>
                <SheetTitle className="text-2xl text-left">Browse</SheetTitle>
                <div className="absolute right-0 top-9 space-y-3">
                    <button className="grid place-items-center space-y-1">
                        <div className="grid place-items-center w-12 h-12 bg-black rounded-full">
                            <FontAwesomeIcon
                                icon={faRightToBracket}
                                className="text-white fa-xl"
                            />
                        </div>
                        <div className="text-sm text-gray-500 font-light">Log in</div>
                    </button>
                    <button className="grid place-items-center space-y-1">
                        <div className="grid place-items-center w-12 h-12 bg-black rounded-full">
                            <FontAwesomeIcon
                                icon={faUserPlus}
                                className="text-white fa-x"
                            />
                        </div>
                        <div className="text-sm text-gray-500 font-light">
                            Sign up
                        </div>
                    </button>
                </div>
                <div>
                    <ul className="text-left text-lg font-light">
                        {menuItems.map((item) => {
                            return (
                                <li key={item.name} className="py-1">
                                    <Link href={item.path}>{item.name}</Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </SheetHeader>
        </SheetContent>
    </Sheet>
}
