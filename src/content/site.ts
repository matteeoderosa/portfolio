export type SiteInfo = {
  email: string;
  github: string;
  /** Second GitHub account, shown next to the first. */
  githubAlt?: string;
  /** Instagram profile URL. */
  instagram?: string;
  linkedin?: string;
  phone?: string;
  cvUrl?: string;
  photo?: string;
};

export const site: SiteInfo = {
  email: "info@matteoderosa.it",
  github: "https://github.com/matteeoderosa",
  githubAlt: "https://github.com/derteo",
  instagram: "https://instagram.com/matteeoderosa",
  linkedin: undefined,
  phone: undefined,
  cvUrl: undefined,
  photo: undefined,
};
