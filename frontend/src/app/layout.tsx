import type { Metadata } from "next";
import MuiThemeProvider from "@/components/ThemeProvider";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Simple Banking Web App",
  description: "A modern banking web application built with Next.js and MUI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MuiThemeProvider>
          <Header />
          {children}
        </MuiThemeProvider>
      </body>
    </html>
  );
}
