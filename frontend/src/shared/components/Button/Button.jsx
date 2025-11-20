import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, LogIn } from 'lucide-react'

function LoginPage({ onLogin, onShowRegister }) {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMsg('')

    try {
      const res = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, password: pass }),
      })
      const resultado = await res.text()

      if (resultado === 'Login exitoso') {
        setMsg('')
        onLogin()
      } else {
        setMsg('⚠️ Credenciales incorrectas. Intenta nuevamente.')
      }
    } catch (error) {
      setMsg('❌ Error al conectar con el servidor.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 via-white to-emerald-50 px-4 py-10 relative overflow-hidden font-['Poppins']">
      {/* Fondo decorativo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#d1fae5,_transparent_40%),_radial-gradient(circle_at_bottom_left,_#a7f3d0,_transparent_50%)]"
      />

      {/* Contenedor principal */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 bg-white/90 backdrop-blur-xl border border-emerald-100 shadow-2xl rounded-3xl p-10 w-full max-w-md"
      >
        {/* Encabezado */}
        <div className="text-center mb-10">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-extrabold text-emerald-700 tracking-tight drop-shadow-sm"
          >
            RayoSalud
          </motion.h1>
          <p className="text-emerald-600 text-sm italic mt-1">
            Bienestar y Confianza
          </p>
        </div>

        {/* Título */}
        <h2 className="text-xl font-semibold text-emerald-700 mb-6 text-center">
          Iniciar Sesión
        </h2>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Usuario */}
          <div>
            <label className="block text-emerald-800 text-sm font-medium mb-1">
              Usuario
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all placeholder:text-emerald-400"
              placeholder="Tu nombre de usuario"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </div>

          {/* Contraseña (más corta y estilizada) */}
          <div>
            <label className="block text-emerald-800 text-sm font-medium mb-1">
              Contraseña
            </label>
            <div className="flex justify-center">
              <div className="flex items-center w-[70%] border border-emerald-300 rounded-lg focus-within:ring-2 focus-within:ring-emerald-400 bg-white shadow-sm overflow-hidden">
                <input
                  type={showPass ? 'text' : 'password'}
                  className="flex-grow px-3 py-2 focus:outline-none placeholder:text-emerald-400 text-emerald-900"
                  placeholder="••••••••"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="px-3 py-2 text-emerald-600 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border-l border-emerald-200 transition-all flex items-center justify-center"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Botón principal */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-bold text-white text-lg rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
              loading
                ? 'bg-emerald-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:shadow-lg'
            }`}
          >
            {loading ? (
              'Verificando...'
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                Entrar
              </>
            )}
          </motion.button>

          {/* Mensaje dinámico */}
          <AnimatePresence mode="wait">
            {msg && (
              <motion.p
                key={msg}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className={`text-center text-sm mt-3 font-medium ${
                  msg.includes('exitoso') ? 'text-emerald-600' : 'text-red-600'
                }`}
              >
                {msg}
              </motion.p>
            )}
          </AnimatePresence>
        </form>

        {/* Botón para registro */}
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={onShowRegister}
            className="font-semibold text-emerald-600 hover:text-emerald-900 underline transition-colors"
          >
            Crear cuenta
          </button>
        </div>

        {/* Footer */}
        <footer className="text-xs text-gray-500 text-center border-t border-emerald-100 pt-8 mt-14 leading-relaxed">
          © 2025{' '}
          <span className="font-semibold text-emerald-700">RayoSalud</span>
          <br />
          Todos los derechos reservados.
        </footer>
      </motion.div>
    </div>
  )
}

export default LoginPage
