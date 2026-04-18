import { Bell } from "lucide-react";
import { actions } from "astro:actions";
import type { User } from "prisma/zod";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function SuscribeAlert({ careers = [], keyword = "", isAuthenticated = false, loggedUser = {} as User, hasNotifications = false, styles = "" }) {
  const [suscripted, setSuscripted] = useState<boolean>(false);
  const debouncerRef = useRef<NodeJS.Timeout | null>(null);

  const handleAlertSuscription = async () => {
    if (debouncerRef.current) {
      clearTimeout(debouncerRef.current);
    }

    debouncerRef.current = setTimeout(async () => {
      const updatedSuscription = !suscripted;

      if (careers.length === 0 && !keyword) {
        toast.info("Selecciona filtro", {
          description: "Para poder recibir alertas acordes debes seleccionar los filtros que desees para tus alertas",
          action: { label: "X", onClick: () => console.log("Cerrando toast") },
        });

        return;
      }

      if (updatedSuscription) {
        const [{ data: careersData, error: careersError }, { data: keywordsData, error: keywordsError }] = await Promise.all([
          actions.suscribeCareers({
            id: loggedUser?.id,
            toSuscribeCareers: careers,
            toDeleteCareers: [],
          }),
          actions.suscribeKeywords({
            id: loggedUser?.id,
            toSuscribeKeywords: [keyword],
            toDeleteKeywords: [],
          }),
        ]);

        const error = careersError ?? keywordsError;
        const data = careersData ?? keywordsData;

        if (error) {
          console.error(error);

          toast.error(error.message, {
            action: { label: "X", onClick: () => console.log("Cerrando toast") },
          });

          return;
        }

        toast.success("Alertas para pasantías similares activadas", {
          action: { label: "X", onClick: () => console.log("Cerrando toast") },
        });
      } else {
        const { error, data } = await actions.suscribeKeywords({ id: loggedUser?.id, toSuscribeKeywords: [], toDeleteKeywords: [keyword] });

        if (error) {
          console.error(error);

          toast.error(error.message, {
            action: { label: "X", onClick: () => console.log("Cerrando toast") },
          });

          return;
        }

        toast.success("Alertas para pasantías similares desactivadas", {
          action: { label: "X", onClick: () => console.log("Cerrando toast") },
        });
      }

      setSuscripted(!suscripted);
    }, 500);
  };

  return (
    <div className={"rounded-xl text-text/20! " + styles}>
      <div
        className={
          "alert-content flex flex-row md:flex-col md:items-start gap-2 md:gap-5 items-center text-lg mb-5 " +
          (isAuthenticated && loggedUser && hasNotifications ? "text-primary-hover" : "text-text/50")
        }
      >
        <div className="flex flex-row gap-2 items-center">
          <Bell />
          <p>Activar alerta</p>
        </div>
        <div
          className="switch"
          id={isAuthenticated && loggedUser && hasNotifications ? "alerts-switch" : "switch"}
          aria-checked={suscripted}
          data-user-id={loggedUser?.id ?? ""}
          data-internship-keyword={keyword}
          onClick={
            isAuthenticated && loggedUser && hasNotifications
              ? async () => {
                  await handleAlertSuscription();
                }
              : () => {}
          }
          data-internship-careers={JSON.stringify(careers)}
        >
          <div
            className="switch-button"
            aria-checked={suscripted}
            id={isAuthenticated && loggedUser && hasNotifications ? "alerts-switch-button" : "switch-button"}
          />
          <span className="switch-slider round"></span>
        </div>
      </div>
      <p className="text-xs text-text/50">
        {isAuthenticated && loggedUser && hasNotifications && (
          <a
            className="group font-text! "
            href="/alerts"
          >
            Gestiona tus <span className="text-primary-hover/75 underline  group-hover:text-primary-hover transition-all">alertas</span>
          </a>
        )}
        {!isAuthenticated || !loggedUser ? (
          <span>Necesitas iniciar sesion</span>
        ) : (
          !hasNotifications && (
            <span className="underline">
              Necesitas{" "}
              <a
                href="/alerts"
                className="font-text! transition-all"
              >
                activar las alertas
              </a>{" "}
            </span>
          )
        )}
      </p>
    </div>
  );
}
