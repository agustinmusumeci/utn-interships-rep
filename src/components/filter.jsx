import { CAREERS } from "../constants/careers";
import { useEffect, useState } from "preact/hooks";

export default function Filter({ careers = [], text, time }) {
  const [form, setForm] = useState({ text: text, time: time, careers: careers });

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onCareerToggle = (careerId) => {
    setForm((prev) => {
      const already = prev.careers.includes(careerId);
      return {
        ...prev,
        careers: already ? prev.careers.filter((c) => c !== careerId) : [...prev.careers?.filter((c) => c !== "*"), careerId],
      };
    });
  };

  useEffect(() => {
    const url = new URL(window.location);

    Object.entries(form).forEach(([key, value]) => {
      if (value) url.searchParams.set(key, value);
      else url.searchParams.delete(key);
    });

    if (form.careers.length > 0) {
      url.searchParams.set("careers", form.careers.join(","));
    } else {
      url.searchParams.delete("careers");
    }

    window.history.replaceState({}, "", url);
  }, [form]);

  return (
    <div className="flex flex-row gap-5 mt-5">
      <form
        className="flex flex-col gap-5"
        id="internships-filter"
        method="get"
      >
        <div className="flex flex-row gap-5">
          <div className="flex flex-col gap-2 w-full">
            <label for="text">Buscar</label>
            <input
              className="border px-3 py-1 rounded-full"
              name="text"
              id="text"
              type="text"
              value={form.text}
              onInput={onChange}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label for="careers">Especialidad</label>
            <div className="flex flex-row flex-wrap gap-3">
              <input
                type="hidden"
                name="careers"
                value={form.careers.length > 0 ? form.careers.join(",") : "*"}
              />
              {CAREERS.map((c) => (
                <label
                  key={c.id}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={c.id}
                    checked={form?.careers?.includes(c.id)}
                    onChange={() => onCareerToggle(c.id)}
                  />
                  {c.name}
                </label>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label for="time">Fecha</label>
            <select
              className="border px-3 py-1 rounded-full"
              name="time"
              id="time"
              value={form.time}
              onChange={onChange}
            >
              <option value="DESC">Mas reciente - Mas viejo</option>
              <option value="ASC">Mas viejo - Mas reciente</option>
            </select>
          </div>
        </div>
        <div>
          <button
            className="px-4 py-1 border rounded-full"
            type="submit"
          >
            Filtrar
          </button>
        </div>
      </form>
    </div>
  );
}
