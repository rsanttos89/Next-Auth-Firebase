import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../firebase";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !NEXTAUTH_SECRET) {
  throw new Error("Missing environment variables for authentication");
}

const authOptions = {
  secret: NEXTAUTH_SECRET,
  jwt: {
    secret: NEXTAUTH_SECRET,
    encryption: true,
  },
  pages: {
    signIn: '/signin',
  },
  providers: [
    // Provedor de Credenciais
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          if (credentials) {
            const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
            if (userCredential.user) {
              return {
                id: userCredential.user.uid,
                email: userCredential.user.email,
              };
            }
          }
          return null;
        } catch (error) {
          console.error(error);
          throw new Error('Failed to sign in');
        }
      },
    }),
    // Provedor do Google
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
};

const handler = NextAuth(authOptions);

// Exporta os métodos HTTP esperados pelo Next.js
export { handler as GET, handler as POST };