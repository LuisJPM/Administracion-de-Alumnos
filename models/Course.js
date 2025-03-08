const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true }, // establezco el nombre del curso
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // aqui verificamos el user con role profesor que creo el curso con su ID
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],// la lista fea de los alumnos
});

module.exports = mongoose.model("Course", courseSchema);