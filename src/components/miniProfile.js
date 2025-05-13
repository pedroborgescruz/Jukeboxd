"use client";

import { useUser, SignOutButton } from "@clerk/nextjs";
import {
  BellIcon,
} from "@heroicons/react/24/outline";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";

const userNavigation = [
  { name: "Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", action: "signout" },
];

export default function MiniProfile() {
  const { isLoaded, user } = useUser();

  if (!isLoaded || !user) {
    return null;
  }

  return (
    <div className="hidden md:block">
      <div className="ml-4 flex items-center md:ml-6">
        <button
          type="button"
          className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          <span className="absolute -inset-1.5" />
          <span className="sr-only">View notifications</span>
          <BellIcon aria-hidden="true" className="size-6" />
        </button>

        <Menu as="div" className="relative ml-3">
          <div>
            <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Open user menu</span>
              <img
                alt="User avatar"
                src={user.imageUrl}
                className="size-8 rounded-full"
              />
            </MenuButton>
          </div>
          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
          >
            {userNavigation.map((item) => (
              <MenuItem key={item.name}>
                {({ active }) =>
                  item.action === "signout" ? (
                    <SignOutButton>
                        <button
                        className={`${
                            active ? "bg-gray-100" : ""
                        } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                        >
                        {item.name}
                        </button>
                    </SignOutButton>
                  ) : (
                    <a
                      href={item.href}
                      className={`${
                        active ? "bg-gray-100" : ""
                      } block px-4 py-2 text-sm text-gray-700`}
                    >
                      {item.name}
                    </a>
                  )
                }
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>

        <div className="hidden xl:inline flex-1 w-20">
          <p className="text-gray-500 ml-2 font-bold uppercase text-sm truncate">
            @{user.username || user.firstName}
          </p>
        </div>
      </div>
    </div>
  );
}
