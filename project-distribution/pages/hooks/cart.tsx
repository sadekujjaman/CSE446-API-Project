import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Address, Product } from "../types/utils";

export interface Transaction {
  accountNo: string;
  accountName?: string;
  payable: string;
  transactionId?: string;
}

export interface CartProduct {
  product: Product;
  count: number;
}

interface CartContextType {
  products: CartProduct[];
  addProduct: (productInfo: Product, count: number) => void;
  deleteProduct: (productInfo: Product) => void;
  clearCart: () => void;
  getCountById: (productId: string) => void;
  getAddress: () => Address;
  addAddress: (address: Address) => void;
  addTransaction: (transaction: Transaction) => void;
  getTransaction: () => Transaction;
}

export const CartContext = createContext<CartContextType>(
  {} as CartContextType
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [address, setAddress] = useState<Address>();
  const [transaction, setTransaction] = useState<Transaction>();

  const isProductExist = useCallback(
    (productInfo: Product) => {
      return (
        products.filter((product) => product.product._id === productInfo._id)
          .length > 0
      );
    },
    [products]
  );
  const updateProduct = useCallback(
    (productInfo: Product, count: number) => {
      if (count < 0) {
        return;
      }

      setProducts(() => {
        const updatedProducts = products.map((product) =>
          product.product._id === productInfo._id
            ? { ...product, count }
            : product
        );

        return updatedProducts;
      });
    },
    [products]
  );
  const addProduct = useCallback(
    (productInfo: Product, count: number) => {
      if (isProductExist(productInfo)) {
        updateProduct(productInfo, count);
        return;
      }
      setProducts((prevProducts: CartProduct[]) => {
        const updatedProducts = [
          ...prevProducts,
          { product: productInfo, count } as CartProduct,
        ];

        return updatedProducts;
      });
    },
    [isProductExist, products, updateProduct]
  );

  const deleteProduct = useCallback(
    (productInfo: Product) => {
      setProducts(() => {
        const updatedProducts = products.filter(
          (product) => product.product._id !== productInfo._id
        );
        console.log(updatedProducts);
        return updatedProducts;
      });
    },
    [products]
  );

  const getCountById = useCallback(
    (productId: string) => {
      return (
        products.filter((product) => product.product._id === productId)
          ?.length ?? 0
      );
    },
    [products]
  );

  const clearCart = () => {
    setProducts([]);
  };

  const getAddress = useCallback(() => {
    return address as Address;
  }, [address]);

  const addAddress = (address: Address) => {
    setAddress(address);
  };

  const getTransaction = useCallback(() => {
    return transaction as Transaction;
  }, [transaction]);

  const addTransaction = (transaction: Transaction) => {
    setTransaction(transaction);
  };

  const value = useMemo(
    () => ({
      products,
      addProduct,
      deleteProduct,
      getCountById,
      getAddress,
      addAddress,
      clearCart,
      getTransaction,
      addTransaction,
    }),
    [addProduct, deleteProduct, getAddress, getCountById, products]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  return useContext(CartContext);
};

export const getTotalPrice = ({ products }: { products: CartProduct[] }) => {
  const price = products
    .map((product) => ({
      price: product.product.price ?? 0,
      count: product.count,
    }))
    .reduce((prev, product) => prev + product.count * product.price, 0);

  return price;
};
