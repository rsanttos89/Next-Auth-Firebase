'use client';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import styles from './cpanel.module.css';

export default function Cpanel() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/signin');
    }
  }, [status, router]);

  // if (status === 'loading') {
  //   return (
  //     <div>
  //       <p>Carregando...</p>
  //     </div>
  //   );
  // }

  if (status === 'authenticated') {
    return (
      <>
        <main id={styles.main}>
          <h1>cpanel</h1>
          <div>{session?.user?.email}</div>
          <button onClick={() => signOut()}>Logout</button>
        </main>
      </>
    );
  }

  // Opcionalmente, renderizar nada ou uma UI de fallback para usuários não autenticados
  return null;
}