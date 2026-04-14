import { TriangleAlert } from "lucide-react";

export default function Warning({ title = "", style = "" }) {
  return (
    <div className={"border-[1px] border-red-500/25 bg-secondary/50 px-10 py-2 rounded-sm flex flex-row gap-2" + style}>
      <TriangleAlert />
      <p>{title}</p>
    </div>
  );
}
