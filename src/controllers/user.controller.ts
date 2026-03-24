import userService from "../services/user.service";

class UserController {
  async suscribeUser(userId: string, suscription: boolean) {
    return await userService.syncUser(userId, "", "", suscription);
  }

  async suscribeCareers(userId: string, toSuscribeCareers: Array<string>, toDeleteCareers: Array<string>) {
    return await userService.suscribeCareers(userId, toSuscribeCareers, toDeleteCareers);
  }
}

export default new UserController();
