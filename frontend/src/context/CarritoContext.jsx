import { createContext, useState } from 'react';

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  function agregarAlCarrito(estudio) {
    setCarrito(prev => [...prev, estudio]);
  }

  function quitarDelCarrito(id) {
    setCarrito(prev => prev.filter(e => e.id !== id));
  }

  function limpiarCarrito() {
    setCarrito([]);
  }

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, quitarDelCarrito, limpiarCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
}
