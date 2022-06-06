import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Product } from "../types/utils";

interface CartProduct {
  product: Product;
  count: number;
}

interface CartContextType {
  products: CartProduct[];
  addProduct: (productInfo: Product, count: number) => void;
  deleteProduct: (productInfo: Product) => void;
  clearCart: () => void;
  getCountById: (productId: string) => void;
  getAddresses: () => void;
  addAddress: (address: string) => void;
}

export const CartContext = createContext<CartContextType>(
  {} as CartContextType
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [addresses, setAddresses] = useState<string[]>([]);

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

  const getAddresses = useCallback(() => {
    return addresses;
  }, [addresses]);

  const addAddress = (address: string) => {
    setAddresses((prevAddresses: string[]) => {
      const updatedAddress = [...prevAddresses, address];
      return updatedAddress;
    });
  };

  const value = useMemo(
    () => ({
      products,
      addProduct,
      deleteProduct,
      getCountById,
      getAddresses,
      addAddress,
      clearCart,
    }),
    [addProduct, deleteProduct, getAddresses, getCountById, products]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  return useContext(CartContext);
};
