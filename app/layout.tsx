import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/context/Provider";
import Navbar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import Banner from "@/components/LadingPage/Banner";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FoodieApp (FDA) | Order Your Favourite Meals Online",
  description:
    "FoodieApp (FDA) is your go-to online food ordering platform. Order delicious meals, fast delivery, and easy payment options — all in one place!",
  keywords: [
    "food delivery",
    "order food online",
    "healthy meals",
    "quick delivery",
    "online restaurant",
    "FoodieApp",
    "FDA",
    "best dishes",
    "wholesale food platform",
  ],
  openGraph: {
    title: "FoodieApp (FDA) | Fresh, Fast & Delicious Meals Delivered to You",
    description:
      "Discover and order your favorite dishes from top restaurants. Enjoy quick delivery, easy payment, and fresh ingredients — powered by FoodieApp.",
    url: "https://yourdomain.com",
    siteName: "FoodieApp (FDA)",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Order delicious meals with FoodieApp",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FoodieApp (FDA) | Order Your Favourite Food Online",
    description:
      "Get your favorite dishes delivered fast with FoodieApp — the best platform for fresh, delicious, and affordable meals.",
    images: ["/og-image.jpg"],
    creator: "@FoodieAppOfficial",
  },
  authors: [{ name: "FoodieApp Team", url: "https://yourdomain.com" }],
  creator: "FoodieApp",
  metadataBase: new URL("https://yourdomain.com"),
  alternates: {
    canonical: "https://yourdomain.com",
  },
  category: "Food & Delivery",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <Navbar />
          <main>{children}</main>
          <Banner />
          <Footer />
          <Toaster position="top-center" richColors closeButton />
        </QueryProvider>
      </body>
    </html>
  );
}
