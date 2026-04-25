import { defineAction } from "astro:actions";
import { z } from "astro/zod";
import { UserService } from "@/services/user.service";
import { UserController } from "@/controllers/user.controller";

export const server = {
  suscribeUser: defineAction({
    input: z.object({
      id: z.string(),
      suscription: z.boolean(),
    }),
    handler: async ({ id, suscription }) => {
      const userController = new UserController();

      const res = await userController.suscribeUser(id, suscription);
      return res;
    },
  }),

  suscribeCareers: defineAction({
    input: z.object({
      id: z.string(),
      toSuscribeCareers: z.array(z.string()),
      toDeleteCareers: z.array(z.string() || z.null),
    }),
    handler: async ({ id, toSuscribeCareers, toDeleteCareers }) => {
      const userController = new UserController();

      const res = await userController.suscribeCareers(id, toSuscribeCareers, toDeleteCareers);
      return res;
    },
  }),

  suscribeKeywords: defineAction({
    input: z.object({
      id: z.string(),
      toSuscribeKeywords: z.array(z.string()),
      toDeleteKeywords: z.array(z.string() || z.null),
    }),
    handler: async ({ id, toSuscribeKeywords, toDeleteKeywords }) => {
      const userController = new UserController();

      const res = await userController.suscribeKeywords(id, toSuscribeKeywords, toDeleteKeywords);
      return res;
    },
  }),

  saveInternship: defineAction({
    input: z.object({
      internshipId: z.number(),
      userId: z.string(),
      saved: z.boolean(),
    }),
    handler: async ({ internshipId, userId, saved }) => {
      const userService = new UserService();

      const res = await userService.saveInternship(internshipId, userId, saved);
      return res;
    },
  }),

  markAlertAsRead: defineAction({
    input: z.object({ id: z.string(), internships: z.array(z.number()) }),
    handler: async ({ id, internships }) => {
      const userService = new UserService();

      const res = await userService.markNotificationAsRead(id, internships);
      return res;
    },
  }),
};
