import NavBar from "@/components/NavBar";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" data-theme="cupcake">
        <body className={`flex flex-col min-h-screen max-w-6xl m-auto ${inter.className}`}>
          <NavBar />
          <div className="flex-grow px-2 sm:px-4 lg:px-8">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}