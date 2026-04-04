import userService from "../services/user.service";

class UserController {
  async suscribeUser(userId: string, suscription: boolean) {
    try {
      await userService.syncUser(userId, "", "", suscription);

      return { message: "Alertas activadas correctamente", ok: true, error: undefined };
    } catch (e) {
      console.log(e);
      return { message: "Error activando las alertar - Intente más tarde", ok: true, error: e };
    }
  }

  async suscribeCareers(userId: string, toSuscribeCareers: Array<string>, toDeleteCareers: Array<string>) {
    try {
      await userService.suscribeCareers(userId, toSuscribeCareers, toDeleteCareers);
      return { message: "Carreras suscriptas correctamente", ok: true, error: undefined };
    } catch (e) {
      console.log(e);
      return { message: "Error activando las alertar - Intente más tarde", ok: true, error: e };
    }
  }
}

export default new UserController();
