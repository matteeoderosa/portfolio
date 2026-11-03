import { pageMetadata } from "@/lib/seo";
import AboutView from "@/views/AboutView";

export const generateMetadata = () => pageMetadata("about", "en");

export default function Page() {
  return <AboutView lang="en" />;
}
