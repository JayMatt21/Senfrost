import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prev) => {
      const exist = prev.find(
        (x) => x.id === item.id && x.selectedCapacity === item.selectedCapacity
      );
      if (exist) {
        return prev.map((x) =>
          x.id === item.id && x.selectedCapacity === item.selectedCapacity
            ? { ...x, quantity: x.quantity + 1 }
            : x
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const updateItemQuantity = (id, selectedCapacity, quantity) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id && item.selectedCapacity === selectedCapacity
          ? { ...item, quantity }
          : item
      )
    );
  };

    const removeItem = (id, selectedCapacity) => {
      setCart((prev) =>
        prev.filter(
          (item) =>
            !(item.id === id && item.selectedCapacity === selectedCapacity)
        )
      );
    };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateItemQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
