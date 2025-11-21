import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Facebook, Instagram, Twitter, HeartPulse, ShoppingCart, ListChecks, LogOut, ClipboardCheck } from 'lucide-react'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import CatalogoPage from './pages/CatalogoPage'
import CarritoPage from './pages/CarritoPage' // <-- IMPORTANTE

function Sidebar() {
  // ... igual que tu código original ...
}

function WelcomePanel({ onIrPanel }) {
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
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-lg w-full text-center flex flex-col items-center">
      <AnimatePresence mode="wait">
        <motion.h1 key={index} initial={{ opacity: 0, y: 15, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }} transition={{ duration: 0.8 }} className="text-4xl md:text-5xl font-black text-emerald-900 mb-8 tracking-tight drop-shadow-lg">
          {phrases[index]}
        </motion.h1>
      </AnimatePresence>
      <motion.div key={`box-${index}`} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="bg-gradient-to-br from-emerald-50 to-cyan-50 border border-emerald-200 rounded-3xl p-8 shadow-xl">
        <motion.div initial={{ rotate: -10, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 0.7 }} className="flex justify-center mb-5">
          <HeartPulse size={52} className="text-emerald-600" />
        </motion.div>
        <p className="text-emerald-800 font-semibold leading-relaxed text-lg mb-6">{phrases[(index + 1) % phrases.length]}</p>
        <button className="px-7 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-cyan-500 text-white font-bold text-lg shadow-lg hover:shadow-cyan-400/40 transition-all duration-300" onClick={onIrPanel}>
          Ir al panel principal →
        </button>
      </motion.div>
    </motion.div>
  )
}

// Panel Principal rediseñado
function PrincipalPanel({ onGoCatalogo, onGoAdmin, onCerrarSesion, onGoCarrito }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-xl w-full mx-auto p-10 bg-white bg-opacity-95 rounded-3xl shadow-2xl border border-emerald-200 mt-10 flex flex-col items-center"
    >
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl font-black text-emerald-900 mb-10 tracking-tight drop-shadow-lg text-center"
      >
        Panel principal
      </motion.h2>
      <div className="grid grid-cols-2 gap-6 mb-8 w-full max-w-md">
        <button
          className="flex flex-col items-center gap-2 rounded-2xl px-8 py-7 font-bold bg-gradient-to-br from-cyan-400 via-emerald-400 to-cyan-500 text-white shadow-lg hover:shadow-emerald-300 transition focus:outline-none"
          onClick={onGoCatalogo}
        >
          <ListChecks size={32} className="mb-1" />
          <span className="text-lg mt-1">Catálogo <br/> de estudios</span>
        </button>
        <button
          className="flex flex-col items-center gap-2 rounded-2xl px-8 py-7 font-bold bg-gradient-to-br from-emerald-400 via-cyan-400 to-emerald-600 text-white shadow-lg hover:shadow-cyan-300 transition focus:outline-none"
          onClick={onGoCarrito}
        >
          <ShoppingCart size={32} className="mb-1" />
          <span className="text-lg mt-1">Carrito</span>
        </button>
        <button
          className="flex flex-col items-center gap-2 rounded-2xl px-8 py-7 font-bold bg-gradient-to-br from-cyan-600 to-cyan-400 text-white shadow-lg hover:shadow-cyan-400 transition focus:outline-none"
          onClick={onGoAdmin}
        >
          <ClipboardCheck size={32} className="mb-1" />
          <span className="text-lg mt-1">Panel <br/> administrativo</span>
        </button>
        <button
          className="flex flex-col items-center gap-2 rounded-2xl px-8 py-7 font-bold bg-gray-200 text-emerald-900 shadow-lg border border-emerald-200 hover:bg-gray-300 transition focus:outline-none"
          onClick={onCerrarSesion}
        >
          <LogOut size={32} className="mb-1" />
          <span className="text-lg mt-1">Regresar <br/> al login</span>
        </button>
      </div>
      <p className="text-emerald-700 font-bold text-lg mt-2 text-center">
        Selecciona una opción para continuar. <br/>
        <span className="font-medium text-emerald-600">Usa el panel para navegar y administrar tus estudios.</span>
      </p>
    </motion.div>
  )
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [enPanelPrincipal, setEnPanelPrincipal] = useState(false)
  const [ruta, setRuta] = useState('') // '', 'catalogo', 'admin', 'carrito'

  // LOG PARA DEPURAR FLUJO DE ESTADO
  console.log({ isAuthenticated, ruta, enPanelPrincipal, showRegister })

  const handleCerrarSesion = () => {
    setIsAuthenticated(false)
    setShowRegister(false)
    setEnPanelPrincipal(false)
    setRuta('')
  }
  const handleGoCatalogo = () => setRuta('catalogo')
  const handleGoAdmin = () => setRuta('admin')
  const handleGoCarrito = () => setRuta('carrito')
  const handleRegresarPanel = () => setRuta('')

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-white to-emerald-100 flex flex-col md:flex-row font-sans">
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        {!isAuthenticated ? (
          <AnimatePresence mode="wait">
            {!showRegister ? (
              <motion.div key="login" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
                <LoginPage onLogin={() => setIsAuthenticated(true)} onShowRegister={() => setShowRegister(true)} />
              </motion.div>
            ) : (
              <motion.div key="register" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <RegisterPage onRegister={() => setShowRegister(false)} onBackToLogin={() => setShowRegister(false)} />
              </motion.div>
            )}
          </AnimatePresence>
        ) : ruta === 'catalogo' ? (
          <CatalogoPage onRegresar={handleRegresarPanel} />
        ) : ruta === 'admin' ? (
          <PrincipalPanel
            onGoCatalogo={handleGoCatalogo}
            onGoAdmin={() => alert('Próximamente')}
            onCerrarSesion={handleCerrarSesion}
            onGoCarrito={handleGoCarrito}
          />
        ) : ruta === 'carrito' ? (
          <CarritoPage onRegresar={handleRegresarPanel} />
        ) : enPanelPrincipal ? (
          <PrincipalPanel
            onGoCatalogo={handleGoCatalogo}
            onGoAdmin={handleGoAdmin}
            onCerrarSesion={handleCerrarSesion}
            onGoCarrito={handleGoCarrito}
          />
        ) : (
          <WelcomePanel onIrPanel={() => setEnPanelPrincipal(true)} />
        )}
      </main>
      <Sidebar />
    </div>
  )
}

export default App
