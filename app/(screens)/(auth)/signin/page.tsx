'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  
  const handleSignIn = async () => {
    try {
      const result = await signIn('credentials', { email, password, redirect: false, callbackUrl: '/cpanel' });
      if (result?.ok) {
        router.push('/cpanel');
      } else {
        console.log(result?.error);
      }
    } catch (error) {
      console.error('Error signing in with credentials:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn('google', { redirect: false, callbackUrl: '/cpanel' });
      console.log('SignIn result:', result); // Verifique o resultado no console

      if (result?.url) {
        router.push(result.url); // Redireciona para a URL retornada pelo Google
      } else {
        console.error('Error signing in with Google:', result?.error || 'No URL returned');
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div className='container'>
      <h2>Sign in to your account</h2>
      <label htmlFor="email">Email address</label>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button onClick={handleSignIn} disabled={!email || !password}>
        Sign in
      </button>
      <button onClick={handleGoogleSignIn}>
        Sign in with Google
      </button>
      <button onClick={() => router.push('/forgot-password')}>
        Forgot password?
      </button>
    </div>
  );
}