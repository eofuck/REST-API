const express = require('express');
const router = express.Router();

const Student = require('../models/student');

// Getting all
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    //500 Internal Server Error
    res.status(500).json({ message: err.message });
  }
});

//Getting One
router.get('/:id', getStudent, (req, res) => {
  res.json(res.student);
});

//Creating one
router.post('/', async (req, res) => {
  const student = await new Student({
    name: req.body.name,
    major: req.body.major,
  });

  try {
    const newstudent = await student.save();
    //201 Created
    res.status(201).json(newstudent);
  } catch (err) {
    //400 Bad Request
    res.status(400).json({ message: err.message });
  }
});

//Updating One
router.patch('/:id', getStudent, async (req, res) => {
  if (req.body.name != null) {
    res.student.name = req.body.name;
  }
  if (req.body.major != null) {
    res.student.major = req.body.major;
  }

  try {
    const updatedStudent = await res.student.save();
    res.json(updatedStudent);
  } catch (err) {
    //400 Bad Request
    res.status(400).json({ message: err.message });
  }
});

//Deleting One
router.delete('/:id', getStudent, async (req, res) => {
  try {
    await res.student.remove();
    res.json({ message: 'Student Deleted' });
  } catch (err) {
    //500 Internal Server Error
    res.status(500).json({ message: err.message });
  }
});

//Middleware
async function getStudent(req, res, next) {
  let student;
  try {
    student = await Student.findById(req.params.id);
    if (student == null) {
      //404 Not Found
      return res.status(404).json({ message: 'Cannot find student' });
    }
  } catch (err) {
    //500 Internal Server Error
    return res.status(500).json({ message: err.message });
  }

  res.student = student;
  next();
}

module.exports = router;
