import { Skeleton } from "../ui/skeleton";

export function PostPreviewSkeleton() {
  return (
    <article className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-6 flex justify-between">
        <div className="space-y-3">
          <Skeleton className="h-10 w-96" />
          <Skeleton className="h-5 w-40" />
        </div>

        <Skeleton className="h-9 w-28" />
      </div>

      <div className="space-y-3">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-[90%]" />
        <Skeleton className="h-5 w-[85%]" />
        <Skeleton className="h-5 w-[60%]" />
      </div>
    </article>
  );
}
