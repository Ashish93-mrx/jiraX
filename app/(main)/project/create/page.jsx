"use client";

import OrgSwitcher from "@/components/org-switcher";
import { useOrganization, useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "@/app/lib/validators";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { createProject } from "@/actions/projects";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CreateProjectPage() {
  const router = useRouter();
  const { isLoaded: isOrgLoaded, membership } = useOrganization();
  const { isLoaded: isUserLoaded } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(projectSchema),
  });

  useEffect(() => {
    if (isOrgLoaded && isUserLoaded && membership) {
      setIsAdmin(membership.role === "org:admin");
    }
  }, [isOrgLoaded, isUserLoaded, membership]);

  const {
    loading,
    error,
    data: project,
    fn: createProjectFn,
  } = useFetch(createProject);

  const onSubmit = async (data) => {
    if (!isAdmin) {
      alert("Only organization admins can create projects");
      return;
    }

     createProjectFn({
    ...data,
    organizationId: membership?.organization?.id,
  });
  };

useEffect(() => {
  if (project) {
    router.push(`/project/${project.id}`);
  }
}, [project]);


  if (!isOrgLoaded || !isUserLoaded) {
    return null;
  }

  if (!isAdmin) {
  return (<div className="flex flex-col items-center justify-center px-4 py-10 max-w-md mx-auto text-center">
    <h1 className="text-3xl font-bold text-balance bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-500">
      Oops! Only Admins can create projects.
    </h1>
    <p className="mt-4 text-sm text-muted-foreground">
      Switch to an organization where you have admin rights to continue.
    </p>
    <div className="mt-6">
      <OrgSwitcher />
    </div>
  </div>)
}


  return (
    <div className="container mx-auto py-10">
      <h1 className="text-6xl text-center font-bold mb-8 gradient-title">
        Create New Project
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <div>
          <Input
            id="name"
            {...register("name")}
            className="bg-slate-950"
            placeholder="Project Name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <Input
            id="key"
            {...register("key")}
            className="bg-slate-950"
            placeholder="Project Key (Ex: RCYT)"
          />
          {errors.key && (
            <p className="text-red-500 text-sm mt-1">{errors.key.message}</p>
          )}
        </div>
        <div>
          <Textarea
            id="description"
            {...register("description")}
            className="bg-slate-950 h-28"
            placeholder="Project Description"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>
        {/* {loading && (
          <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
        )} */}
        <Button
          type="submit"
          size="lg"
          disabled={loading}
          className="bg-blue-500 text-white"
        >
          {loading ? "Creating..." : "Create Project"}
        </Button>
        {error && <p className="text-red-500 mt-2">{error.message}</p>}
      </form>
    </div>
  );
}
