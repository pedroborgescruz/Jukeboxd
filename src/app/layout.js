import "./globals.css";

export const metadata = {
  title: "Jukeboxd",
  icons: {
    icon: [{ url: '/favicon.ico' }],
  },
  description: "Music rating and community",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
