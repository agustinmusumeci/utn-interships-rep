import { actions } from "astro:actions";
import { useState } from "preact/hooks";
import { CAREERS } from "../../constants/careers";

export default function Notification({ user }) {
  const userCareersIds = new Set(user.careers.map((c) => c.id));
  const [suscripted, setSuscripted] = useState(user?.suscripted ?? false);
  const [availableCareers, setAvailableCareers] = useState(CAREERS.filter((career) => !userCareersIds.has(career.id)) ?? []);
  const [suscriptedCareers, setSuscriptedCareers] = useState(user?.careers ?? []);
  const [toDeleteCareers, setToDeleteCareers] = useState([]);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSuscription = async (e) => {
    e.preventDefault();

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
            <form onSubmit={handleSuscription}>
              <button
                type="submit"
                className="px-3 py-2 border border-gray-200 cursor-pointer rounded-full"
              >
                {suscripted ? "Desactivar Notificaciones" : "Activar Notificaciones"}
              </button>
            </form>
            {suscripted && (
              <div>
                {/* Available careers */}
                <div className="my-10 flex flex-col gap-2 h-20">
                  <p>Carreras disponibles</p>
                  <div class="flex flex-row gap-2">
                    {availableCareers.map((career) => (
                      <button
                        onClick={() => {
                          suscriptCareer(career.id, true);
                        }}
                        class="flex flex-row gap-3 items-center px-3 py-1 rounded-lg cursor-pointer"
                        style={`background-color: ${career.color}`}
                      >
                        <span>{career.name}</span>
                        <span className="text-xl">+</span>
                      </button>
                    ))}
                  </div>
                </div>
                {/* Suscripted careers */}
                <div className="flex flex-col gap-2 h-40">
                  <p>Carreras a notificar</p>
                  <div className="flex flex-row gap-2">
                    {suscriptedCareers.map((career) => (
                      <button
                        onClick={() => {
                          suscriptCareer(career.id, false);
                        }}
                        class="flex flex-row gap-3 items-center px-3 py-1 rounded-lg cursor-pointer"
                        style={`background-color: ${career.color}`}
                      >
                        <span>{career.name}</span>
                        <span className="text-xl">X</span>
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSumbitCareers}>
                  <button
                    type="submit"
                    className="px-3 py-2 border border-gray-200 cursor-pointer rounded-full"
                  >
                    Guardar cambios
                  </button>
                </form>
              </div>
            )}
            {loading && <p>Cargando</p>}
            {error && <p className="text-red-500">Ocurrio un error. Reintente mas tarde.</p>}
            {success && <p className="text-green-500">Carreras suscriptas correctamente!</p>}
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
