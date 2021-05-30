const { Schema, model } = require('mongoose');

const task_schema = new Schema({
    text: {
        type: 'String',
        required: true,
        maxlength: 100
    },
    day: {
        type: 'String',
        required: false
    },
    reminder: {
        type: 'Boolean',
        required: false
    }
});

const task = model('tasks', task_schema);
module.exports.Task = task;
