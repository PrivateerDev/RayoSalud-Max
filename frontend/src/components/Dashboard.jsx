import { motion } from 'framer-motion';

function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-green-50 flex flex-col items-center justify-center px-6 py-12 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full bg-white shadow-lg rounded-2xl p-10 border border-green-100"
      >
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold text-green-700 mb-4 text-center font-display tracking-wide"
        >
          🌿 ¡Bienvenido a <span className="text-green-600">RayoSalud</span>!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg text-gray-700 mb-8 text-center italic"
        >
          “Tu bienestar es nuestra prioridad. Gestiona pacientes, citas y atención médica con facilidad.”
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <motion.div
            whileHover={{ scale: 1.05, y: -4 }}
            className="bg-green-100 rounded-xl p-6 shadow-md hover:shadow-lg cursor-pointer transition-all border border-green-200"
          >
            <h3 className="text-green-800 font-bold text-xl mb-2 text-center">📋 Pacientes</h3>
            <p className="text-sm text-green-900 text-center">
              Registra nuevos pacientes, gestiona su información y accede a su historial clínico.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -4 }}
            className="bg-green-100 rounded-xl p-6 shadow-md hover:shadow-lg cursor-pointer transition-all border border-green-200"
          >
            <h3 className="text-green-800 font-bold text-xl mb-2 text-center">📅 Citas</h3>
            <p className="text-sm text-green-900 text-center">
              Programa y administra las citas médicas con un control total y visualización rápida.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -4 }}
            className="bg-green-100 rounded-xl p-6 shadow-md hover:shadow-lg cursor-pointer transition-all border border-green-200"
          >
            <h3 className="text-green-800 font-bold text-xl mb-2 text-center">📑 Historial</h3>
            <p className="text-sm text-green-900 text-center">
              Consulta los tratamientos, diagnósticos y evolución de cada paciente.
            </p>
          </motion.div>
        </div>
      </motion.div>

      <footer className="mt-10 text-xs text-green-700 text-center">
        © 2025 <span className="font-semibold">RayoSalud</span>. Todos los derechos reservados.
      </footer>
    </div>
  );
}

export default Dashboard;
