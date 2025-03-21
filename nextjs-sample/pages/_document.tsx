import { Html, Head, Main, NextScript } from "next/document";

/**
 * Custom Document Component 
 */
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
