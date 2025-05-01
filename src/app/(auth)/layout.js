import { Geist, Geist_Mono } from "next/font/google";
import Footer from '../../components/footer'
import Nav from '../../components/nav'
import "../globals.css";
import { ClerkProvider, ClerkLoaded, ClerkLoading } from '@clerk/nextjs';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Jukeboxd",
  icons: {
    icon: [
      { url: '/favicon.ico' },
    ]
  },
  description: "Music rating and community",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
