declare module "*.module.scss" {
  // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.scss" {}

declare module "*.scss?url" {
  export default string;
}
