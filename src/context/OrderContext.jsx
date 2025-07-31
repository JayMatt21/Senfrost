import { createContext, useContext, useState, useEffect } from 'react'; 


const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState(null);

  const saveOrder = (orderData) => {
    setOrder(orderData);
    localStorage.setItem('order', JSON.stringify(orderData));
  };

  useEffect(() => {
    const storedOrder = localStorage.getItem('order');
    if (storedOrder) {
      setOrder(JSON.parse(storedOrder));
    }
  }, []);

  return (
    <OrderContext.Provider value={{ order, saveOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
