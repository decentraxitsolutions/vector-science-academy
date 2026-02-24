import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ParticlesClient from "@/components/BackgroundComponents/ParticlesClient";
import Header from "@/components/HeaderComponets/Header";
import Footer from "@/components/FooterComponents/Footer";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "Vector Science Academy",
  description: "Vector Science Academy",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      {/* Adding 'dark' forces Tailwind's dark mode palette globally */}
      <html lang="en" className="dark">
        <body className={`${inter.className} bg-zinc-950 text-slate-50 relative min-h-screen antialiased`}>
          <Header />
          {/* Animated Background sits at the absolute bottom layer (z-0) */}
          <ParticlesClient />
          
          {/* All your app content (Header, Hero, etc.) sits safely on top (z-10) */}
          <div className="relative z-10 flex flex-col min-h-screen">
            {children}
          </div>
          
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}