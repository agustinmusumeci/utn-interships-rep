import { MoveRight, Search } from "lucide-react";
import { useState } from "react";

export default function FindInternship({}) {
  const [toFind, setToFind] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    setToFind(value);
  };

  const handleRedirect = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (toFind) {
      window.location.href = `/internships?text=${toFind}`;
    } else {
      window.location.href = `/internships`;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:items-center w-full!">
      <form
        className="flex items-center rounded-full border border-white/30! bg-light-neutral p-1.75 pl-4 w-full!"
        onSubmit={handleRedirect}
      >
        <Search />
        <input
          type="text"
          placeholder="Tu puesto, palabras claves... "
          className="w-full flex-1 pl-4 pr-3 bg-light-neutral! text-light-text/80 placeholder-light-text/90 hover outline-none rounded-full! mr-10 text-sm"
          maxLength={20}
          value={toFind}
          onChange={handleInput}
        />

        <button
          type="submit"
          className="button button-primary text-[16px]!"
        >
          Ver pasantías <MoveRight className="w-4 ml-2" />
        </button>
      </form>
    </div>
  );
}
