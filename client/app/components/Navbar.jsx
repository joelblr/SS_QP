import React from 'react'
import Link from "next/link";


export default function Navbar() {
  return (
    <div>
      <h1>Nav-Bar</h1>
      <Link href="/"> Home </Link> |
      <Link href="/uploads"> File-Uploads </Link> |
      <Link href="/about"> About </Link> |
    </div>
  )
}
