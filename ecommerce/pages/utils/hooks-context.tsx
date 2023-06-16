import { createContext, useContext, useState } from "react";
import { User } from "../types/utils";

const SUPPLIER_EMAIL = process.env.NEXT_PUBLIC_SUPPLIER_EMAIL;

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
      if (email && email === SUPPLIER_EMAIL) {
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
