import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'

// Datos del catálogo: radiográficos y clínicos separados
const radiograficos = [
  { id: 1, nombre: "Radiografía de tórax", descripcion: "Imagen detallada del área pulmonar, corazón y cavidad torácica.", precio: 650, warning: "Evita este examen durante el embarazo. Si tienes marcapasos o dispositivos internos, informa a tu médico." },
  { id: 2, nombre: "Radiografía de columna", descripcion: "Estudio de vértebras, disco intervertebral y alineación.", precio: 780, warning: "Las mujeres embarazadas deben evitarlo salvo que sea estrictamente necesario." },
  { id: 3, nombre: "Radiografía dental", descripcion: "Imagen para diagnóstico y planificación de tratamientos bucodentales.", precio: 400, warning: "No recomendado durante el embarazo. El protector de plomo es obligatorio." },
  { id: 4, nombre: "Radiografía de extremidades", descripcion: "Diagnóstico de fracturas, lesiones y estudio óseo de brazos o piernas.", precio: 580, warning: "Comunica cualquier prótesis interna antes del estudio." },
]

const clinicos = [
  { id: 5, nombre: "Hemograma completo", descripcion: "Evaluación integral de las células sanguíneas para prevenir y diagnosticar enfermedades.", precio: 350, warning: "Este estudio puede requerir ayuno prolongado y está contraindicado si presentas deshidratación severa o infecciones agudas." },
  { id: 6, nombre: "Perfil lipídico", descripcion: "Mide colesterol y triglicéridos para evaluar riesgos cardiacos.", precio: 400, warning: "Debes estar en ayunas de 8-12 horas. No recomendado para menores de 5 años. Consulta restricciones con tu médico." },
  { id: 7, nombre: "Electrocardiograma", descripcion: "Estudio gráfico de la actividad eléctrica del corazón.", precio: 350, warning: "Evita consumir cafeína o realizar ejercicio antes del estudio. Notifica si tomas medicamentos cardiovasculares." },
]

export default function CatalogoPage({ onRegresar }) {
  const [selected, setSelected] = useState(null)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-2 bg-gradient-to-br from-cyan-100 to-emerald-50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full mx-auto bg-white bg-opacity-95 rounded-3xl shadow-2xl px-4 py-8"
      >
        {/* Botón Regresar */}
        <div className="flex items-center mb-6">
          <button
            onClick={onRegresar}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-emerald-500 text-white font-bold shadow-lg hover:bg-red-700 transition-all"
            style={{ minWidth: 120 }}
          >
            ← Regresar
          </button>
          <h2 className="flex-1 text-center text-3xl md:text-4xl font-black text-emerald-700 drop-shadow-md">
            Catálogo de estudios
          </h2>
        </div>
        
        {/* Radiografías */}
        <div className="mb-10">
          <h3 className="text-2xl md:text-3xl font-black text-cyan-700 border-b-2 border-cyan-300 pb-2 mb-4">
            Estudios Radiográficos
          </h3>
          <div className="grid gap-8 md:grid-cols-2">
            {radiograficos.map((e) => (
              <motion.div
                key={e.id}
                whileHover={{ scale: 1.04, boxShadow: "0 2px 32px #0ea5e9" }}
                className="cursor-pointer border border-cyan-200 bg-gradient-to-br from-cyan-50 to-emerald-50 rounded-xl p-6 shadow-md hover:shadow-cyan-400/60 transition flex flex-col"
                onClick={() => setSelected(e)}
              >
                <h4 className="text-lg font-black text-emerald-900 mb-2">{e.nombre}</h4>
                <p className="text-emerald-700 mb-2 font-medium">{e.descripcion}</p>
                <div className="flex justify-between items-center mt-auto pt-2">
                  <span className="text-base font-bold text-cyan-800 bg-cyan-100 rounded px-2 py-1 shadow w-fit">
                    ${e.precio} MXN
                  </span>
                  <span className="inline-flex items-center gap-1 text-red-600 text-sm font-bold">
                    <AlertTriangle className="w-5 h-5" />
                    Advertencia
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Separación Grande: Estudios clínicos */}
        <div className="my-8 w-full flex items-center justify-center">
          <span className="px-9 py-2 rounded-xl bg-emerald-200 font-black text-emerald-700 text-2xl shadow border border-emerald-300">
            Estudios clínicos
          </span>
        </div>

        {/* Estudios clínicos */}
        <div>
          <div className="grid gap-8 md:grid-cols-2">
            {clinicos.map((e) => (
              <motion.div
                key={e.id}
                whileHover={{ scale: 1.04, boxShadow: "0 2px 32px #38d399" }}
                className="cursor-pointer border border-emerald-200 bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-xl p-6 shadow-md hover:shadow-emerald-300 transition flex flex-col"
                onClick={() => setSelected(e)}
              >
                <h4 className="text-lg font-black text-cyan-900 mb-2">{e.nombre}</h4>
                <p className="text-cyan-700 mb-2 font-medium">{e.descripcion}</p>
                <div className="flex justify-between items-center mt-auto pt-2">
                  <span className="text-base font-bold text-emerald-800 bg-emerald-100 rounded px-2 py-1 shadow w-fit">
                    ${e.precio} MXN
                  </span>
                  <span className="inline-flex items-center gap-1 text-orange-500 text-sm font-bold">
                    <AlertTriangle className="w-5 h-5" />
                    Advertencia
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* MODAL emergente centrado con detalles */}
        <AnimatePresence>
          {selected && (
            <motion.div
              className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ backdropFilter: "blur(3px)" }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.2 }}
                className="relative bg-white rounded-xl max-w-md w-full p-8 shadow-2xl border border-emerald-100 flex flex-col"
              >
                <button
                  className="absolute top-4 right-4 text-emerald-600 hover:text-cyan-700 font-bold text-xl"
                  onClick={() => setSelected(null)}
                  aria-label="Cerrar"
                >
                  ×
                </button>
                <h3 className="text-2xl font-black text-emerald-800 mb-2">{selected.nombre}</h3>
                <p className="mb-2 text-emerald-700 font-medium">{selected.descripcion}</p>
                <span className="mb-4 text-cyan-700 font-bold text-lg block">Precio: ${selected.precio} MXN</span>
                <div className="border-l-4 border-orange-400 bg-orange-50 px-4 py-3 text-orange-700 font-semibold rounded">
                  <AlertTriangle className="inline-block mr-2 w-5 h-5" />
                  {selected.warning}
                </div>
                <button
                  className="mt-6 w-full px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-bold shadow hover:bg-emerald-700 transition-all"
                  onClick={() => setSelected(null)}
                >
                  Cerrar
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
