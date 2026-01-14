import type { DocumentProps } from "rwsdk/router";
import styles from "./global.css?url";

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
        <link rel="stylesheet" href={styles} />
      </head>
      <body>
        <div id="root">{children}</div>
        <script>import("/src/client.tsx")</script>
      </body>
    </html>
  );
}
