import prisma from "../lib/prisma";

export class UserRepository {
  async getSuscriptedUsers(careers: Array<string>) {
    let where = {} as { OR: Array<{ career_id: string }> };
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

  async getUserNotifications(userId: string) {
    return await prisma.userNotification.findMany({
      where: { user_id: userId, seen: false },
      include: { Internship: { include: { internshipCareers: { include: { Career: true } } } } },
      orderBy: { Internship: { created_at: "desc" } },
    });
  }

  async countUserNotifications(userId: string): Promise<number> {
    return await prisma.userNotification.count({ where: { user_id: userId, seen: false } });
  }

  async createNotifications(notifications: Array<{ user_id: string; internship_id: number; seen: boolean }>) {
    return await prisma.userNotification.createMany({ data: notifications, skipDuplicates: true });
  }

  async markNotificationAsRead(userId: string, internships: Array<number>) {
    return await prisma.userNotification.updateMany({ data: { seen: true }, where: { user_id: userId, internship_id: { in: internships } } });
  }

  async syncUser(userId: string, name?: string, mail?: string, suscripted?: boolean) {
    const update = {} as { name: string; mail: string; suscripted: boolean };

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
