import type { User } from "../../prisma/zod";
import userRepository from "../repositories/user.repository";
import internshipService from "./internship.service";

class UserService {
  async getSuscriptedUsers(careers: Array<string>) {
    const usersData = await userRepository.getSuscriptedUsers(careers);

    const users = usersData.map((user) => {
      return this.mapUserToJson(user);
    });

    return users;
  }

  async getUser(userId: string): Promise<User> {
    try {
      const user = await userRepository.getUser(userId);

      return this.mapUserToJson(user);
    } catch (e) {
      console.log(e);
      return {} as User;
    }
  }

  async getUserNotifications(userId: string) {
    try {
      const data = await userRepository.getUserNotifications(userId);

      if (!data || data.length === 0) return [];

      const internships = data.map((el) => {
        const internship = {
          userId: el.user_id,
          seen: el.seen,
          internship: internshipService.mapInternship(el?.Internship),
        };
        return internship;
      });

      return internships;
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  async countUserNotifications(userId: string): Promise<number> {
    try {
      const notificationsCount = await userRepository.countUserNotifications(userId);

      return notificationsCount;
    } catch (e) {
      console.log(e);
      return 0;
    }
  }

  async createNotification(userId: string, internships: Array<number>) {
    const notifications = internships.map((id) => ({
      user_id: userId,
      internship_id: id,
      seen: false,
    }));

    return await userRepository.createNotifications(notifications);
  }

  async syncUser(userId: string, name?: string, mail?: string, suscripted?: boolean) {
    try {
      return await userRepository.syncUser(userId, name, mail, suscripted);
    } catch (e) {
      console.log(e);
      return;
    }
  }

  async suscribeCareers(userId: string, toSuscribeCareers: Array<string>, toDeleteCareers: Array<string>) {
    return await userRepository.suscribeCareers(userId, toSuscribeCareers, toDeleteCareers);
  }

  mapUserToJson(user: User & { userCareers?: any[] }) {
    const newUser = {
      id: user?.id,
      name: user?.name,
      mail: user?.mail,
      suscripted: user?.suscripted,
      careers:
        user?.userCareers?.map((career) => ({
          id: career?.career_id,
          name: career?.Career?.name,
          color: career?.Career?.color,
        })) ?? [],
    };

    return newUser;
  }
}

export default new UserService();
