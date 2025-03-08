const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // establezco el nombre del usuario
  email: { type: String, required: true, unique: true }, // establezco el email y verfico que sea unico
  password: { type: String, required: true },//la contra
  role: { type: String, enum: ["TEACHER_ROLE", "STUDENT_ROLE"], required: true },// establezco ambos roles y que uno tendra ciertos privilegios
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], // un array de los cursos de los estudiantes
});

// Hash de la contraseña antes de guardar
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model("User", userSchema);

