import { layout, render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";
import Document from "./app/Document";
import { setCommonHeaders } from "./app/headers";
import { AppLayout } from "./app/layouts/AppLayout";
import Import from "./app/pages/Import";
import Transactions from "./app/pages/Transactions";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-object-type -- todo: describe ctx type
export type AppContext = {};

export default defineApp([
  setCommonHeaders(),
  ({ ctx }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions -- todo: setup ctx here
    ctx;
  },
  render(Document, [layout(AppLayout, [route("/", Transactions), route("/import", Import)])]),
]);
