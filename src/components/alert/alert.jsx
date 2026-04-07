import { actions } from "astro:actions";
import { useState, useRef } from "react";
import { CAREERS } from "../../constants/careers";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import Warning from "../ui/warning";
import { ArrowUpRight, Bell, BellRing, CheckCheck, CirclePlusIcon, CircleX, Info, UniversityIcon } from "lucide-react";

export default function Alert({ user, internships = [] }) {
  const userCareersIds = new Set(user ? user?.careers?.map((c) => c?.id) : []);
  const [suscripted, setSuscripted] = useState(user?.suscripted ?? false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [alertedInternships, setAlertedInternships] = useState(internships ?? []);
  const [availableCareers, setAvailableCareers] = useState(CAREERS.filter((career) => !userCareersIds.has(career?.id)) ?? []);
  const [suscriptedCareers, setSuscriptedCareers] = useState(user?.careers ?? []);
  const [toDeleteCareers, setToDeleteCareers] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);

  const [loading, setLoading] = useState(false);

  const debouncerRef = useRef(null);

  const handleSuscription = async () => {
    if (debouncerRef.current) {
      clearTimeout(debouncerRef.current);
    }

    debouncerRef.current = setTimeout(async () => {
      const newSuscription = !suscripted;

      const { data, error } = await actions.suscribeUser({
        id: user?.id,
        suscription: newSuscription,
      });

      if (error) {
        console.error(error);

        toast.error(data.message, {
          action: {
            label: "X",
            onClick: () => console.log("Cerrando toast"),
          },
        });

        return;
      }

      setSuscripted(newSuscription);
      setResult(data.message);
    }, 500);
  };

  const handleSumbitCareers = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await actions.suscribeCareers({ id: user?.id, toSuscribeCareers: suscriptedCareers.map((c) => c?.id), toDeleteCareers: toDeleteCareers.map((c) => c?.id) });

    if (error) {
      toast.error(data.message, {
        action: {
          label: "X",
          onClick: () => console.log("Cerrando toast"),
        },
      });

      console.error(error);
    } else {
      toast.success(data.message, {
        action: {
          label: "X",
          onClick: () => console.log("Cerrando toast"),
        },
      });
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

  const handleMarkAlertsAsRead = async () => {
    const internshipsIds = internships.map((internship) => internship.internship.id);

    const { data, error } = await actions.markAlertAsRead({
      id: user?.id,
      internships: internshipsIds,
    });

    if (data?.length > 0) {
      console.log(alertedInternships);
      setAlertedInternships(alertedInternships.filter((internship) => !data.includes(internship.internship.id)));
    }
  };

  return (
    <section>
      {user ? (
        <div class="flex flex-col gap-5">
          <form className="mb-10">
            <div className="bg-light-neutral w-fit flex flex-row gap-10 items-center p-5">
              <div>
                <p className="font-bold">Alertas</p>
                <span className="text-text/75">
                  ESTADO: <span className="text-primary-hover">{suscripted ? "ACTIVO" : "NO ACTIVO"}</span>
                </span>
              </div>

              <AlertDialog open={openDialog}>
                <AlertDialogTrigger asChild>
                  <div
                    class="switch"
                    aria-checked={suscripted}
                    onClick={() => {
                      if (suscripted) {
                        handleSuscription();
                      } else {
                        setOpenDialog(true);
                      }
                    }}
                  >
                    <div
                      className="switch-button"
                      aria-checked={suscripted}
                    />
                    <span class="switch-slider round"></span>
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-light-neutral text-text border-0!">
                  <AlertDialogHeader>
                    <p className="font-bold">Activar alertas</p>
                    <AlertDialogDescription className="flex flex-col gap-5">
                      <div style={{ textAlign: "left !important" }}>Esta acción utilizara tus datos para notificarte según preferencias.</div>
                      <div className="flex flex-row gap-2 items-center">
                        <input
                          htmlFor="terms"
                          type="checkbox"
                          className="border-px border-text/50!"
                          onClick={() => setAcceptedTerms(!acceptedTerms)}
                        />
                        <label htmlFor="terms">
                          Acepto los{" "}
                          <a
                            className="font-text! underline"
                            href="/terms-and-conditions"
                            target="_blank"
                          >
                            términos y condiciones
                          </a>
                        </label>
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex flex-row">
                    <AlertDialogCancel
                      onClick={() => {
                        setAcceptedTerms(false);
                        setOpenDialog(false);
                      }}
                      className="button button-outline rounded-full! cursor-pointer"
                    >
                      Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                      disabled={!acceptedTerms}
                      className="button button-primary rounded-full! cursor-pointer"
                      onClick={() => {
                        setOpenDialog(false);

                        setAcceptedTerms(false);
                        handleSuscription();
                      }}
                    >
                      Aceptar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </form>
          <div className="bg-light-neutral/50 h-95 w-full mb-5 p-8">
            <div className="title-md flex flex-row justify-between items-center">
              <div className="flex flex-row gap-4 items-center">
                {/* <Bell /> */}
                {/* <h4>Alertas</h4> */}
                <button
                  disabled={alertedInternships.length === 0}
                  aria-disabled={alertedInternships.length === 0}
                  onClick={handleMarkAlertsAsRead}
                  className="button button-primary text-sm font-normal cursor-pointer"
                >
                  Marca como leidas <CheckCheck />
                </button>
              </div>
            </div>
            <div className="h-60 flex flex-row gap-5 horizontal-scroll mt-6">
              {alertedInternships?.map((internship) => (
                <div
                  href={`/internships/${internship.internship.id}`}
                  key={internship.internship.id}
                  className="flex flex-col gap-5 bg-light-neutral text-text/75 p-5 min-w-100 h-fit"
                >
                  <div className="">
                    <a
                      href={`/internships/${internship.internship.id}`}
                      className="flex flex-row justify-between items-center gap-10 hover:underline hover:text-primary-hover transition-all"
                    >
                      <div className="flex flex-row gap-5 items-center">
                        <h4 className="font-semibold text-xl truncate">{internship.internship.position}</h4>
                        <div className="w-1 h-1 p-1 rounded-full bg-primary-hover"></div>
                      </div>
                      <ArrowUpRight />
                    </a>
                  </div>
                  <div>
                    <div className="flex flex-row gap-3">
                      {internship.internship.careers.map((career) => (
                        <span
                          class="w-fit group flex flex-row gap-5 py-4 justify-between"
                          style={{ color: `${career?.color}` }}
                        >
                          {career?.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="pt-2 relative flex flex-row justify-between before:absolute before:-top-1/2 before:h-px before:w-full before:bg-text/20">
                    <span
                      class="text-sm opacity-75"
                      style={{ color: `${internship.internship.timeSinceCreated.color}` }}
                    >
                      {internship.internship.timeSinceCreated.time}
                    </span>
                    <span>
                      <a
                        className="flex flex-row gap-5 text-primary-hover/50 hover:underline cursor-pointer"
                        href={`/internships/${internship.internship.id}`}
                      ></a>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className="grid grid-cols-1 md:grid-cols-2 place-content-start gap-5 min-h-100"
            disabled={!suscripted}
            aria-disabled={!suscripted}
          >
            {/* Available careers */}
            <div className="flex flex-col gap-2 min-h-100 bg-light-neutral/50 p-8">
              <div className="title-md flex flex-row gap-4 items-center">
                <UniversityIcon />

                <h4>Carreras disponibles</h4>
              </div>
              <ScrollArea className="h-70">
                {availableCareers.map((career) => (
                  <button
                    onClick={() => {
                      suscriptCareer(career.id, true);
                    }}
                    disabled={!suscripted}
                    aria-disabled={!suscripted}
                    class="w-full mb-2 group flex flex-row gap-3 justify-between odd:bg-light-neutral even:bg-light-neutral/30 hover:bg-neutral transition-all items-center px-5 py-4 rounded-lg cursor-pointer"
                    style={{ color: `${career.color}` }}
                  >
                    <span>{career.name}</span>
                    <span className="text-xl text-text/20 group-hover:text-primary-hover transition-all">
                      <CirclePlusIcon />
                    </span>
                  </button>
                ))}
              </ScrollArea>
            </div>

            {/* Suscripted careers */}
            <div className="flex flex-col gap-2 min-h-100 bg-light-neutral/50 p-8">
              <div className="title-md flex flex-row gap-4 items-center">
                <BellRing
                  disabled={!suscripted}
                  aria-disabled={!suscripted}
                  className="text-primary-hover  disabled:text-text/50  aria-disabled:text-text/50"
                />

                <h4>Carreras a alertar</h4>
              </div>
              <ScrollArea className="flex flex-col gap-2 h-70">
                {suscriptedCareers.map((career) => (
                  <button
                    disabled={!suscripted}
                    aria-disabled={!suscripted}
                    onClick={() => {
                      suscriptCareer(career.id, false);
                    }}
                    class="w-full mb-2 group flex flex-row gap-3 justify-between bg-[#292929]/50  hover:bg-neutral transition-all items-center px-5 py-4 rounded-lg cursor-pointer relative before:absolute before:h-full before:w-1 before:bg-primary before:left-0 before:rounded-bl-full before:rounded-tl-full"
                  >
                    <span
                      style={{ color: `${career.color}` }}
                      disabled={!suscripted}
                      aria-disabled={!suscripted}
                    >
                      {career.name}
                    </span>
                    <span className="text-xl text-text/20 group-hover:text-red-800 transition-all">
                      <CircleX />
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
              </ScrollArea>
            </div>
          </div>
          <div className="my-20 relative before:absolute before:w-full before:-top-10 before:h-px before:bg-text/25 flex flex-col gap-10 lg:flex-row justify-between">
            <form
              className="flex flex-row m gap-5 "
              onSubmit={handleSumbitCareers}
            >
              <button
                type="submit"
                aria-disabled={loading || !suscripted}
                disabled={loading || !suscripted}
                className="button button-primary h-fit px-3 py-2 border border-gray-200 cursor-pointer rounded-full"
              >
                {loading && (
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
                    class="lucide lucide-loader-circle-icon lucide-loader-circle animate-spin"
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                )}
                Guardar configuración
              </button>
              <button
                type="button"
                aria-disabled={loading || !suscripted}
                disabled={loading || !suscripted}
                className="button button-outline h-fit px-3 py-2 border border-gray-200 cursor-pointer rounded-full"
              >
                Descartar
              </button>
            </form>
            <div className="flex flex-row items-center gap-5 text-light-text/50 font-light">
              <Info />
              <p className="max-w-prose ">
                Los cambios se aplicaran al instante a su configuración de alertas. Las pasantías al coincidir con algunas de las carreras seleccionadas generaran un mail que se enviara a su
                dirección.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Warning title="Necesitas iniciar sesión para activar las notificaciones" />
        </div>
      )}
    </section>
  );
}
