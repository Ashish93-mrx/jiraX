import {z} from "zod";

export const projectSchema = z.object({
    name: z.string().min(1,"project name is required").max(100,"project name must be less than 100 characters"),
    key:z.string().min(2,"project name is required").max(10,"project name must be less than 100 characters"),
    description: z.string().max(500,"project name must be less than 100 characters")
});

export const sprintSchema = z.object({
    name: z.string().min(1, "Sprint name is required"),
    startDate: z.date(),
    endDate: z.date(),
});

export const issueSchema = z.object({
  title: z.string().min(1, "Title is required"),
  assigneeId: z.string().cuid("Please select assignee"),
  description: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
});