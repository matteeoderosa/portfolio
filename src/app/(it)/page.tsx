import { pageMetadata, personJsonLd } from "@/lib/seo";
import HomeView from "@/views/HomeView";

export const generateMetadata = () => pageMetadata("home", "it");

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd("it")) }}
      />
      <HomeView lang="it" />
    </>
  );
}
