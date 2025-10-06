'use client';

import { useSession, signIn, signOut } from "next-auth/react"

export default function LoginBtn() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
        <p>Welcome, {session.user.name}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
      <p></p>
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  )
}