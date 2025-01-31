import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import "./globals.css";
const ArabicUI = localFont({ src: './fonts/DG-Gaza.ttf' })
const ArabicUI2 = localFont({ src: './fonts/LANTX.otf' })
const ArabicUI3 = localFont({ src: './fonts/Rubik.ttf' })
const ArabicUI4 = localFont({ src: './fonts/galaxy.ttf' })
const ArabicUI5 = localFont({ src: './fonts/laxr.ttf' })
import { Anton } from 'next/font/google';

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'


// Configure Anton font
const anton = Anton({
  subsets: ['latin'], // Include the subset you need
  weight: '400',      // Adjust weight if needed (Anton only has 400)
});

import { Rakkas } from 'next/font/google';

// Configure the font
const rakkas = Rakkas({
  subsets: ['latin'], // Choose the subset(s) you need
  weight: '400', // Specify the weight, if applicable
});
import { Abril_Fatface } from 'next/font/google';
import Header from "./components/Header";
import Footer from "./components/Footer";



const abrilFatface = Abril_Fatface({
  subsets: ['latin'],
  weight: '400', // Adjust based on the font options
});

export const metadata = {
  title: " كويزاتك ",
  description: "منصة امتحانات لطلاب الثانوية العامه لتاهيلهم بما يكفي لامتحان نهاية العام ان شاء الله",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>


      <html lang="en">
        <body
          
          className={`bg-slate-950  select-none relative  antialiased`}
        >



          <Header></Header>
          
          {children}
          <Footer></Footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
