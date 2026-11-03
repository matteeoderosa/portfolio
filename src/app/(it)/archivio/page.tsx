import { pageMetadata } from "@/lib/seo";
import ArchiveView from "@/views/ArchiveView";

export const generateMetadata = () => pageMetadata("archive", "it");

export default function Page() {
  return <ArchiveView lang="it" />;
}
