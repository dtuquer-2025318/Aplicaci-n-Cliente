import pg from 'pg';
const { Pool } = pg;

// Configuración de la conexión adaptada al entorno local
export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'gestion_clientes', // La base de datos que creaste en pgAdmin
    password: 'admin', // <-- REEMPLAZA ESTO CON TU CONTRASEÑA REAL
    port: 5432,
});