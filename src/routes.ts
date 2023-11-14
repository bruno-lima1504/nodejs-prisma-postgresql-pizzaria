import { Router } from 'express';
import  multer  from 'multer';

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUSerController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';

import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryControler } from './controllers/category/ListCategoryController';

import { CreateProductController } from './controllers/product/CreateProductController';
import { ListByCategoryController } from './controllers/product/ListByCategoryController';

import { isAuthenticated } from './middlewares/isAuthenticated';

import uploadConfig from './config/multer'

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"))

// -- ROTAS USER --
router.post('/users', new CreateUserController().handle );

router.post('/session', new AuthUSerController().handle);

router.get('/me', isAuthenticated, new DetailUserController().handle );

// -- ROTAS CATEGORY --

router.post('/category', isAuthenticated, new CreateCategoryController().handle);

router.get('/category', isAuthenticated, new ListCategoryControler().handle);

// -- ROTAS PRODUCT --

router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle);

router.get('/product/category', isAuthenticated, new ListByCategoryController().handle);

export { router };