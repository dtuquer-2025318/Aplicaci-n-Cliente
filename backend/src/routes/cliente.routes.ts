import { Router } from 'express';
import { ClienteController } from '../controllers/cliente.controller';

const router = Router();
const controller = new ClienteController();

router.get('/', controller.listarClientes.bind(controller));
router.post('/', controller.registrarCliente.bind(controller));

export default router;