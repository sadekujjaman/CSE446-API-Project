import { createContext, useContext } from "react";
import { Project, User } from "../types/utils";

export class Storage {
  user: User | null = null;
  projects: Array<Project> = []
}

export const StoreContext = createContext<Storage | null>(null);

export function useStore(): Storage | null {
  const ret = useContext(StoreContext);
  return ret;
}
