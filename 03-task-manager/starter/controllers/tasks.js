const express = require('express');
const router = express.Router();
const Task = require('../models/tasks');
const asyncWrapper = require('../middleware/asyncWrapper');
const getAllTasks = asyncWrapper(async (req, res) => {
  const task = await Task.find();
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res) => {
  const id = req.params.id;
  console.log('_id', id);
  const task = await Task.findOne({ _id: id });
  if (!task) {
    const error = new Error('element not exist');
    error.status = 404;
    return next(error);
  }
  res.status(201).json({ task });
});
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});
const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return res.status(404).json({ msg: `No task with id :${taskId}` });
  }
  return res.status(201).json({ task });
});
const editTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return res.status(404).json({ msg: `No task with id :${taskId}` });
  }
  return res.status(201).json({ task });
});
const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskId });
  if (!task) {
    return res.status(404).json({ msg: `No task with id :${taskId}` });
  }
  return res.status(201).json({ task });
});
module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTask,
  editTask,
};
