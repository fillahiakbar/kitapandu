import "./globals.css";
import { Poppins } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AntdProvider } from "@/providers/antd-provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "KitaPandu | Belajar Digital untuk Anak",
  description:
    "Platform pembelajaran digital untuk anak usia TK hingga SMP. Coding, robotika, dan kreativitas digital.",
  keywords: [
    "belajar coding anak",
    "kursus digital anak",
    "robotika anak",
    "kitapandu",
  ],
  openGraph: {
    title: "KitaPandu",
    description: "Belajar digital seru untuk anak",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={poppins.variable}>
      <body className="font-sans antialiased">
        <AntdProvider>
          <Navbar />
          {children}
          <Footer />
        </AntdProvider>
      </body>
    </html>
  );
}
