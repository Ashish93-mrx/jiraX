'use client';

import { deleteProject } from '@/actions/projects';
import { Button } from '@/components/ui/button';
import useFetch from '@/hooks/use-fetch';
import { useOrganization } from '@clerk/nextjs'
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { toast } from 'sonner';

const DeleteProject = ({projectId}) => {

    const {membership} = useOrganization();

    console.log(useOrganization(),"yoooo");
    const router = useRouter();

      const {
        loading: isDeleting,
        error,
        data: deleted,
        fn: deleteProjectFn,
      } = useFetch(deleteProject);

    const handleDelete = () => {
        if(window.confirm("Are you sure you want to delelte this project?")){
            deleteProjectFn({projectIds:projectId, organizationId: membership?.organization?.id, organizationRole: membership?.role});
  
        }
    };

    useEffect(()=>{
        if(deleted?.success){
            toast.success("Project Deleted")
            router.refresh();
        }
    },[deleted])

    const isAdmin = membership?.role === "org:admin";

    if(!isAdmin) return null;

  return (
    <>
      <Button variant="ghost" onClick={handleDelete} disabled={isDeleting}
      size="sm"
      className={`${isDeleting ? "animate-pulse" : ""}`}
      >
        <Trash2 className='h-4 w-4'/>
      </Button>
      {error && <p className='text-red-500 text-sm'>{error.message}</p>}
    </>
  )
}

export default DeleteProject;
