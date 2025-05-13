'use client';

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import {
  useClerk,
  SignedIn,
  SignedOut,
  SignInButton,
} from '@clerk/nextjs';
import MiniProfile from './miniProfile';

const user = {
  name: 'Pedro Borges',
  email: 'pedro@borges.com',
  imageUrl:
    'https://64.media.tumblr.com/1dffaf42570e275bf77e72b879aacee2/d0653ac9aff5ece3-0c/s1280x1920/d1f511a93358c1436fedd867a188428ca5269440.jpg',
}

const navigation = [
  { name: 'New Music', href: '#', current: true },
  { name: 'Artists', href: '#', current: false },
  { name: 'Playlists', href: '#', current: false },
]

const userNavigation = [
  { name: 'Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', action: 'signout' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Nav() {
  const { signOut } = useClerk();

  return (
    <Disclosure as="nav" className="bg-[#13091c] border-b border-[#44194d]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div>
              <a href='/'>
                <h1 className='font-black text-[#c8ef05]'>
                  JKBXD 
                </h1>
              </a>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium'
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <SignedIn>
            <MiniProfile />
          </SignedIn>

          <SignedOut>
            <div className="hidden md:block">
              <SignInButton mode="modal">
                <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-jukeboxd hover:bg-gray-200">
                  Sign In
                </button>
              </SignInButton>
            </div>
          </SignedOut>

          <div className="-mr-2 flex md:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-hidden focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <SignedIn>
        <DisclosurePanel className="md:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
            {userNavigation.map((item) =>
              item.action === 'signout' ? (
                <DisclosureButton
                  key={item.name}
                  as="button"
                  onClick={() => signOut()}
                  className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  {item.name}
                </DisclosureButton>
              ) : (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  {item.name}
                </DisclosureButton>
              )
            )}
          </div>
          <div className="border-t border-gray-700 pt-4 pb-3">
            <div className="flex items-center px-5">
              <div className="shrink-0">
                <img alt="" src={user.imageUrl} className="size-10 rounded-full" />
              </div>
              <div className="ml-3">
                <div className="text-base/5 font-medium text-white">{user.name}</div>
                <div className="text-sm font-medium text-gray-400">{user.email}</div>
              </div>
              <button
                type="button"
                className="relative ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-hidden focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-3 space-y-1 px-2">
              {userNavigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </div>
        </DisclosurePanel>
      </SignedIn>
    </Disclosure>
  )
}
