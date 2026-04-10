import { UserService } from "@/services/user.service";
import { NotificationService } from "../services/notification.service";
import { UploadController } from "./upload.controller";

export class CronController {
  async cron() {
    try {
      // Scrape internships
      const uploader = new UploadController();
      const userService = new UserService();

      const { internships } = await uploader.uploadData();

      // We dont have any internship to notify to
      if (internships.length < 0) {
        console.log("No internships");

        return;
      }

      const careersSet: Set<string> = new Set();

      // Extract the careers of the new internships
      for (const internship of internships) {
        const careers = internship?.careers ?? [];

        for (const careear of careers) {
          careersSet.add(careear);
        }
      }

      const careers = Array.from(careersSet);
      const suscriptedUsers = await userService.getSuscriptedUsers(careers);

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

      // console.log(toNotify);

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
