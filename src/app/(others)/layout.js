import { Geist, Geist_Mono } from "next/font/google";
import Footer from '@/components/footer';
import Nav from '@/components/nav';
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

export default function OthersLayout({ children }) {
  return (
    <ClerkProvider>
      <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Nav />
        <main>{children}</main>
        <Footer />
      </div>
    </ClerkProvider>
  );
}
