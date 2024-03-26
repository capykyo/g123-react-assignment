import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { OrderContextProvider } from "@/context/OrderContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "G123 - Assignment",
  description: "G123 - Assignment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <OrderContextProvider>
          <AntdRegistry>{children}</AntdRegistry>
        </OrderContextProvider>
      </body>
    </html>
  );
}
