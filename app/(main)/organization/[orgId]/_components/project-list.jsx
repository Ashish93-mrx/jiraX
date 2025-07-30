import { getProjects } from "@/actions/projects";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import DeleteProject from "./delete-project";

export default async function ProjectList({ orgId }) {
  const projects = await getProjects(orgId);

  if (projects.length === 0) {
    return (
      <p>
        No Projects Found.{" "}
        <Link
          href="/project/create"
          className="underline underline-offset-2 text-blue-200"
        >
          Create New
        </Link>
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {projects.map((project) => {
        return (
          <Card key={project.id}>
            <CardHeader>
            <CardTitle className="flex justify-between items-center">
                {project.name}

                <DeleteProject projectId={project.id}/>
            </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300 mb-4">{project.description}</p>
              <Link
  href={`/project/${project.id}`}
  className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-2xl shadow-sm hover:bg-blue-800 transition-colors duration-200"
>
  View Project
</Link>

            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
