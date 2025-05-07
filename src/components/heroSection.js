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
        style={{ backgroundImage: "url(https://igormiranda.com.br/wp-content/uploads/2023/07/secos-e-molhados-1973-album-arte.jpg)" }}></div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0.8)_100%)] " />

      <div
        class="absolute bottom-0 left-0 right-0 z-20 h-50 bg-gradient-to-b from-transparent to-[#14091c]"
      ></div>

      <div className="relative isolate px-6 pt-3 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
        </div>
        <div style={{ color: "#ded4df" }} className="mx-auto max-w-2xl py-20 sm:py-28 lg:py-32">
          <div className="text-center">
            <h1 className="text-5xl tracking-tight font-bold text-balance text-white sm:text-7xl">
              Unleash the music critic in you
            </h1>
            <p className="mt-6 text-lg text-white sm:text-xl/8">
              Rate albums you have listened. Track some to stream. <br /> Tell the world what's good.
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
