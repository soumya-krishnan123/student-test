const Student=require('../models/studentModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerStudent = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let student = await Student.findOne({ email });
    if (student) {
      return res.status(400).json({ msg: 'Student already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    student = new Student({ name, email, password: hashedPassword });
    await student.save();

  

    res.status(201).json({ msg:"Student Registered" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


exports.loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).select('-password');
    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
