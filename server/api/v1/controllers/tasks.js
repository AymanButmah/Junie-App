const { Task } = require('../models/task');

module.exports.get_tasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json(tasks);
    } catch (e) {
        console.log(e);
        res.status(500).send('There was an error retrieving tasks. Please try again later.');
    }
}

module.exports.get_task = async (req, res) => {
    try {
        const id = req.params.id;
        const task = await Task.find({ _id: id });
        res.status(200).send(task[0]);
    } catch (e) {
        console.log(e);
        res.status(500).send('There was an error retrieving that task. Please try again later.');
    }
}

module.exports.add_task = async (req, res) => {
    try {
        const new_task = new Task(req.body);
        const inserted_task = await new_task.save();
        res.status(200).send(inserted_task);
    } catch (e) {
        console.log(e);
        res.status(500).send('There was an error adding the task. Please try again later.');
    }
}

module.exports.edit_task = async (req, res) => {
    try {
        const id = req.params.id;
        const updated_task = await Task.findByIdAndUpdate(id, { reminder: req.body.reminder }, { useFindAndModify: false, new: true });
        res.status(200).send(updated_task);
    } catch (e) {
        console.log(e);
        res.status(500).send('There was an error editing the task. Please try again later.');
    }
}

module.exports.delete_task = async (req, res) => {
    try {
        const id = req.params.id;
        await Task.findByIdAndDelete({ _id: id });
        res.status(200).send();
    } catch (e) {
        console.log(e);
        res.status(500).send('There was an error deleting that task. Please try again later.');
    }
}
