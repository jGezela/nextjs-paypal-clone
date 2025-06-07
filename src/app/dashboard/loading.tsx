import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex gap-3">
      <LoaderCircle className="animate-spin" />
      <p>Loading page...</p>
    </div>
  );
}
