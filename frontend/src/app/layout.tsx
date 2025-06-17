import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

import AppProvider from '@/contexts/AuthContext';
const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: "LearnHub VietNam",
  description: "Chuyên cung cấp dịch vụ khóa học đào tạo cho cá nhân và doanh nghiệp.",
  keywords: ["LearnHub", "Data Analytics", "Business Intelligence", "RPA"],
};
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="icon"
          href="/"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider>
          {children}
          <ToastContainer/>
        </AppProvider>
      </body>
    </html>
  );
}
