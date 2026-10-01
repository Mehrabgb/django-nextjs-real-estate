import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
    title: {
        default: "Real Estate",
        template: "%s | Real Estate",
    },
    description:
        "Find, explore, and manage properties with our real estate platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning
      className={` ${geistSans.variable} ${geistMono.variable} h-full antialiased bg-background`}
    >
      <head>
        <script
            dangerouslySetInnerHTML={{
                __html: `
                    (() => {
                        const theme = localStorage.getItem("theme");

                        if (theme === "dark") {
                            document.documentElement.classList.add("dark");
                        } else {
                            document.documentElement.classList.remove("dark");
                        }
                    })();
                `,
            }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
