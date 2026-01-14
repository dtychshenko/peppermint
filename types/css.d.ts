declare module "*.module.css" {
  // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.css" {}

declare module "*.css?url" {
  export default string;
}
