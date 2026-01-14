import type { AppContext } from "../src/worker";

declare module "rwsdk/worker" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- extend AppContext here
  interface DefaultAppContext extends AppContext {}

  // App is the type of your defineApp export in src/worker.tsx
  export type App = typeof import("../src/worker").default;
}
