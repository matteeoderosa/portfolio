import { pageMetadata } from "@/lib/seo";
import ContactView from "@/views/ContactView";

export const generateMetadata = () => pageMetadata("contact", "en");

export default function Page() {
  return <ContactView lang="en" />;
}
