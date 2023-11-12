import { Router } from 'express';

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUSerController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';

import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryControler } from './controllers/category/ListCategoryController';

import { isAuthenticated } from './middlewares/isAuthenticated';

const router = Router();

// -- ROTAS USER --
router.post('/users', new CreateUserController().handle );

router.post('/session', new AuthUSerController().handle);

router.get('/me', isAuthenticated, new DetailUserController().handle );

// -- ROTAS CATEGORY --

router.post('/category', isAuthenticated, new CreateCategoryController().handle);

router.get('/category', isAuthenticated, new ListCategoryControler().handle);



export { router };