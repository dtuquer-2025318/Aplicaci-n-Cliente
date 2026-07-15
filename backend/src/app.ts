import express, { Application } from 'express';
import cors from 'cors';
import clienteRoutes from './routes/cliente.routes';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Importante para permitir que web-clientes acceda a la API
app.use(express.json());

app.use('/api/clientes', clienteRoutes);

app.listen(PORT, () => {
  console.log(`[ms-clientes] corriendo en http://localhost:${PORT}`);
});