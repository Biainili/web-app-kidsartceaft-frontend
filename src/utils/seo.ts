export const getUrls = (slug = "") => {
  const base = "https://kidsartcraft.app";       // ← later replace with prod-domain
  const part = slug ? `/${slug}` : "";
  return {
    en: `${base}/en${part}`,
    ru: `${base}/ru${part}`,
    hy: `${base}/hy${part}`,
  };
};