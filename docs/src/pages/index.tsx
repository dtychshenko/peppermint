import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Heading from "@theme/Heading";
import IconExternalLink from "@theme/Icon/ExternalLink";
import Layout from "@theme/Layout";
import clsx from "clsx";
import type { ReactNode } from "react";
import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          <img
            src="/peppermint/img/logo-inverted.svg"
            alt="Peppermint logo"
            style={{ height: "0.75em" }}
          />
          &nbsp;{siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs/intro">
            Read Docs
          </Link>
          <Link
            className="button button--secondary button--lg"
            to={siteConfig.url}
            style={{ marginLeft: "1rem" }}>
            App <IconExternalLink />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`Hello from ${siteConfig.title}`} description={siteConfig.tagline}>
      <main>
        <HomepageHeader />
      </main>
    </Layout>
  );
}
