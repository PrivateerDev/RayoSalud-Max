import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Facebook, Instagram, Twitter, HeartPulse } from 'lucide-react'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

// Sidebar elegante y expresivo
function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col justify-between w-80 px-8 py-12 mt-12 mb-12 rounded-2xl shadow-2xl backdrop-blur-2xl bg-gradient-to-b from-emerald-100/80 via-white/40 to-cyan-50/70 border border-emerald-200/60">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h2 className="text-3xl font-extrabold text-emerald-800 mb-4 drop-shadow-md tracking-tight">
          Conecta con nosotros
        </h2>
        <p className="text-emerald-700 text-base italic font-medium leading-snug">
          Síguenos para conocer nuestras últimas novedades y consejos de salud.
        </p>
        <div className="flex flex-col gap-3 mt-6 text-emerald-800 font-medium text-sm">
          {[
            { name: 'Facebook', url: 'https://facebook.com/rayosalud', icon: <Facebook size={18} /> },
            { name: 'Instagram', url: 'https://instagram.com/rayosalud', icon: <Instagram size={18} /> },
            { name: 'X (Twitter)', url: 'https://x.com/rayosalud', icon: <Twitter size={18} /> },
          ].map((link) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.07, color: '#047857' }}
              className="flex items-center gap-2 hover:text-emerald-900 transition-all duration-300"
            >
              <span className="text-emerald-600">{link.icon}</span> {link.name}
            </motion.a>
          ))}
        </div>
      </motion.div>
      <div className="border-t border-emerald-300/60 my-8"></div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-center text-base text-emerald-900 leading-relaxed font-medium"
      >
        <p className="font-semibold text-emerald-800 mb-3 text-lg">
          Contáctanos 💬
        </p>
        <p>📞 +52 800 123 4567</p>
        <p>✉️ contacto@rayosalud.com</p>
        <motion.p
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-sm text-emerald-600 mt-4 italic font-semibold"
        >
          Tu salud, en buenas manos 🌿
        </motion.p>
      </motion.div>
    </aside>
  )
}

// Panel de bienvenida mejorado visualmente
function WelcomePanel() {
  const phrases = [
    '✨ ¡Bienvenido a RayoSalud! ✨',
    'Has iniciado sesión correctamente. ✅',
    '🩻 Accede a tus estudios, resultados y servicios médicos en un solo lugar.',
  ]
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-lg w-full text-center flex flex-col items-center"
    >
      <AnimatePresence mode="wait">
        <motion.h1
          key={index}
          initial={{ opacity: 0, y: 15, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-black text-emerald-900 mb-8 tracking-tight drop-shadow-lg"
        >
          {phrases[index]}
        </motion.h1>
      </AnimatePresence>
      <motion.div
        key={`box-${index}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-emerald-50 to-cyan-50 border border-emerald-200 rounded-3xl p-8 shadow-xl backdrop-blur-lg hover:shadow-emerald-300/70 transition-all duration-400"
      >
        <motion.div
          initial={{ rotate: -10, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center mb-5"
        >
          <HeartPulse size={52} className="text-emerald-600" />
        </motion.div>
        <p className="text-emerald-800 font-semibold leading-relaxed text-lg mb-6">
          {phrases[(index + 1) % phrases.length]}
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="px-7 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-cyan-500 text-white font-bold text-lg shadow-lg hover:shadow-cyan-400/40 transition-all duration-300"
        >
          Ir al panel principal →
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

// App principal con navegación Login/Register
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  const handleLogin = () => setIsAuthenticated(true)
  const handleRegisterSuccess = () => setShowRegister(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-white to-emerald-100 flex flex-col md:flex-row font-sans">
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        {!isAuthenticated ? (
          <AnimatePresence mode="wait">
            {!showRegister ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <LoginPage
                  onLogin={handleLogin}
                  onShowRegister={() => setShowRegister(true)}
                />
              </motion.div>
            ) : (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <RegisterPage
                  onRegister={handleRegisterSuccess}
                  onBackToLogin={() => setShowRegister(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        ) : (
          <WelcomePanel />
        )}
      </main>
      <Sidebar />
    </div>
  )
}

export default App
