import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from '@clerk/nextjs';

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
    icon: [{ url: '/favicon.ico' }],
  },
  description: "Music rating and community",
};

export default function AuthLayout({ children }) {
  return (
    <ClerkProvider>
      <div className={`${geistSans.variable} ${geistMono.variable}`}>
        <main>{children}</main>
      </div>
    </ClerkProvider>
  );
}
