import { pageMetadata } from "@/lib/seo";
import AboutView from "@/views/AboutView";

export const generateMetadata = () => pageMetadata("about", "it");

export default function Page() {
  return <AboutView lang="it" />;
}
