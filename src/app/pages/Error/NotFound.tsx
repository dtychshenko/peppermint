import LeafyCry from "../../shared/leafy-cry.svg?react";

export default function GlobalError() {
  return (
    <div style={{ textAlign: "center" }}>
      <LeafyCry />
      <h2>404 Not Found</h2>
      <p>There's nothing here. Please check the URL</p>
    </div>
  );
}
