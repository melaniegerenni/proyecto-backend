import { Router } from "express";
import logger from "../winston.config.js";

const router = Router();

router.get('/', (req, res) => {
    logger.fatal('Fatal')
    logger.error('Error')
    logger.warning('Warning')
    logger.info('Info')
    logger.http('Http')
    logger.debug('debug') 
    res.send("Logger test")
})

export default router;