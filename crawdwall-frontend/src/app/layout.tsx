import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Crawdwall Capital - Investment Bank for Events",
  description: "Structured event-funding platform connecting creative entrepreneurs with investors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
          <head>
            <link
              href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
              rel="stylesheet"
            />
          </head>
      <body
        className="antialiased bg-background-light dark:bg-background-dark"
      >
        {children}
      </body>
    </html>
  );
}
