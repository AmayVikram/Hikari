import {Router} from 'express'
import userControllers from './userControllers.js'; // ✅ WITH .js


const router = Router()


router.post('/login',userControllers.login)

router.post('/signup',userControllers.signUp)

router.post('/updateWatched',userControllers.updateWatched)

router.post('/updateFavourites',userControllers.updateFavourites)

router.post('/updateWatchlater',userControllers.updateWatchLater)




export default router