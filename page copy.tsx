'use client';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import styles from "./page.module.css";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/signin');
    }
  }, [status, router]);

  // if (status === 'loading') {
  //   return <div>Carregando...</div>;
  // }

  if (status === 'authenticated') {
    return (
      <div>
        <div>{session?.user?.email}</div>
        <button onClick={() => signOut()}>Logout</button>
      </div>
    );
  }

  // Opcionalmente, renderizar nada ou uma UI de fallback para usuários não autenticados
  return null;
}