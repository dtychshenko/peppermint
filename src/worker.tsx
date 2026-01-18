import { except, layout, render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";
import Document from "./app/Document";
import { setCommonHeaders } from "./app/headers";
import { AppLayout } from "./app/layouts/AppLayout";
import { Transaction } from "./app/models/transaction";
import GlobalError from "./app/pages/Error/GlobalError";
import NotFound from "./app/pages/Error/NotFound";
import Import from "./app/pages/Import/Import.page";
import Transactions from "./app/pages/Transactions/Transactions.page";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- todo: describe ctx type
export type AppContext = {
  transactions?: Array<Transaction>;
};

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
    layout(AppLayout, [
      route("/", Transactions),
      route("/import", Import),
      route("/error", GlobalError),
      route("/*", NotFound),
    ]),
  ]),
]);
