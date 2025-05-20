import { Helmet } from "react-helmet-async";

interface AltLink {
  lang: "en" | "ru" | "hy";
  url: string;
}

interface Props {
  title: string;
  description: string;
  canonical: string;
  alternates: AltLink[];
}

export const SEO: React.FC<Props> = ({
  title,
  description,
  canonical,
  alternates,
}) => (
  <Helmet
    htmlAttributes={{
      lang: canonical.includes("/hy/")
        ? "hy"
        : canonical.includes("/ru/")
        ? "ru"
        : "en",
    }}
  >
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />

    {alternates.map((a) => (
      <link key={a.lang} rel="alternate" hrefLang={a.lang} href={a.url} />
    ))}

    {/* Chake it  */}
    <link
      rel="alternate"
      hrefLang="x-default"
      href="https://kidsartcraft.app/"
    />
    
  </Helmet>
);
