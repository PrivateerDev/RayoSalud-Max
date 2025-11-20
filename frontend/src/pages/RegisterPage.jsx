import { useState } from 'react'
import { motion } from 'framer-motion'
import { UserPlus, Mail, Lock, User, ArrowLeft, AlertCircle } from 'lucide-react'

function RegisterPage({ onRegister, onBackToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Limpiar error del campo cuando el usuario escribe
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    // Validación de nombre
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido'
    }
    
    // Validación de username
    if (!formData.username.trim()) {
      newErrors.username = 'El usuario es requerido'
    } else if (formData.username.length < 3) {
      newErrors.username = 'El usuario debe tener al menos 3 caracteres'
    } else if (formData.username.length > 20) {
      newErrors.username = 'El usuario no puede tener más de 20 caracteres'
    }
    
    // Validación de email
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }
    
    // Validación de contraseña
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida'
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres'
    }
    
    // Validación de confirmación de contraseña
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Debes confirmar tu contraseña'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    
    if (!validateForm()) {
      return
    }
    
    setLoading(true)
    
    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setMessage('✅ Registro exitoso. Redirigiendo al login...')
        setTimeout(() => {
          onRegister()
        }, 2000)
      } else {
        setMessage(`❌ ${data.message || 'Error en el registro'}`)
      }
    } catch (error) {
      setMessage('❌ Error de conexión con el servidor')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md"
    >
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-emerald-100">
        
        {/* Header con animación */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <motion.div 
            className="flex justify-center mb-4"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <UserPlus size={48} className="text-emerald-600" />
          </motion.div>
          <h2 className="text-3xl font-bold text-emerald-900 mb-2">
            Crear Cuenta
          </h2>
          <p className="text-emerald-700 text-sm">
            Únete a RayoSalud hoy 🌿
          </p>
        </motion.div>

        {/* Mensaje de estado */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`mb-4 p-3 rounded-lg text-sm font-medium flex items-center gap-2 ${
              message.includes('✅')
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}
          >
            {!message.includes('✅') && <AlertCircle size={18} />}
            {message}
          </motion.div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Nombre completo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className="block text-emerald-900 font-semibold mb-2 text-sm">
              Nombre Completo
            </label>
            <div className="relative">
              <User size={20} className="absolute left-3 top-3 text-emerald-600" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all ${
                  errors.name 
                    ? 'border-red-400 focus:ring-2 focus:ring-red-500' 
                    : 'border-emerald-200 focus:ring-2 focus:ring-emerald-500'
                } focus:outline-none`}
                placeholder="Tu nombre completo"
              />
            </div>
            {errors.name && (
              <motion.p 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-600 text-xs mt-1 flex items-center gap-1"
              >
                <AlertCircle size={12} />
                {errors.name}
              </motion.p>
            )}
          </motion.div>

          {/* Usuario */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            <label className="block text-emerald-900 font-semibold mb-2 text-sm">
              Nombre de Usuario
            </label>
            <div className="relative">
              <User size={20} className="absolute left-3 top-3 text-emerald-600" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all ${
                  errors.username 
                    ? 'border-red-400 focus:ring-2 focus:ring-red-500' 
                    : 'border-emerald-200 focus:ring-2 focus:ring-emerald-500'
                } focus:outline-none`}
                placeholder="Nombre de usuario"
              />
            </div>
            {errors.username && (
              <motion.p 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-600 text-xs mt-1 flex items-center gap-1"
              >
                <AlertCircle size={12} />
                {errors.username}
              </motion.p>
            )}
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-emerald-900 font-semibold mb-2 text-sm">
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail size={20} className="absolute left-3 top-3 text-emerald-600" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all ${
                  errors.email 
                    ? 'border-red-400 focus:ring-2 focus:ring-red-500' 
                    : 'border-emerald-200 focus:ring-2 focus:ring-emerald-500'
                } focus:outline-none`}
                placeholder="tu@email.com"
              />
            </div>
            {errors.email && (
              <motion.p 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-600 text-xs mt-1 flex items-center gap-1"
              >
                <AlertCircle size={12} />
                {errors.email}
              </motion.p>
            )}
          </motion.div>

          {/* Contraseña */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
          >
            <label className="block text-emerald-900 font-semibold mb-2 text-sm">
              Contraseña
            </label>
            <div className="relative">
              <Lock size={20} className="absolute left-3 top-3 text-emerald-600" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all ${
                  errors.password 
                    ? 'border-red-400 focus:ring-2 focus:ring-red-500' 
                    : 'border-emerald-200 focus:ring-2 focus:ring-emerald-500'
                } focus:outline-none`}
                placeholder="Mínimo 6 caracteres"
              />
            </div>
            {errors.password && (
              <motion.p 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-600 text-xs mt-1 flex items-center gap-1"
              >
                <AlertCircle size={12} />
                {errors.password}
              </motion.p>
            )}
          </motion.div>

          {/* Confirmar contraseña */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-emerald-900 font-semibold mb-2 text-sm">
              Confirmar Contraseña
            </label>
            <div className="relative">
              <Lock size={20} className="absolute left-3 top-3 text-emerald-600" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all ${
                  errors.confirmPassword 
                    ? 'border-red-400 focus:ring-2 focus:ring-red-500' 
                    : 'border-emerald-200 focus:ring-2 focus:ring-emerald-500'
                } focus:outline-none`}
                placeholder="Repite tu contraseña"
              />
            </div>
            {errors.confirmPassword && (
              <motion.p 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-600 text-xs mt-1 flex items-center gap-1"
              >
                <AlertCircle size={12} />
                {errors.confirmPassword}
              </motion.p>
            )}
          </motion.div>

          {/* Botón de registro */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className={`w-full py-3 rounded-lg font-bold text-white text-lg shadow-lg transition-all duration-300 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-emerald-600 to-cyan-500 hover:shadow-emerald-400/40'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                Registrando...
              </span>
            ) : (
              'Crear Cuenta'
            )}
          </motion.button>
        </form>

        {/* Separador */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-emerald-200"></div>
          <span className="px-4 text-emerald-600 text-sm font-medium">o</span>
          <div className="flex-1 border-t border-emerald-200"></div>
        </div>

        {/* Link para volver al login */}
        <motion.button
          onClick={onBackToLogin}
          whileHover={{ scale: 1.02, x: -5 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 text-emerald-700 font-semibold hover:text-emerald-900 transition-colors py-2 rounded-lg hover:bg-emerald-50"
        >
          <ArrowLeft size={18} />
          Volver al Login
        </motion.button>
      </div>
    </motion.div>
  )
}

export default RegisterPage
