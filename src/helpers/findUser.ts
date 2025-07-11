import client from './prisma';

const findUser = async (userId: number) => {
  if (!userId) return null;
  return await client.user.findUnique({
    where: {
      id: userId,
    },
  });
};

export default findUser;
