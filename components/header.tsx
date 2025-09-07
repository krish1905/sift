"use client"

import Image from "next/image"
import Link from "next/link"

export default function Header() {
  return (
    <header className="relative z-20 flex items-center justify-between p-6">
      <div className="flex items-center">
        <Image src="/logo.png" alt="Logo" width={140} height={140} className="text-white brightness-0 invert -mr-6" />
        <span className="text-white text-3xl font-bold">sift</span>
      </div>

      <Link href="/login" className="relative flex items-center group" style={{ filter: "url(#gooey-filter)" }}>
        <div className="absolute right-0 px-2.5 py-2 rounded-lg bg-white text-black font-normal text-xs transition-all duration-300 hover:bg-white/90 cursor-pointer h-8 flex items-center justify-center -translate-x-10 group-hover:-translate-x-19 z-0">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </div>
        <div className="px-6 py-2 rounded-lg bg-white text-black font-normal text-xs transition-all duration-300 hover:bg-white/90 cursor-pointer h-8 flex items-center z-10">
          Login
        </div>
      </Link>
    </header>
  )
}
