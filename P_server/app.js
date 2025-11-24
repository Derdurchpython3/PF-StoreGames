// p_server/app.js - SERVIDOR PRINCIPAL CORREGIDO
const express = require('express')
const cors = require('cors')
const path = require('path')
const userRoutes = require('./routes/user')

const app = express()

// Middlewares
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Servir archivos estáticos desde p_visual
app.use(express.static(path.join(__dirname, '../p_visual')))

// Rutas de API
app.use('/api', userRoutes)

// Ruta de salud
app.get('/health', (req, res) => {
  res.json({ 
    success: true,
    status: '✅ Servidor funcionando correctamente',
    database: 'store_game',
    timestamp: new Date().toISOString()
  })
})

// Rutas para páginas HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../p_visual/paginas/inicio.html'))
})

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../p_visual/paginas/login.html'))
})

app.get('/registro', (req, res) => {
  res.sendFile(path.join(__dirname, '../p_visual/paginas/registro.html'))
})

app.get('/inicio', (req, res) => {
  res.sendFile(path.join(__dirname, '../p_visual/paginas/inicio.html'))
})

// Manejo de rutas no encontradas - CORREGIDO
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Ruta no encontrada' 
  })
})

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('💥 Error global:', err)
  res.status(500).json({ 
    success: false, 
    message: 'Error interno del servidor' 
  })
})

// Iniciar servidor
const PORT = 3000
app.listen(PORT, () => {  
    console.log('🚀 SERVIDOR INICIADO CORRECTAMENTE')
    console.log(`📍 URL: http://localhost:${PORT}`)
    console.log(`📋 Health: http://localhost:${PORT}/health`)
    console.log(`👤 Registro: http://localhost:${PORT}/registro`)
    console.log(`🔐 Login: http://localhost:${PORT}/login`)
    console.log('🎯 Los formularios están listos para usar')
})

module.exports = app