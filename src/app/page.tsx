
import JobFilterSidebar from "@/components/JobFilterSidebar";
import JobListItem from "@/components/JobListItem";
import JobResults from "@/components/JobResults";
import H1 from "@/components/ui/h1";
import prisma from "@/lib/prisma";
import { JobFilterValues } from "@/lib/validation";
import { Metadata } from "next";

interface PageProps {
  searchParams: {
    q?: string,
    type?: string,
    location?: string,
    remote?: string,
    page?: string,
  }
}

function getTitle({q, type, location, remote}: JobFilterValues) {
  const titlePrefix = q
  ? `${q} jobs` 
  : type
  ? `${type} developer jobs`
  : remote
  ? `Remote developer jobs`
  : "All developer jobs";
  
  const titleSuffix = location ? ` in ${location}` : "";

  return `${titlePrefix}${titleSuffix}`;
}

export function generateMetadata({
  searchParams: {q, type, location, remote, page}
}: PageProps): Metadata {
  return {
    title: `${getTitle({
      q,
      type,
      location,
      remote: remote === "true",
    })} | Flow Jobs`
  }
}

export default async function Home({
  searchParams: {q, type, location, remote, page}
} : PageProps) {
  const filterValues: JobFilterValues = {
    q,
    type,
    location,
    remote: remote === "true",
  }

  return (
    <main className="max-w-5xl m-auto px-3 my-10 spacey-10">
      <div className="space-y-5 text-center">
        <H1>
        {getTitle(filterValues)}
        </H1>
        <p className="text-muted-foreground pb-10">Find your dream job.</p>
      </div>
      <section className="flex flex-col md:flex-row gap-4">
        <JobFilterSidebar defaultValues={filterValues}/>
        <JobResults filterValues={filterValues}
        page={page ? parseInt(page): undefined}
        />
      </section>
    </main>
  )
}
