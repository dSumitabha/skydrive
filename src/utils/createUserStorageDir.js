import { mkdir } from "fs/promises";
import path from "path";


export async function createUserStorageDir(userId) {
  const userDir = path.join(process.cwd(), "storage", userId);
  await mkdir(userDir, { recursive: true });
  return userDir;
}
