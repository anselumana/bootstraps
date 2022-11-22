import { ObjectId } from "mongodb";


export function isValidObjectId(id: string | undefined): boolean {
  try {
    new ObjectId(id);
    return true;
  }
  catch (err: any) {
    return false;
  }
}