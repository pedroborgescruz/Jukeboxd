import "./globals.css";

export const metadata = {
  title: "Jukeboxd",
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
