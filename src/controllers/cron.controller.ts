import { POPULATED_MOCK } from "../mock/populated";
import internshipService from "../services/internship.service";
import { NotificationService } from "../services/notification.service";
import userService from "../services/user.service";
import { UploadController } from "./upload.controller";

export class CronController {
  async cron() {
    const uploader = new UploadController();

    const { internships } = await uploader.uploadData();
    // const internships = POPULATED_MOCK.internships;

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
    const toMail = {} as { key: string; value: Set<string> };

    for (const user of suscriptedUsers) {
      toMail[user?.id] = { mail: user.mail, internships: new Set() };

      const userSuscriptedCareers = new Set(
        user?.careers?.map((c) => {
          return c?.id;
        }),
      );

      for (const internship of internships) {
        const internshipCareers = new Set(internship.careers);

        const matchCareers = userSuscriptedCareers.intersection(internshipCareers);

        if (matchCareers.size > 0) {
          toMail[user?.id]?.internships?.add(internship.arm);
        }
      }
    }

    console.log(toMail);

    return;
  }
}
