import type { User } from "../../prisma/zod";
import userRepository from "../repositories/user.repository";

class UserService {
  async getSuscriptedUsers(careers: Array<string>) {
    const usersData = await userRepository.getSuscriptedUsers(careers);

    const users = usersData.map((user) => {
      return this.mapUserToJson(user);
    });

    return users;
  }

  async getUser(userId: string): Promise<User> {
    const user = await userRepository.getUser(userId);

    return this.mapUserToJson(user);
  }

  async syncUser(userId: string, name?: string, mail?: string, suscripted?: boolean) {
    return await userRepository.syncUser(userId, name, mail, suscripted);
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
