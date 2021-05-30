const { Router } = require('express');
const router = Router();

const { get_tasks, get_task, add_task, edit_task, delete_task } = require('./controllers/tasks');

router.get('/tasks', get_tasks);
router.get('/tasks/:id', get_task);
router.post('/tasks', add_task);
router.put('/tasks/:id', edit_task);
router.delete('/tasks/:id', delete_task);

module.exports.api_router = router;
