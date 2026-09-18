/**
 * ─────────────────────────────────────────────────────────────
 *  CERTIFICATIONS / ACHIEVEMENTS
 *  Images: public/images/certificates/<file>.jpg  (4:3 recommended)
 *  `url` can be a verification link or a PDF in /public.
 * ─────────────────────────────────────────────────────────────
 */

export interface Certification {
  name: string;
  issuer: string;
  /** e.g. "Mar 2025" */
  date: string;
  image?: string;
  url?: string;
}

export const certifications: Certification[] = [
  {
    name: "[CERTIFICATE NAME]",
    issuer: "[ISSUING ORGANIZATION]",
    date: "[DATE]",
    image: "[ADD CERTIFICATE IMAGE] /images/certificates/certificate-1.jpg",
    url: "[ADD CERTIFICATE LINK]",
  },
  {
    name: "[CERTIFICATE NAME]",
    issuer: "[ISSUING ORGANIZATION]",
    date: "[DATE]",
    image: "[ADD CERTIFICATE IMAGE] /images/certificates/certificate-2.jpg",
    url: "[ADD CERTIFICATE LINK]",
  },
  {
    name: "[CERTIFICATE NAME]",
    issuer: "[ISSUING ORGANIZATION]",
    date: "[DATE]",
    image: "[ADD CERTIFICATE IMAGE] /images/certificates/certificate-3.jpg",
    url: "[ADD CERTIFICATE LINK]",
  },
];
