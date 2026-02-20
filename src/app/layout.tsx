import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";


const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["cyrillic", "latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "WEB приложение SPIDER для учета системы складских помещений",
  description: "WEB приложение для учета системы складских помещений",
   icons: {
    icon: "/spider2_icon.svg"
  },
};

export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
    <html lang="en">
    <body className={`antialiased ${montserrat.className}`}
    >
     {children}
    </body>
    </html>
    );
}