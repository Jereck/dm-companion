import { createTRPCRouter } from "~/server/api/trpc";
import { campaignsRouter } from "./routers/campaigns";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  campaigns: campaignsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
