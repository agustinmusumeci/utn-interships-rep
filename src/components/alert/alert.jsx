import { actions } from "astro:actions";
import { useState } from "preact/hooks";
import { CAREERS } from "../../constants/careers";

export default function Alert({ user }) {
  const userCareersIds = new Set(user ? user?.careers?.map((c) => c?.id) : []);
  const [suscripted, setSuscripted] = useState(user?.suscripted ?? false);
  const [availableCareers, setAvailableCareers] = useState(CAREERS.filter((career) => !userCareersIds.has(career?.id)) ?? []);
  const [suscriptedCareers, setSuscriptedCareers] = useState(user?.careers ?? []);
  const [toDeleteCareers, setToDeleteCareers] = useState([]);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSuscription = async (e) => {
    // e.preventDefault();

    const newSuscription = !suscripted;
    const { data, error } = await actions.suscribeUser({ id: user?.id, suscription: newSuscription });

    if (error) {
      setError(true);
      console.error(error);
      return;
    }

    setSuscripted(newSuscription);
    setResult(data.message);
  };

  const handleSumbitCareers = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await actions.suscribeCareers({ id: user?.id, toSuscribeCareers: suscriptedCareers.map((c) => c?.id), toDeleteCareers: toDeleteCareers.map((c) => c?.id) });

    if (error) {
      setError(true);
      console.error(error);
    } else {
      setSuccess(true);
    }

    setMessage(data.message);
    setLoading(false);
  };

  const suscriptCareer = (careerId, suscript) => {
    const career = CAREERS.find((c) => c.id === careerId);
    if (suscript) {
      setSuscriptedCareers([...suscriptedCareers, career]);
      setAvailableCareers(availableCareers.filter((c) => c.id !== careerId));
    } else {
      setSuscriptedCareers(suscriptedCareers.filter((c) => c.id !== careerId));
      setAvailableCareers([...availableCareers, career]);
      setToDeleteCareers([...toDeleteCareers, career]);
    }
  };

  return (
    <section>
      {user ? (
        <div class="flex flex-col gap-5">
          <div>
            <form className="mb-10">
              {/* <button
                type="submit"
                className="px-3 py-2 border border-gray-200 cursor-pointer rounded-full"
              >
                {suscripted ? "Desactivar Notificaciones" : "Activar Notificaciones"}
              </button> */}
              <div className="bg-light-neutral w-fit flex flex-row gap-10 items-center p-5">
                <div>
                  <p className="font-bold">Alertas</p>
                  <span className="text-text/75">
                    ESTADO: <span className="text-primary-hover">{suscripted ? "ACTIVO" : "NO ACTIVO"}</span>
                  </span>
                </div>
                <label
                  class="switch"
                  onClick={handleSuscription}
                >
                  <input
                    type="checkbox"
                    checked={suscripted}
                  />
                  <span class="switch-slider round"></span>
                </label>
              </div>
            </form>
            {suscripted && (
              <div className="grid grid-cols-1 md:grid-cols-2 place-content-start h-full">
                {/* Available careers */}
                <div className="flex flex-col gap-2 h-full bg-light-neutral/50 p-8">
                  <h4 className="title-md flex flex-row gap-3 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-university-icon lucide-university"
                    >
                      <path d="M14 21v-3a2 2 0 0 0-4 0v3" />
                      <path d="M18 12h.01" />
                      <path d="M18 16h.01" />
                      <path d="M22 7a1 1 0 0 0-1-1h-2a2 2 0 0 1-1.143-.359L13.143 2.36a2 2 0 0 0-2.286-.001L6.143 5.64A2 2 0 0 1 5 6H3a1 1 0 0 0-1 1v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z" />
                      <path d="M6 12h.01" />
                      <path d="M6 16h.01" />
                      <circle
                        cx="12"
                        cy="10"
                        r="2"
                      />
                    </svg>
                    Carreras disponibles
                  </h4>
                  <div class="flex flex-col gap-2">
                    {availableCareers.map((career) => (
                      <button
                        onClick={() => {
                          suscriptCareer(career.id, true);
                        }}
                        class="group flex flex-row gap-3 justify-between odd:bg-light-neutral even:bg-light-neutral/30 hover:bg-neutral transition-all items-center px-5 py-4 rounded-lg cursor-pointer"
                        style={`color: ${career.color}`}
                      >
                        <span>{career.name}</span>
                        <span className="text-xl text-text/20 group-hover:text-primary-hover transition-all">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-circle-plus-icon lucide-circle-plus"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                            />
                            <path d="M8 12h8" />
                            <path d="M12 8v8" />
                          </svg>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                {/* Suscripted careers */}
                <div className="flex flex-col gap-2 h-full bg-light-neutral p-8">
                  <h4 className="title-md flex flex-row gap-2 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-bell-ring-icon lucide-bell-ring text-primary-hover"
                    >
                      <path d="M10.268 21a2 2 0 0 0 3.464 0" />
                      <path d="M22 8c0-2.3-.8-4.3-2-6" />
                      <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
                      <path d="M4 2C2.8 3.7 2 5.7 2 8" />
                    </svg>
                    Alertas activas
                  </h4>
                  <div className="flex flex-col gap-2">
                    {suscriptedCareers.map((career) => (
                      <button
                        onClick={() => {
                          suscriptCareer(career.id, false);
                        }}
                        class="group flex flex-row gap-3 justify-between odd:bg-[#292929] even:bg-[#292929]/40 hover:bg-neutral transition-all items-center px-5 py-4 rounded-lg cursor-pointer relative before:absolute before:h-full before:w-1 before:bg-primary before:left-0 before:rounded-bl-full before:rounded-tl-full"
                      >
                        <span style={`color: ${career.color}`}>{career.name}</span>
                        <span className="text-xl text-text/20 group-hover:text-red-800 transition-all">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-circle-x-icon lucide-circle-x"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                            />
                            <path d="m15 9-6 6" />
                            <path d="m9 9 6 6" />
                          </svg>
                        </span>
                      </button>
                    ))}
                    {suscriptedCareers.length === 0 && (
                      <span class="group flex flex-row gap-3 justify-between odd:bg-neutral items-center px-5 py-4 rounded-lg cursor-pointer border-text/20 border-2 border-dotted">
                        <span className="flex flex-row gap-5 text-xl text-text/40 ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-circle-plus-icon lucide-circle-plus"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                            />
                            <path d="M8 12h8" />
                            <path d="M12 8v8" />
                          </svg>
                          Seleccione carreras para alertar
                        </span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
            <form
              className="relative my-20 flex flex-row gap-5 before:absolute before:w-full before:-top-10 before:h-px before:bg-text/25"
              onSubmit={handleSumbitCareers}
            >
              <button
                type="submit"
                className="button button-primary px-3 py-2 border border-gray-200 cursor-pointer rounded-full"
              >
                Guardar cambios
              </button>
              <button
                type="button"
                className="button button-outline px-3 py-2 border border-gray-200 cursor-pointer rounded-full"
              >
                Descartar
              </button>
            </form>
            {loading && <p>Cargando</p>}
            {error && <p className="text-red-500">{message}</p>}
            {success && <p className="text-green-500">{message}</p>}
          </div>
        </div>
      ) : (
        <div>
          <p>Necesitas iniciar sesión para activar las notificaciones.</p>
        </div>
      )}
    </section>
  );
}
