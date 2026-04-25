import { actions } from "astro:actions";
import { Bookmark } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function SaveInternship({ internshipId, userId, isInternshipSaved = false, styles = "" }: { internshipId: number; userId: string; isInternshipSaved: boolean; styles?: string }) {
  const debouncerRef = useRef<NodeJS.Timeout | null>(null);
  const [isSaved, setIsSaved] = useState(isInternshipSaved);

  const handleSaveInternship = () => {
    if (debouncerRef.current) {
      clearTimeout(debouncerRef.current);
    }

    debouncerRef.current = setTimeout(async () => {
      const { data, error } = await actions.saveInternship({
        internshipId: Number(internshipId),
        userId: userId,
        saved: !isSaved,
      });

      if (data?.error) {
        console.error(error);

        toast.error(data?.message, {
          action: {
            label: "X",
            onClick: () => console.log("Cerrando toast"),
          },
        });

        return;
      } else {
        setIsSaved(!isSaved);
      }
    }, 500);
  };

  return (
    <button
      className={"group button button-ghost text-light-text/50 hover:text-light-text/75 flex flex-row items-center gap-2 " + styles}
      onClick={handleSaveInternship}
    >
      <span className="hidden md:flex">{isSaved ? "Guardada" : "Guardar"}</span>
      <Bookmark
        className={
          isSaved
            ? "stroke-transparent fill-light-text/50 group-hover:fill-transparent! group-hover:stroke-light-text/75 transition-all"
            : "group-hover:fill-light-text/75! group-hover:stroke-transparent transition-all"
        }
      />
    </button>
  );
}
