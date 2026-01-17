import type { DocumentProps } from "rwsdk/router";

export default function Document({ children }: DocumentProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Peppermint</title>
        <meta name="description" content="A spicy Personal Finance Dashboard" />
        <link rel="modulepreload" href="/src/client.tsx" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
        />
        <style>{`
          #app-loader {
            display: grid;
            place-items: center;
            width: 100vw;
            height: 100vh;
            background: #f6fbf8;
            inset: 0;
          }

          /* Visually hidden (accessibility) */
          .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
          }

          /* Spinner */
          .mint-spinner {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            border: 4px solid rgba(31, 122, 77, 0.15);
            border-top-color: #1f7a4d;
            animation: spin 0.9s linear infinite;
          }

          /* Respect reduced motion */
          @media (prefers-reduced-motion: reduce) {
            .mint-spinner {
              animation: none;
              border-top-color: rgba(31, 122, 77, 0.4);
            }
          }

          /* Keyframes */
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </head>
      <body>
        <div id="app-loader" aria-live="polite" aria-busy="true">
          <div className="mint-spinner" aria-hidden="true"></div>
          <span className="sr-only">Loading application</span>
        </div>{" "}
        <div id="root" style={{ display: "none" }}>
          {children}
        </div>
        <script>import("/src/client.tsx")</script>
      </body>
    </html>
  );
}
