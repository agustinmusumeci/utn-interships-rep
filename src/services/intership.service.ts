import intershipRepository from "../repositories/intership.repository";

class IntershipService {
  constructor() {}

  async scrapeInterships() {
    return await intershipRepository.scrapeInterships();
  }

  async getInterships() {
    return await intershipRepository.getInterships();
  }
}

export default new IntershipService();
