import '../../../public/styles/globals.css';
import SessionProvider from '../../provider/SessionProvider';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
  <div>
    <SessionProvider>
      {children}
    </SessionProvider>
  </div>
  )
}