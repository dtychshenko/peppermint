import { Anchor } from "@mantine/core";
import LeafyDead from "../../shared/leafy-dead.svg?react";

export default function GlobalError() {
  return (
    <div style={{ textAlign: "center" }}>
      <LeafyDead />
      <h2>Oops!</h2>
      <p>Something unexpected happened, but we're looking into it!</p>
      <p>
        Meanwhile, you can <Anchor href="/">go back to home</Anchor>
      </p>
    </div>
  );
}
