const taskModel = require("@/models/task.model");

const getAll = async (req, res, next) => {
  try {
    const tasks = await taskModel.findAll();
    res.success(tasks);
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const task = await taskModel.findOne(+req.params.id);
    if (!task) {
      return res.error(404, "Task not found");
    }
    res.success(task, 201);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const newTask = await taskModel.create({
      title: req.body.title,
      content: req.body.content,
    });
    res.success(newTask, 201);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const affected = await taskModel.update(+req.params.id, req.body);
    if (!affected) {
      return res.error(404, "Task not found");
    }
    res.success({ message: "Update successfully" });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const affected = await taskModel.destroy(+req.params.id);
    if (!affected) {
      return res.error(404, "Task not found");
    }
    res.success({ message: "Delete successfully" });
  } catch (error) {
    next(error);
  }
};

const toggle = async (req, res, next) => {
  try {
    const id = +req.params.id;
    const { is_completed } = req.body;

    const affected = await taskModel.toggleCompleted(id, is_completed);

    if (!affected) {
      return res.error(404, "Task not found");
    }
    res.success({ message: "Update successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getOne, create, update, destroy, toggle };
