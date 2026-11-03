import { pageMetadata } from "@/lib/seo";
import ProjectsView from "@/views/ProjectsView";

export const generateMetadata = () => pageMetadata("projects", "en");

export default function Page() {
  return <ProjectsView lang="en" />;
}
