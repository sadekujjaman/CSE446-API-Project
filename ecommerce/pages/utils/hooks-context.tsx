import { createContext, useContext, useState } from "react";
import { Address, Course, Project, User } from "../types/utils";

const SUPPLIER_DOMAIN = "prism";

interface UserContextType {
  user: User | null;
  updateUser: (newUser: User) => void;
}

const UserContextDefaultValue: UserContextType = {
  user: null,
  updateUser: (newUser: User) => {},
};

export const UserContext = createContext<UserContextType>(
  UserContextDefaultValue
);

export const UserProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<User | null>(null);

  const updateUser = (newUser: User) => {
    setUser(() => {
      const { email } = newUser;
      if (email && email.includes(SUPPLIER_DOMAIN)) {
        newUser["isSupplier"] = true;
      }
      return newUser;
    });
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
