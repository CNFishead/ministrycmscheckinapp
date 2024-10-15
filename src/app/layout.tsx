import ReactQueryProvider from "@/providers/ReactQueryProvider";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <body className={""}>{children}</body>
      </ReactQueryProvider>
    </html>
  );
}
