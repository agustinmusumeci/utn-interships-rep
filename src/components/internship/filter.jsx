import { CAREERS } from "../../constants/careers";
import { useEffect, useState } from "preact/hooks";

export default function Filter({ careers = [], text, time, date, page = 0 }) {
  console.log(date);

  const [form, setForm] = useState({ text: text, time: time, date: date, careers: careers, page: page });

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

    const { careers, ...rest } = form;

    Object.entries(rest).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(key, value);
      } else {
        url.searchParams.delete(key);
      }
    });

    if (careers.length > 0) {
      url.searchParams.set("careers", careers.join(","));
    } else {
      url.searchParams.delete("careers");
    }

    window.history.replaceState({}, "", url);
  }, [form]);

  return (
    <div className="flex flex-col gap-5 mt-5 mx-2 lg:col-span-1 col-span-full">
      <div>
        <div className="mb-2 text-lg font-medium">
          <p>Filtros</p>
        </div>
        <form
          className="flex flex-col gap-5"
          id="internships-filter"
          method="get"
        >
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2 w-full">
              <label for="page" />
              <input
                name="page"
                id="page"
                type="hidden"
              />

              <label
                for="text"
                className="text-text/50"
              >
                Buscar
              </label>
              <input
                className="border"
                name="text"
                id="text"
                type="text"
                placeholder="Id, palabra clave..."
                value={form.text}
                onInput={onChange}
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label
                for="careers"
                className="text-text/50"
              >
                Especialidad
              </label>
              <div className="flex flex-col flex-wrap gap-3">
                <input
                  type="hidden"
                  name="careers"
                  value={form.careers.length > 0 ? form.careers.join(",") : "*"}
                />
                {CAREERS.map((c) => (
                  <div className="flex flex-row items-center gap-2 font-light">
                    <input
                      type="checkbox"
                      value={c.id}
                      checked={form?.careers?.includes(c.id)}
                      onChange={() => onCareerToggle(c.id)}
                    />
                    <label
                      key={c.id}
                      className="flex items-center gap-1 cursor-pointer text-text"
                    >
                      {c.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label for="date">Fecha</label>
              <select
                className=""
                name="date"
                id="date"
                value={form.date}
                onChange={onChange}
              >
                <option value="*">Cualquiera</option>
                <option value="1">Hace 24hs</option>
                <option value="7">Hace 1 semana</option>
                <option value="14">Hace 2 semanas</option>
                <option value="30">Hace 1 mes</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label for="time">Tiempo</label>
              <select
                className=""
                name="time"
                id="time"
                value={form.time}
                onChange={onChange}
              >
                <option value="DESC">Mas reciente - Mas antigua</option>
                <option value="ASC">Mas antigua - Mas reciente</option>
              </select>
            </div>
          </div>
          <div>
            <button
              className=" mt-2 button button-primary w-full! inline!"
              type="submit"
            >
              Filtrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
