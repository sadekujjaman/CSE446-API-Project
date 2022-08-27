import { createContext, useContext, useState } from "react";
import { Address, Course, Project, User } from "../types/utils";

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
    setUser(() => newUser);
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

// address

// interface AddressContextType {
//   address: Address | null;
//   updateAddress: (newAddress: Address) => void;
// }

// const AddressContextDefaultValue: AddressContextType = {
//   address: null,
//   updateAddress: (newAddress: Address) => {},
// };

// export const AddressContext = createContext<AddressContextType>(
//   AddressContextDefaultValue
// );

// export const AddressProvider = ({ children }: { children: any }) => {
//   const [address, setAddress] = useState<Address | null>(null);

//   const updateAddress = (newAddress: Address) => {
//     setAddress(() => newAddress);
//   };

//   return (
//     <AddressContext.Provider value={{ address, updateAddress }}>
//       {children}
//     </AddressContext.Provider>
//   );
// };

// export const useAddress = () => {
//   return useContext(AddressContext);
// };
