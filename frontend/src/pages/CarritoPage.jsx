import { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';
import { motion } from 'framer-motion';

export default function CarritoPage({ onRegresar }) {
  const { carrito, quitarDelCarrito, limpiarCarrito } = useContext(CarritoContext);
  const total = carrito.reduce((acc, item) => acc + item.precio, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-xl w-full mx-auto p-8 bg-white bg-opacity-95 rounded-3xl shadow-2xl border border-emerald-100 mt-10"
    >
      <h1 className="text-3xl font-black text-emerald-700 mb-6 text-center">Carrito de compras</h1>
      {carrito.length === 0 ? (
        <div className="text-center text-emerald-600 font-semibold py-10 flex flex-col items-center">
          <div>Tu carrito está vacío</div>
          <button
            className="mt-6 px-6 py-2 rounded text-white bg-gray-500 font-bold hover:bg-gray-800 transition"
            onClick={onRegresar}
          >
            ← Regresar al panel
          </button>
        </div>
      ) : (
        <>
          <ul className="mb-6 divide-y divide-emerald-200">
            {carrito.map(item => (
              <li key={item.id} className="flex items-center justify-between py-4">
                <span>
                  <span className="font-bold text-emerald-900">{item.nombre}</span>
                  <span className="ml-2 text-emerald-600">${item.precio} MXN</span>
                </span>
                <button
                  className="px-3 py-1 rounded text-white bg-red-500 font-bold hover:bg-red-700 transition"
                  onClick={() => quitarDelCarrito(item.id)}
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>
          <div className="text-right font-bold text-lg text-cyan-800 mb-6">
            Total: ${total} MXN
          </div>
          <div className="flex gap-4 mb-4">
            <button
              className="px-6 py-2 rounded text-white bg-emerald-500 font-bold hover:bg-emerald-700 transition"
              onClick={limpiarCarrito}
            >
              Vaciar carrito
            </button>
            <button
              className="px-6 py-2 rounded text-white bg-gradient-to-r from-cyan-600 to-emerald-500 font-bold hover:bg-emerald-600 transition"
              onClick={() => alert('Integración de pago próximamente')}
            >
              Pagar
            </button>
          </div>
          <button
            className="mt-2 px-6 py-2 rounded text-white bg-gray-500 font-bold hover:bg-gray-800 transition"
            onClick={onRegresar}
          >
            ← Regresar al panel
          </button>
        </>
      )}
    </motion.div>
  );
}
