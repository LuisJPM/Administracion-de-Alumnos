const Course = require("../models/Course.js");
const User = require("../models/User");

const createCourse = async (req, res) => {
  const { name } = req.body;
  const teacherId = req.user.id;
  try {
    const course = new Course({ name, teacher: teacherId });
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({ teacher: req.user.id });
    res.json(courses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const course = await Course.findByIdAndUpdate(id, { name }, { new: true });
    res.json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findByIdAndDelete(id);
    // Desasignar el curso de los alumnos
    await User.updateMany({ courses: id }, { $pull: { courses: id } });
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createCourse, getCourses, updateCourse, deleteCourse };