import { defineAction } from "astro:actions";
import { z } from "astro/zod";
import userController from "../controllers/user.controller";

export const server = {
  suscribeUser: defineAction({
    input: z.object({
      id: z.string(),
      suscription: z.boolean(),
    }),
    handler: async ({ id, suscription }) => {
      await userController.suscribeUser(id, suscription);
      return "User suscripted";
    },
  }),

  suscribeCareers: defineAction({
    input: z.object({
      id: z.string(),
      toSuscribeCareers: z.array(z.string()),
      toDeleteCareers: z.array(z.string()),
    }),
    handler: async ({ id, toSuscribeCareers, toDeleteCareers }) => {
      await userController.suscribeCareers(id, toSuscribeCareers, toDeleteCareers);
      return "Careers suscripted";
    },
  }),
};
