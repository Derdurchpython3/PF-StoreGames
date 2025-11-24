// p_server/DB/connect.js - CONEXIÓN COMPLETA A MYSQL
const mysql = require("mysql2")

console.log('🔍 Iniciando conexión a MySQL...')

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'store_game',
    port: 3306,
    connectTimeout: 10000
})

conn.connect((err) => {
    if(err){
        console.error('❌ ERROR conectando a MySQL:', err.message)
        console.log('💡 SOLUCIONES:')
        console.log('   1. Verifica que MySQL esté ejecutándose')
        console.log('   2. Revisa usuario y contraseña')
        console.log('   3. Ejecuta el script SQL en MySQL Workbench')
        console.log('   4. Verifica que la BD "store_game" exista')
        return
    }
    
    console.log('✅ CONEXIÓN EXITOSA a MySQL Workbench')
    console.log('📊 Base de datos: store_game')
    console.log('🌐 Servidor listo para recibir formularios')
})

// Manejar errores después de la conexión
conn.on('error', (err) => {
    console.error('❌ Error de MySQL:', err.message)
})

module.exports = conn