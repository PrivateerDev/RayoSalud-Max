import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, LogIn } from 'lucide-react'

function LoginPage({ onLogin, onShowRegister }) {
  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")
  const [msg, setMsg] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const isValidEmail = user.match(/^.+@.+\..+$/)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: user, password: pass }),
      });
      const resultado = await res.text();
      if (resultado.startsWith("¡Bienvenido")) {
        setMsg(resultado);
        setTimeout(() => onLogin(), 800);
      } else {
        setMsg("Credenciales inválidas");
        setTimeout(() => setMsg(""), 4000);
      }
    } catch (error) {
      setMsg("No se pudo conectar con el servidor");
      console.error("Error de conexión:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 via-white to-emerald-50 overflow-hidden font-['Poppins']">
      {/* Fondo dinámico */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#a7f3d0,_transparent_40%),_radial-gradient(circle_at_bottom_right,_#6ee7b7,_transparent_40%)] animate-pulse"
      />
      {/* Contenedor principal */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 bg-white/90 backdrop-blur-2xl shadow-2xl rounded-3xl p-12 w-full max-w-md border border-emerald-200"
      >
        {/* Logo */}
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold bg-gradient-to-r from-emerald-500 via-emerald-700 to-teal-600 bg-clip-text text-transparent text-center drop-shadow-sm tracking-wide font-['Raleway']"
        >
          ⚡ RayoSalud
        </motion.h1>

        <h2 className="text-2xl font-semibold text-emerald-700 mb-6 text-center">
          Acceso a la plataforma. Inicia sesión para continuar ⤵
        </h2>

        <form onSubmit={handleSubmit} className="space-y-7">
          {/* Correo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label
              htmlFor="correo"
              className="block text-sm font-semibold text-emerald-800 mb-2 tracking-wide"
            >
              📧 Correo electrónico
            </label>
            <input
              id="correo"
              type="email"
              className={`w-full px-4 py-3 rounded-lg border ${
                isValidEmail || !user ? "border-emerald-300" : "border-red-400"
              } focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all placeholder:text-emerald-400 text-emerald-900 shadow-sm`}
              placeholder="ejemplo@correo.com"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />
            {!isValidEmail && user && (
              <span className="text-xs text-red-500 mt-1 block">
                Formato de correo inválido
              </span>
            )}
          </motion.div>

          {/* Contraseña */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center"
          >
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-emerald-800 mb-2 tracking-wide self-start"
            >
              Contraseña 🔐
            </label>
            <div className="flex items-center w-4/5 border border-emerald-300 rounded-lg focus-within:ring-2 focus-within:ring-emerald-400 shadow-sm bg-white">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="flex-grow px-4 py-3 rounded-l-lg focus:outline-none placeholder:text-emerald-400 text-emerald-900"
                placeholder="••••••••"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="px-4 py-3 text-emerald-600 hover:text-emerald-800 border-l border-emerald-200 bg-emerald-50 hover:bg-emerald-100 rounded-r-lg transition-all flex items-center justify-center"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </motion.div>

          {/* Botón principal */}
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(16, 185, 129, 0.5)",
            }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading || !isValidEmail}
            className={`w-full py-3 font-bold text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
              loading
                ? "bg-emerald-400 cursor-not-allowed"
                : "bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:shadow-xl"
            }`}
          >
            {loading ? (
              "Accediendo..."
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                Entrar
              </>
            )}
          </motion.button>

          {/* Mensaje dinámico */}
          {msg && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`text-center py-2 rounded text-sm mt-3 ${
                msg.includes("Bienvenido")
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {msg}
            </motion.div>
          )}

          {/* Enlaces secundarios */}
          <div className="mt-12 text-center text-sm text-gray-500 space-y-3">
            <a href="#" className="block hover:text-emerald-600 hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
            <button
              type="button"
              onClick={onShowRegister}
              className="block font-semibold text-emerald-600 hover:text-emerald-700 hover:underline w-full px-2 py-1"
            >
              Crear cuenta
            </button>
            <div className="h-8" />
          </div>
        </form>

        {/* Footer */}
        <footer className="text-xs text-gray-500 text-center border-t border-emerald-100 pt-6 mt-6">
          © 2025 <span className="font-semibold text-emerald-700">RayoSalud</span>
          <br />
          Todos los derechos reservados.
        </footer>
      </motion.div>
    </div>
  );
}

export default LoginPage
