'use server';

import { ID, Query } from 'node-appwrite';
import { createAdminClient, createSeassionClient } from '../appwrite';
import { configAppwrite } from '../appwrite/config';
import { parseStringify } from '../utils';
import { cookies } from 'next/headers';

const getUserByEmail = async (email: string) => {
  try {
    const { databases } = await createAdminClient();
    const respons = await databases.listDocuments(
      configAppwrite.database,
      configAppwrite.user_collection,
      [Query.equal('email', [email])],
    );

    return respons.total > 0 ? respons.documents[0] : null;
  } catch (error) {}
};

const errorHandler = (error: unknown, message: string) => {
  console.log(message);
  console.log('here');
  throw error;
};
const SendOtptoEmail = async (email: string) => {
  try {
    const { account } = await createAdminClient();
    const sessionToken = await account.createEmailToken(ID.unique(3), email);

    return sessionToken.userId;
  } catch (error) {
    errorHandler(error, 'field to send Otp to email');
  }
};
export const createAcount = async ({
  email,
  fullname,
}: {
  email: string;
  fullname: string;
}) => {
  const existingUser = await getUserByEmail(email);

  const accountId = await SendOtptoEmail(email);
  if (!accountId) throw new Error('field to send Otp to email');

  if (!existingUser) {
    const { databases } = await createAdminClient();
    databases.createDocument(
      configAppwrite.database,
      configAppwrite.user_collection,
      ID.unique(),
      {
        fullname,
        email,
        avatar:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKkAAACUCAMAAADf7/luAAAAMFBMVEXh4eGjo6OgoKDk5OTb29uoqKixsbHMzMytra3GxsbBwcHe3t7U1NTX19e2tradnZ3QSE/cAAAD2UlEQVR4nO2c23LjIBBEgeF+0///7YJsx0ls2WCBBmXph7iSysOpBiGYaUzI1NTU1NTU1NRfFwAQ59z6Oa4SXDBR6iwZTSCj0jof6bIwehFbFhq9w4Z6FHAr2Y3yJsak5YP5Cko8cF5YhRoJFbxcnmBetEg/DGs2dBM0+TqMrWBeYF5khkAF+8rQq612AFQw70ET6gCuqgLOLIUNGgpBKQ3IpLJk7Nfxl6icZZP0ioo6VYMoBqVUII5/yQL1zVTEpcrVWJpMRdtZgaqxNJmK9lYFXUmqsUhdHWhCRRr+2sFHHP6qJ38ltTigJFaCUhpxQF3xm/TLU4kzUbmu9lRzHNK6dT9LTNI/Q3qaeepkNSnSs3+e9RRsNSnSDhV89cqPVvepJkXiJFD5OmUSbSd9mj1/OkdVnfjwzlGEVBz384EfD5SEmteUxqz3nKeGUvH44z34V3FahsoozubkLiiun6KXes9Tkz5PnZ8UrKqoK+l3gX/TjxqodcZfbapjGAY0oZKtNh8TigwESnJv30j6a21Nv0kzYI8/+WolW9jak04/FybtaH7eBMQFZaPWQutoVXCDcl51CaCMHUOZmpqampqampr6VGvqmAefpJTKH4GvKWRssB8CcNwbG6UWIm33lyXt/KkQWkZrPHeD0KY9M1dRi/VE8usctf5B6Kg49s4aSLIyLvdw9MaBP/1HTOZiHVayl1bTp6HjJ7SMapu9PZ7TqShKMb9gRVTuWNY1EF8Bedeh0flk52MgvsZaeYyx4IworENvslJhurMCtx8O+08ttO+VhORnZUBuW0x39BW43jE/H1CZ7marbch5Ye2SSQMX23KurLH9DADfbIb+QNWtK+vgd65Mm6i0LeqbnsMu1Kb9CgjdQDNqw46F6zJHv1B1s41AXRj+A9RmHUDelTOrVZ+6s6XtUskfZCJr1SZDWdzB36M2t6e6D36z4T8P6XlG/zzPPiEd36UrqGgFmvYnXUlb7lHe39Ldo6YplY5TtfURpfqOSTFo69ud9ddhSkGb1354p3NU+7gf9EDtc+QH3nwCMNmnNtEctRdoVlPUvne66y9wbKvz9UPVqDbFWO+vHoDQZAlgun8sEZzdXfhh1B5TP1diX1l6OewLUiDtrXZ0JNLe6bhOD/j4ISuj8diELxD/SaeHMemP70mCf4jGvrOTIn3ZEIC3z7+r6bmdwnq0jjQQbiQrWQgWJg1aL/oKC868bvWujV0zRBwhOZszxxn3IYmQcwhWIbv5XZAzCQlXCrYmJTIjEzJB5vzBMJh3AeRECg8h8Jw+GRFxampqampqaur/1D/jNijv0GWRFgAAAABJRU5ErkJggg==',
        accountId,
      },
    );
  }
  return parseStringify({ accountid: accountId });
};

export const verfaySecrut = async ({
  accountId,
  password,
}: {
  accountId: string | null;
  password: string;
}) => {
  try {
    const { account } = await createAdminClient();

    const session = await account.createSession(accountId || '', password);

    (await cookies()).set('appwrite-session', session.secret, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });

    return parseStringify({ sessionId: session.$id });
  } catch (error) {
    errorHandler(error, 'Failed to verify OTP');
  }
};

export const getCurrentUser = async () => {
  const { account, databases } = await createSeassionClient();
  const result = await account.get();
  const user = await databases.listDocuments(
    configAppwrite.database,
    configAppwrite.user_collection,
    [Query.equal('accountId', result.$id)],
  );
  if (user.total < 0) return null;

  return parseStringify(user.documents[0]);
};
