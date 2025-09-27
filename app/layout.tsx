import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { SmoothScroll } from '@/components/smooth-scroll';
import { Cursor } from '@/components/cursor';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Creative Developer Portfolio | Modern Web Development',
  description: 'Full-stack developer specializing in React, TypeScript, Three.js, and modern web technologies. Creating immersive digital experiences with cutting-edge animations.',
  keywords: 'web developer, full-stack, React, TypeScript, Three.js, GSAP, portfolio, frontend, backend',
  authors: [{ name: 'Creative Developer' }],
  creator: 'Creative Developer',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://portfolio-example.com',
    title: 'Creative Developer Portfolio',
    description: 'Full-stack developer creating immersive digital experiences',
    siteName: 'Creative Developer Portfolio',
    images: [
      {
        url: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200',
        width: 1200,
        height: 630,
        alt: 'Creative Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Creative Developer Portfolio',
    description: 'Full-stack developer creating immersive digital experiences',
    images: ['https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarnings>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <SmoothScroll>
            {children}
            <Cursor />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}