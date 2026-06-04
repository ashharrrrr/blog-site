import { Button } from "@/components/ui/button";

type PostFiltersProps = {
  filter: "all" | "published" | "drafts";
  onFilterChange: (
    filter: "all" | "published" | "drafts"
  ) => void;
}

export default function PostFilters({ filter, onFilterChange }: PostFiltersProps) {
  console.log("WORKS")
  return (
    <div className="mb-6 flex gap-2">
      <Button variant={filter === "all" ? "default" : "outline"} onClick={() => onFilterChange("all")}>All Posts</Button>
      <Button variant={filter === "published" ? "default" : "outline"} onClick={() => onFilterChange("published")}>Published</Button>
      <Button variant={filter === "drafts" ? "default" : "outline"} onClick={() => onFilterChange("drafts")}>Drafts</Button>
    </div>
  )
}
