import { POPULATED_MOCK } from "../mock/populated";
import { NotificationService } from "../services/notification.service";
import userService from "../services/user.service";
import { UploadController } from "./upload.controller";

export class CronController {
  async cron() {
    const uploader = new UploadController();

    // const { internships } = await uploader.uploadData();
    const internships = POPULATED_MOCK.internships;

    const careersSet: Set<string> = new Set();

    // Extract the careers of the new internships
    for (const internship of internships) {
      const careers = internship?.careers;

      for (const careear of careers) {
        careersSet.add(careear);
      }
    }

    const careers = Array.from(careersSet);
    const suscriptedUsers = await userService.getSuscriptedUsers(careers);

    // Associate suscripted users with all the internships that matches and need notification
    const toNotify = {} as { [key: string]: { domain: string; username: string; internships: Set<string> } };

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
          toNotify[user?.id]?.internships?.add(internship.arm);
        }
      }
    }

    const arrayToNotify = Object.entries(toNotify).map(([key, value]) => {
      return { domain: value.domain, username: value.username, internships: Array.from(value.internships) };
    });

    const notificator = new NotificationService();

    notificator.notify(arrayToNotify);

    return;
  }
}
