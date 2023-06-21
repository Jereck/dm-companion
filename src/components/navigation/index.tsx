import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs'
import React from 'react'

const Navbar = () => {
  const user = useUser()

  return (
    <div className="border-b border-slate-500">
      { !user.isSignedIn && <SignInButton /> }
      { !!user.isSignedIn && <SignOutButton /> }
    </div>
  )
}

export default Navbar