import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Vibalry</title>
        <link rel="icon" type="image/x-icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, viewport-fit=cover, user-scalable=no"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="manifest" href="manifest.json" />
      </head>
      <body>{children}</body>
    </html>
  );
}
