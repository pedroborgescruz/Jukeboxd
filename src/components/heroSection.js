'use client'

import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link';

export default function heroSection() {

  return (
    <div
      className="relative w-[100%] bg-cover bg-center bg-no-repeat 
      bg-[url(https://i.imgur.com/JIP611F.jpeg)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0.8)_100%)] " />

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
        </div>
        <div style = {{color: "#ded4df"}} className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-5xl tracking-tight font-bold text-balance text-white sm:text-7xl">
              Unleash the music critic in you
            </h1>
            <p className="mt-8 text-lg text-white sm:text-xl/8">
              Rate albums you have listened. Track some to stream. <br></br> Tell the world what's good.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/sign-up"
                className="rounded-md px-3.5 py-2.5 text-sm font-semibold
                text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2
                focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                bg-primary glow-effect"
              >
                Create a new account
              </a>
              <a 
                href="/about" 
                className="text-sm/6 font-semibold text-white">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
        </div>
      </div>
    </div>
  )
}
