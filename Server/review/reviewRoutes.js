import {Router} from 'express'
import reviewControllers from './reviewControllers.js'


const router = Router()

router.post('/add',reviewControllers.addReview)

router.put('/delete/:id',reviewControllers.deleteReview)

router.put('/edit/:id',reviewControllers.updateReview)

router.get('/get/anime/:anime',reviewControllers.getReviewsofAnime)

router.get('/get/id/:id',reviewControllers.getReviewsbyUser)


export default router