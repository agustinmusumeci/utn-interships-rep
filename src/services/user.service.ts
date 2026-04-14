import { UserRepository } from "@/repositories/user.repository";
import { InternshipRepository } from "@/repositories/internship.repository";
import type { User } from "../../prisma/zod";
import { InternshipService } from "./internship.service";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getSuscriptedUsers(careers: Array<string>) {
    const usersData = await this.userRepository.getSuscriptedUsers(careers);

    const users = usersData.map((user) => {
      return this.mapUserToJson(user);
    });

    return users;
  }

  async getUser(userId: string | undefined): Promise<User> {
    try {
      if (!userId) throw new Error("Empty user id");

      const user = await this.userRepository.getUser(userId);

      if (!user) return {} as User;

      return this.mapUserToJson(user);
    } catch (e) {
      console.log(e);
      return {} as User;
    }
  }

  async getUserNotifications(userId: string | undefined) {
    try {
      if (!userId) throw new Error("Empty user id");

      const data = await this.userRepository.getUserNotifications(userId);

      if (!data || data.length === 0) return [];

      const internshipService = new InternshipService();

      const internships = data.map((el) => {
        const internship = {
          userId: el.user_id,
          seen: el.seen,
          internship: internshipService.mapInternship(el.Internship),
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
      const notificationsCount = await this.userRepository.countUserNotifications(userId);

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

    return await this.userRepository.createNotifications(notifications);
  }

  async markNotificationAsRead(userId: string, internships: Array<number>) {
    try {
      await this.userRepository.markNotificationAsRead(userId, internships);
      return internships;
    } catch (e) {
      return [];
    }
  }

  async syncUser(userId: string, name?: string, mail?: string, suscripted?: boolean) {
    try {
      return await this.userRepository.syncUser(userId, name, mail, suscripted);
    } catch (e) {
      console.log(e);
      return;
    }
  }

  async suscribeCareers(userId: string, toSuscribeCareers: Array<string>, toDeleteCareers: Array<string>) {
    try {
      return await this.userRepository.suscribeCareers(userId, toSuscribeCareers, toDeleteCareers);
    } catch (e) {
      console.log(e);
      return;
    }
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
