"use server";
import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function createProject(data) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("unauthorized");
  }

  const orgId = data.organizationId;

  if (!orgId) {
    throw new Error("No Organization Selected");
  }

  // Check if the user is an admin of the organization
  const { data: membershipList } =
    await clerkClient().organizations.getOrganizationMembershipList({
      organizationId: orgId,
    });

  const userMembership = membershipList.find(
    (membership) => membership.publicUserData.userId === userId
  );

  if (!userMembership || userMembership.role !== "org:admin") {
    throw new Error("Only organization admins can create projects");
  }

  try {
    const project = await db.project.create({
      data: {
        name: data.name,
        key: data.key,
        description: data.description,
        organizationId: orgId,
      },
    });

    console.log("Project created:", project);

    return project;
  } catch (error) {
    throw new Error("Error creating project: " + error.message);
  }
}

export async function getProjects(orgId) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("unauthorized");
  }

  // Find user to verify existence
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const projects = await db.project.findMany({
    where: { organizationId: orgId },
    orderBy: { createdAt: "desc" },
  });

  return projects;
}

export async function deleteProject({
  projectIds,
  organizationId,
  organizationRole,
}) {
  const { userId } = auth();

  const orgId = organizationId;
  const orgRole = organizationRole;

  if (!userId || !orgId) {
    throw new Error("unauthorized");
  }

  if (orgRole !== "org:admin") {
    throw new Error("Only organization admins can delete projects");
  }

  const project = await db.project.findUnique({
    where: { id: projectIds },
  });

  if (!project || project.organizationId !== orgId) {
    throw new Error(
      "Project not found or you don't have permission to delete it"
    );
  }

  await db.project.delete({
    where: { id: projectIds },
  });

  return { success: true };
}

export async function getProject(projectIds) {
    // console.log( auth(),"kkkkk");
  const { userId, sessionClaims } = await auth();

  const orgId = sessionClaims?.o?.id;

  if (!userId || !orgId) {
    throw new Error("unauthorized");
  }


  // Find user to verify existence
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const project = await db.project.findUnique({
    where: {id: projectIds},
    include: {
        sprints:{
            orderBy: {createdAt: "desc"},
        }
    }
  });

  if(!project) {
    return null;
  }

  //verify project belongs to organization
  if(project.organizationId !== orgId) {
     return null;
  }

  return project;

}
