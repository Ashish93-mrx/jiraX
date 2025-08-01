"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function createSprint(projectId, data) {
    const { userId, sessionClaims } = auth();

    const orgId = sessionClaims?.o?.id;

    if(!userId || !orgId) {
        throw new Error("unauthorized");
    }
    
    const project = await db.project.findUnique({
        where: {id: projectId},
    });
    
    //verify project belongs to organization
    if(!project || project.organizationId !== orgId) {
        throw new Error("not found");
    }

    const sprint = await db.sprint.create({
        data:{
            name: data.name,
            startDate: data.startDate,
            endDate: data.endDate,
            status: "PLANNED",
            projectId,
        }
    });

    return sprint;
}

export async function updateSprintStatus(sprintId, newStatus){
    const { userId, sessionClaims } = auth();

    const orgId = sessionClaims?.o?.id;
    const orgRole = sessionClaims?.o?.rol;

    if(!userId || !orgId) {
        throw new Error("unauthorized");
    }

    try {
        const sprint = await db.sprint.findUnique({
            where: {id: sprintId},
            include: {project: true}
        });

        if(!sprint) {
            throw new Error("Sprint not found");
        }
        if(sprint.project.organizationId !== orgId) {
            throw new Error("Unauthorized");
        }
        if(orgRole !== "admin") {
            throw new Error("Only admins can Make this changes");
        }
        const now = new Date();
        const startDate = new Date(sprint.startDate);
        const endDate = new Date(sprint.endDate);

        if(newStatus === 'ACTIVE' && (now < startDate || now > endDate)) {
            throw new Error("Cannot start sprint outside of its date range");
        }

        if(newStatus === 'COMPLETED' && sprint.status !== "ACTIVE") {
            throw new Error("Can only complete an active sprint");
        }

        const updatedSprint = await db.sprint.update({
            where: {id: sprintId},
            data: {status: newStatus}
        });

        return {success: true, sprint: updatedSprint};

    } catch(error) {
        throw new Error(error.message);
    }
}