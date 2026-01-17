import { initClient, initClientNavigation } from "rwsdk/client";

const { handleResponse, onHydrated } = initClientNavigation();

const handleOnHydrated = () => {
  onHydrated();

  (document.querySelector("#app-loader") as HTMLDivElement).style.display = "none";
  (document.querySelector("#root") as HTMLDivElement).style.display = "block";
};

const redirectToError = () => {
  // Use replace to avoid keeping the broken page in history
  if (!window.location.pathname.startsWith("/error")) {
    window.location.replace("/error");
  }
};

const hydrateRootOptions = {
  // Catch React-specific uncaught errors (rendering, hydration)
  onUncaughtError: (error: unknown, errorInfo: unknown) => {
    console.error("React uncaught error:", error, errorInfo);
    redirectToError();
  },
};

initClient({ hydrateRootOptions, handleResponse, onHydrated: handleOnHydrated });

// Catch imperative errors (event handlers, timeouts, etc.)
window.addEventListener("error", (event) => {
  console.error("Global error caught:", event.message);
});

// Catch unhandled promise rejections
window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled promise rejection:", event.reason);
});
