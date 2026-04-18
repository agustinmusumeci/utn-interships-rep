import { UserService } from "@/services/user.service";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async suscribeUser(userId: string, suscription: boolean) {
    try {
      await this.userService.syncUser(userId, "", "", suscription);

      return { message: "Alertas activadas correctamente", ok: true, error: undefined };
    } catch (e) {
      console.log(e);
      return { message: "Error activando las alertar - Intente más tarde", ok: true, error: e };
    }
  }

  async suscribeCareers(userId: string, toSuscribeCareers: Array<string>, toDeleteCareers: Array<string>) {
    try {
      await this.userService.suscribeCareers(userId, toSuscribeCareers, toDeleteCareers);
      return { message: "Carreras suscriptas correctamente", ok: true, error: undefined };
    } catch (e) {
      console.log(e);
      return { message: "Error activando las alertas de carreras - Intente más tarde", ok: true, error: e };
    }
  }

  async suscribeKeywords(userId: string, toSuscribeKeywords: Array<string>, toDeleteKeywords: Array<string>) {
    try {
      await this.userService.suscribeKeywords(userId, toSuscribeKeywords, toDeleteKeywords);
      return { message: "Keywords suscriptas correctamente", ok: true, error: undefined };
    } catch (e) {
      console.log(e);
      return { message: "Error activando las alertas de keywords - Intente más tarde", ok: true, error: e };
    }
  }
}
