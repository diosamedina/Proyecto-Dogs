const { Router } = require('express');
const { getTemperamentsHandler } = require('../handlers/temperamentsHandler');

const temperamentsRouter = Router();

temperamentsRouter.get('/', getTemperamentsHandler);

module.exports = temperamentsRouter;