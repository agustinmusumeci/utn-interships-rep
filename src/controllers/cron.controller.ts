import { UserService } from "@/services/user.service";
import { NotificationService } from "../services/notification.service";
import { UploadController } from "./upload.controller";
import extractKeywords from "@/utils/extractKeywords";

export class CronController {
  async cron() {
    try {
      // Scrape internships
      const uploader = new UploadController();
      const userService = new UserService();

      const { internships } = await uploader.uploadData();

      // const internships = [
      //   {
      //     id: 619,
      //     arm: "41/26",
      //     city: "CORDOBA CAPITAL",
      //     rrhh: "Juan Asnal",
      //     interview_timetable: "A convenir.",
      //     knowledge:
      //       "El rol está orientado al apoyo en el monitoreo y la gestión de los Pisos Tecnológicos (CAIID), espacios comunitarios de acceso digital ubicados en distintos barrios populares de la ciudad.",
      //     requirements: "Requiere saber SQL",
      //     payment: 450000,
      //     timetable: "20hs semanales, de lunes a viernes, horario a convenir.",
      //     position:
      //       "Asistente técnico-comunitario en Pisos Tecnológicos (CAIID-Centros de Acceso a Internet para la Integración Digital) – Proyecto Ranchada IP-Internet popular/ Área de Integración Digital.",
      //     benefits:
      //       "La pasantía ofrece la posibilidad de integrarse a un proyecto de inclusión digital con trabajo en territorio, adquirir experiencia en gestión de proyectos sociales y fortalecer capacidades en el cruce entre tecnología y comunidad, en articulación con organizaciones sociales e instituciones públicas.",
      //     interns: 1,
      //     workplace: "En sede central, ubicada en Julio A. Roca 584, barrio Güemes",
      //     modality: "PRESENCIAL",
      //     link: "Sin link",
      //     mail: "mutualcarlosmugica@gmail.com",
      //     observations: "+ viáticos",
      //     company: {
      //       id: "ASOCIACION MUTUAL CARLOS MUGICA",
      //       name: "ASOCIACION MUTUAL CARLOS MUGICA",
      //     },
      //     careers: ["INDUSTRIAL"],
      //     timeSinceCreated: { time: "Hace 4 d", color: "#00a27d" },
      //     created_at: "2026-04-14T01:17:14.591Z",
      //   },
      // ];

      // We dont have any internship to notify to
      if (internships.length === 0) {
        console.log("No internships");

        return;
      }

      const careersSet: Set<string> = new Set();
      const keywordsSet: Set<string> = new Set();

      const fieldsToAnalyze = ["knowledge", "requirements", "position"];

      // Analize the new internships
      for (const internship of internships) {
        const careers = internship?.careers ?? [];

        // Extract the keywords
        for (const field of fieldsToAnalyze) {
          const keywords = extractKeywords(internship[`${field}`]);

          for (const keyword of keywords) {
            keywordsSet.add(keyword);
          }
        }

        // Extract the career
        for (const careear of careers) {
          careersSet.add(careear);
        }
      }

      // Get users that are suscripted to the careers or keywords of the newest internships
      const careers = Array.from(careersSet);
      const keywords = Array.from(keywordsSet);
      const suscriptedUsers = await userService.getSuscriptedUsers(careers, keywords);

      // Associate suscripted users with all the internships that matches and need notification
      const toNotify = {} as { [key: string]: { domain: string; username: string; internships: Set<number> } };

      for (const user of suscriptedUsers) {
        toNotify[user?.id] = { domain: user.mail, username: user.name, internships: new Set() };

        const userSuscriptedCareers = new Set(
          user?.careers?.map((c: any) => {
            return c?.id;
          }),
        );

        for (const internship of internships) {
          const internshipCareers = new Set(internship.careers);

          const matchCareers = userSuscriptedCareers.intersection(internshipCareers);

          if (matchCareers.size > 0) {
            toNotify[user?.id]?.internships?.add(internship.id);
          }
        }
      }

      const arrayToNotify = Object.entries(toNotify).map(([key, value]) => {
        return { userId: key, domain: value.domain, username: value.username, internships: Array.from(value.internships).map(String) };
      });

      // Notify all the intersted users
      const notificator = new NotificationService();

      // console.log(toNotify, arrayToNotify);

      await notificator.notify(arrayToNotify);

      // Create web notifications
      for (let data of arrayToNotify) {
        const userId = data.userId;
        const userInternships = data.internships.map(Number);

        await userService.createNotification(userId, userInternships);
      }
    } catch (e) {
      console.log(e);
      return;
    }
  }
}
