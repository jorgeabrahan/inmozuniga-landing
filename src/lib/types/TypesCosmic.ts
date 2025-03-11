export interface TypeCosmicObject<T> {
  slug: string;
  title: string;
  type: string;
  thumbnail: string;
  metadata: T;
}

export interface TypeCosmicImage {
  image: { imgix_url: string; url: string };
}
