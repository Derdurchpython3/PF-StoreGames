// routes/user.js - VERSIÓN MEJORADA CON MENSAJES EMERGENTES
const express = require('express')
const router = express.Router()
const conn = require('../DB/connect')

// POST - Registro de nuevo usuario (para registro.html)
router.post('/register', (req, res) => {
  const { 
    Nombres, 
    Apellidos, 
    tipo_doc, 
    num_doc, 
    email, 
    telefono, 
    username, 
    password 
  } = req.body

  console.log('📨 DATOS RECIBIDOS:', {
    Nombres, Apellidos, tipo_doc, num_doc, email, username
  })

  // Validar datos requeridos
  if (!Nombres || !Apellidos || !tipo_doc || !num_doc || !email || !username || !password) {
    return res.status(400).json({
      success: false,
      message: '❌ Por favor, completa todos los campos obligatorios.'
    })
  }

  const sql = `
    INSERT INTO usuario 
    (nombres, apellidos, tipo_doc, num_doc, email, telefono, username, password, activo) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, true)
  `
  
  conn.query(sql, [
    Nombres, 
    Apellidos, 
    tipo_doc, 
    num_doc, 
    email, 
    telefono, 
    username, 
    password
  ], (err, result) => {
    if (err) {
      console.error('❌ ERROR en registro:', err.message)
      
      // Manejar errores de duplicados
      if (err.code === 'ER_DUP_ENTRY') {
        if (err.message.includes('email')) {
          return res.status(400).json({
            success: false,
            message: '❌ Este correo electrónico ya está registrado.'
          })
        } else if (err.message.includes('username')) {
          return res.status(400).json({
            success: false,
            message: '❌ Este nombre de usuario ya está en uso.'
          })
        } else if (err.message.includes('num_doc')) {
          return res.status(400).json({
            success: false,
            message: '❌ Este número de documento ya está registrado.'
          })
        }
      }
      
      return res.status(500).json({
        success: false,
        message: '❌ Error del servidor. Intenta nuevamente.'
      })
    }
    
    console.log('✅ USUARIO REGISTRADO - ID:', result.insertId)
    res.json({
      success: true,
      message: '✅ ¡Registro exitoso! Tus datos han sido guardados correctamente.',
      userId: result.insertId
    })
  })
})

// POST - Login de usuario (para login.html)
router.post('/login', (req, res) => {
  const { user, pass } = req.body

  console.log('🔐 INTENTO DE LOGIN:', { user })

  if (!user || !pass) {
    return res.status(400).json({
      success: false,
      message: '❌ Por favor, ingresa tu usuario/email y contraseña.'
    })
  }

  const sql = `
    SELECT id, nombres, apellidos, email, username 
    FROM usuario 
    WHERE (email = ? OR username = ?) AND password = ? AND activo = true
  `
  
  conn.query(sql, [user, user, pass], (err, results) => {
    if (err) {
      console.error('❌ ERROR en login:', err)
      return res.status(500).json({
        success: false,
        message: '❌ Error del servidor. Intenta nuevamente.'
      })
    }
    
    if (results.length === 0) {
      return res.status(401).json({
        success: false,
        message: '❌ Usuario o contraseña incorrectos.'
      })
    }
    
    console.log('✅ LOGIN EXITOSO para:', results[0].email)
    res.json({
      success: true,
      message: '✅ ¡Bienvenido de vuelta! Inicio de sesión exitoso.',
      user: results[0]
    })
  })
})

// GET - Obtener todos los usuarios
router.get('/users', (req, res) => {
  conn.query('SELECT id, nombres, apellidos, email, username, fecha_registro FROM usuario WHERE activo = true', (err, rows) => {
    if (err) {
      console.error('Error obteniendo usuarios:', err)
      return res.status(500).json({
        success: false,
        message: 'Error al obtener usuarios'
      })
    }
    res.json({
      success: true,
      users: rows
    })
  })
})

// Ruta de salud
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API de usuarios funcionando correctamente',
    timestamp: new Date().toISOString()
  })
})

module.exports = router