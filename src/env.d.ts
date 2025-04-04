interface ImportMetaEnv {
  readonly PUBLIC_COSMIC_BUCKET_SLUG: string;
  readonly PUBLIC_COSMIC_READ_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
