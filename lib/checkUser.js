import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getStableCurrentUser() {
  const attempt = async () => {
    try {
      const user = await currentUser();
      if (user) return user;

      const { userId } = await auth();
      if (!userId) return null;
      return await currentUser();
    } catch (e) {
      return null;
    }
  };

  const retries = [0, 120, 240];
  for (const delay of retries) {
    if (delay) await sleep(delay);
    const user = await attempt();
    if (user) return user;
  }
  return null;
}

export const checkUser = async () => {
  try {
    const user = await getStableCurrentUser();

    if (!user) {
      return null;
    }

    const loggedInUser = await db.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });

    if (loggedInUser) {
      return loggedInUser;
    }

    const primaryEmail =
      user.emailAddresses?.find((e) => e.id === user.primaryEmailAddressId)
        ?.emailAddress || user.emailAddresses?.[0]?.emailAddress;

    const newUser = await db.user.create({
      data: {
        clerkId: user.id,
        email: primaryEmail || "",
        firstName: user.firstName,
        lastName: user.lastName,
        role: "STUDENT",
      },
    });

    return newUser;
  } catch (error) {
    return null;
  }
};