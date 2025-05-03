"use client";

import { useUser } from "@clerk/nextjs";
import {Bars3Icon, BellIcon, XMarkIcon,} from '@heroicons/react/24/outline';
import {Disclosure, DisclosureButton, DisclosurePanel, 
        Menu, MenuButton, MenuItem, MenuItems,
        } from '@headlessui/react';

const userNavigation = [
    { name: 'Your Profile', href: '/profile' },
    { name: 'Settings', href: '/settings' },
    { name: 'Sign out', href: '/sign-out' },
]

export default function miniProfile() {
    const { isLoaded, user } = useUser();

    if (!isLoaded || !user) {
        return null;
    }

    return ( 
        <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
            <button
                type="button"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-hidden focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="size-6" />
            </button>

            <Menu as="div" className="relative ml-3">
                <div>
                <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img alt="" src={user.imageUrl} className="size-8 rounded-full" />
                </MenuButton>
                </div>
                <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                {userNavigation.map((item) => (
                    <MenuItem key={item.name}>
                    <a
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                    >
                        {item.name}
                    </a>
                    </MenuItem>
                ))}
                </MenuItems>
            </Menu>
            <div className="hidden xl:inline flex-1 w-20">
                <p className="text-gray-500 ml-2 font-bold uppercase text-sm truncate">
                    @{user && user.username}
                </p>
            </div>
            </div>
        </div>
    )
}