"use client";

import FormSubmitButton from "@/components/FormSubmitButton";
import { Job } from "@prisma/client";
import { useFormState } from "react-dom";
import { approveSubmission, deleteJob } from "./actions";

interface AdminSideBarProps {
  job: Job;
}

export default function AdminSideBar({job}: AdminSideBarProps) {
  return (
  <aside className="flex w-[200px] flex-none flex-row md:flex-col items-center gap-2 md:items-stretch">
    {job.approved ? (
      <span className="text-center font-semibold text-green-500">
        Approved
      </span>) : (
        <ApproveSubmissionButton jobId={job.id} />
      )}
      <DeleteJobButton jobId={job.id} />
  </aside>
  )
}

interface AdminButtonProps {
  jobId: number;
}

function ApproveSubmissionButton({jobId}: AdminButtonProps) {

  const [formState, formAction] = useFormState(approveSubmission, undefined);

  return (
    <form action={formAction} className="space-y-1">
      <input hidden name="jobId" value={jobId} />
      <FormSubmitButton className="w-full bg-green-500 hover:bg-green-600 text-white rounded-xl">
        Approve
      </FormSubmitButton>
      {formState?.error && (
        <p className="text-sm text-red-500">{formState.error}</p>
      )}
    </form>
  )
}

function DeleteJobButton({jobId}: AdminButtonProps) {

  const [formState, formAction] = useFormState(deleteJob, undefined);

  return (
    <form action={formAction} className="space-y-1">
      <input hidden name="jobId" value={jobId} />
      <FormSubmitButton className="w-full bg-red-500 hover:bg-red-600 text-white rounded-xl">
        Delete
      </FormSubmitButton>
      {formState?.error && (
        <p className="text-sm text-red-500">{formState.error}</p>
      )}
    </form>
  )
}