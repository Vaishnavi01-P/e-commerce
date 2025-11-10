import { Router } from 'express';
import { listProducts, getProductById } from '../controllers/productsController';

const router = Router();

router.get('/', listProducts);
router.get('/:id', getProductById);

export default router;
