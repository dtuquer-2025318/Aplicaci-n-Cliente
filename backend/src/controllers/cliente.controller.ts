import type { Request, Response } from 'express';
import { pool } from '../persistence/database.js'; // Obligatorio .js por NodeNext
import type { Cliente } from '../models/cliente.model.js'; // Obligatorio .js por NodeNext

export class ClienteController {
  
  public async listarClientes(req: Request, res: Response): Promise<void> {
    try {
      const queryText = 'SELECT codigo_Cliente, nombre_Cliente, direccion_Cliente, telefono FROM clientes';
      const result = await pool.query(queryText);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error al listar clientes:', error);
      res.status(500).json({ message: 'Error interno del servidor al recuperar los clientes.' });
    }
  }

  public async registrarCliente(req: Request, res: Response): Promise<void> {
    try {
      const { codigo_Cliente, nombre_Cliente, direccion_Cliente, telefono }: Cliente = req.body;

      if (!codigo_Cliente || !nombre_Cliente || !direccion_Cliente || !telefono) {
        res.status(400).json({ message: 'Todos los campos son obligatorios.' });
        return;
      }

      const queryText = `
        INSERT INTO clientes (codigo_Cliente, nombre_Cliente, direccion_Cliente, telefono) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *
      `;
      const values = [codigo_Cliente.trim(), nombre_Cliente.trim(), direccion_Cliente.trim(), telefono.trim()];
      
      const result = await pool.query(queryText, values);
      
      res.status(201).json({
        message: 'Cliente registrado exitosamente.',
        cliente: result.rows[0]
      });
    } catch (error: any) {
      console.error('Error al registrar cliente:', error);
      if (error.code === '23505') {
        res.status(409).json({ message: 'El código de cliente ya se encuentra registrado.' });
        return;
      }
      res.status(500).json({ message: 'Error interno del servidor.' });
    }
  }
}