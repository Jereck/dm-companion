import { clerkClient } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/dist/types/api";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const filterUserForClient = (user: User) => {
  return { 
    id: user.id, 
    username: user.username, 
    name: user.firstName,
    profileImageUrl: user.profileImageUrl
  }
}

export const campaignsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const campaigns = await ctx.prisma.campaigns.findMany({
      take: 10
    });

    const users = (await clerkClient.users.getUserList({
      userId: campaigns.map((campaign) => campaign.authorId),
      limit: 10
    })).map(filterUserForClient)

    return campaigns.map(campaign => {
      const author = users.find((user) => user.id === campaign.authorId)

      if (!author) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Author for campaign not found" })

      return {
        campaign,
        author
      }
    })
  }),
});
