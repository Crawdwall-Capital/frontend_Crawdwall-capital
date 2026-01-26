import type { Metadata } from "next";
import "./globals.css";
import { ErrorHandlerWrapper } from '@/components/ErrorHandlerWrapper';

export const metadata: Metadata = {
  title: "Crawdwall Capital - Investment Bank for Events",
  description: "Structured event-funding platform connecting creative entrepreneurs with investors",
  icons: {
    icon: '/image/C capital logo d.svg',
  },
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
        <ErrorHandlerWrapper>
          {children}
        </ErrorHandlerWrapper>
      </body>
    </html>
  );
}
