import { initClient, initClientNavigation } from "rwsdk/client";

const { handleResponse, onHydrated } = initClientNavigation();

const handleOnHydrated = () => {
  onHydrated();

  (document.querySelector("#app-loader") as HTMLDivElement).style.display = "none";
  (document.querySelector("#root") as HTMLDivElement).style.display = "block";
};

initClient({ handleResponse, onHydrated: handleOnHydrated });
