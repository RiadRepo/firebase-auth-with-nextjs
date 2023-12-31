import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { app, database } from '../firebaseConfig';
import { getAuth } from 'firebase/auth'
import { useAuthState } from "react-firebase-hooks/auth"

import { useRouter } from 'next/router';


export default function Home() {
  const auth = getAuth();

  const [user, loading] = useAuthState(auth)

  let router = useRouter()
  useEffect(() => {
    let token = sessionStorage.getItem('Token')
    if (token) {
      console.log(user)
    }
    if (!token) {
      router.push('/register')
    }
  }, [user, router])

  if (loading) {
    return <div>loading..</div>
  }


  const logout = () => {
    sessionStorage.removeItem('Token')
    router.push('/login')
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Next AUTH</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>{user ? `${user.displayName}, ` : ''}Welcome to{' '}Home page</h1>
        <div>
          <button onClick={logout}>Log Out</button>
        </div>



      </main>
    </div>
  )
}
