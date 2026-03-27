import prisma from "../lib/prisma";

class UserRepository {
  async getSuscriptedUsers(careers: Array<string>) {
    let where = {};
    if (careers && careers.length > 0) {
      where["OR"] = careers.map((c) => ({ career_id: c }));
    }
    return await prisma.user.findMany({ where: { suscripted: true }, include: { userCareers: { include: { Career: true }, where: where } } });
  }

  async getUser(userId: string) {
    return await prisma.user.findFirst({
      where: { id: userId },
      include: {
        userCareers: {
          include: {
            Career: true,
          },
        },
      },
    });
  }

  async syncUser(userId: string, name?: string, mail?: string, suscripted?: boolean) {
    const update = {};

    if (name) {
      update["name"] = name;
    }

    if (mail) {
      update["mail"] = mail;
    }

    if (typeof suscripted === "boolean") {
      update["suscripted"] = suscripted;
    }

    return await prisma.user.upsert({
      where: {
        id: userId,
      },
      update: update,
      create: {
        id: userId,
        name: name ?? "",
        mail: mail ?? "",
      },
    });
  }

  async suscribeCareers(userId: string, toSuscribeCareers: Array<string>, toDeleteCareers: Array<string>) {
    const toSuscribe = toSuscribeCareers.map((c) => ({ user_id: userId, career_id: c }));
    await prisma.userCareer.createMany({ data: toSuscribe, skipDuplicates: true });

    // Delete career if needed
    if (toDeleteCareers && toDeleteCareers?.length > 0) {
      const where = { AND: [{ user_id: userId, OR: toDeleteCareers.map((c) => ({ career_id: c })) }] };

      await prisma.userCareer.deleteMany({ where: where });
    }

    return;
  }
}

export default new UserRepository();
