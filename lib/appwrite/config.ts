export const configAppwrite = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
  project: process.env.NEXT_PUBLIC_APPWRITE_PROJECT!,
  database: process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
  user_collection: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION!,
  files_collection: process.env.NEXT_PUBLIC_APPWRITE_FILES_COLLECTION!,
  bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET!,
  scurtyId: process.env.NEXT_APPWRITE_KEY!,
};
