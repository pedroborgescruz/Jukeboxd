'use client'

import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link';

export default function heroSection() {

  return (
    <div
      className="relative w-[100%]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: "url(https://images.squarespace-cdn.com/content/v1/5ab91f0fe17ba31599313b09/1582169435029-UQKFLRGHQNOMPWKTIFYS/00b.png)" }}></div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0.8)_100%)] " />

      <div
        className="absolute bottom-0 left-0 right-0 z-20 h-50 bg-gradient-to-b from-transparent to-[#14091c]"
      ></div>

      <div className="relative isolate px-6 pt-3 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
        </div>
        <div style={{ color: "#ded4df" }} className="mx-auto max-w-2xl py-20 sm:py-28 lg:py-32">
          <div className="text-center">
            <h1 className="text-5xl tracking-tight font-semibold text-balance text-white sm:text-7xl">
              Unleash the music critic within you
            </h1>
            <p className="mt-6 text-lg text-white sm:text-xl/8">
              Jukeboxd is an open source community where you can rate albums you have listened, track some to stream, and tell the world what's good.
            </p>
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
