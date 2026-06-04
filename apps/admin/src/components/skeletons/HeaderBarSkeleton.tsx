import { Skeleton } from "@/components/ui/skeleton";

export function HeaderBarSkeleton() {
  return (
    <header className="bg-card sticky top-0 z-50 border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
        </div>

        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-28" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </header>
  );
}
