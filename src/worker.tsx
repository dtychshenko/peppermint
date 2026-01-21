import { except, layout, render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";
import { TransactionsApi } from "./app/api/transactions";
import Document from "./app/Document";
import { setCommonHeaders } from "./app/headers";
import { AppLayout } from "./app/layouts/AppLayout";
import Analyze from "./app/pages/Analyze/Analyze.page";
import GlobalError from "./app/pages/Error/GlobalError";
import NotFound from "./app/pages/Error/NotFound";
import Import from "./app/pages/Import/Import.page";
import Transactions from "./app/pages/Transactions/Transactions.page";

// Expose Durable Object with migrations for Cloudflare
export { Database } from "./app/db/durableObject";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-object-type -- todo: describe ctx type
export type AppContext = {};

export default defineApp([
  except((error: unknown) => {
    // Log error for monitoring
    console.error("Route error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }),
  setCommonHeaders(),
  ({ ctx }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions -- todo: setup ctx here
    ctx;
  },
  render(Document, [
    route("/", ({ request }) => Response.redirect(new URL("/transactions", request.url))),
    route("/api/transactions", TransactionsApi),

    layout(AppLayout, [
      route("/transactions", Transactions),
      route("/import", Import),
      route("/analyze", Analyze),
      route("/error", GlobalError),
      route("/*", NotFound),
    ]),
  ]),
]);
