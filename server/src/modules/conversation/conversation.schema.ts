import z from 'zod';

export const createGroupChatSchema = z.object({
  body: z.object({
    membersIDs: z.string().array(),
    groupName: z.string().min(2).max(14),
  }),
});

export const deleteGroupChatSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});
