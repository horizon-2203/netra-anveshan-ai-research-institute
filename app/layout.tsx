import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Netra Anveshan Research Institute",
  description: "मानवता के हित के लिए कृत्रिम बुद्धिमत्ता को आगे बढ़ाना",
  keywords: ["AI", "Research", "Machine Learning", "NLP", "Computer Vision"],
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
