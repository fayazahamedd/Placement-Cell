const express = require('express');
const router = express.Router();
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const mongoose = require('mongoose');
const Student = require('../model/student')
const Interview = require('../model/interview');
const Placement = require('../model/placement');
const User =  require('../model/user')

module.exports.signUp = function (req, res) {
  return res.render("sign_up", {
    title: "Sign Up",
  });
};

// render the sign in page
module.exports.signIn = function (req, res) {
  return res.render("sign_in", {
    title: "Sign In",
  });
};

module.exports.createUser = async function (req, res) {
  if (req.body.password !== req.body.confirm_password) {
    re.flash('error',"Passwords do not match");
    return res.redirect("back");
  }

  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      await User.create(req.body);
      console.log('Signed Up');
      req.flash('success', 'Successfully signUp')
      return res.redirect("/users/signin");
    } else {
      return res.redirect("/users/signin");
    }
  } catch (err) {
    console.log('Error in creating the user:', err);
    req.flash("error", "An error occurred");
    return res.redirect("/users/signin");
  }
};

module.exports.login = async function (req, res) {

  try {
    const user = await User.findOne({ email: req.body.email })

    if (user) {
      req.flash('success', 'Successfully sign In')
      return res.redirect('/users/dashboard')
    } else {
      return res.redirect('/users/signup');
    }
  } catch (err) {
    console.error(err);
    req.flash("error", "An error occurred");
  }
}

module.exports.dashboard = async function (req, res) {
  const details = await Student.find({})
  return res.render("user_dashboard", {
    title: "Dashboard",
    response: details,
  });
}

module.exports.download = async function (req, res) {
  try {
    const students = await Student.find(); // Fetch data from your MongoDB collection
    const interview = await Interview.find();
    const placement = await Placement.find();

    console.log(interview, placement)

    const csvWriter = createCsvWriter({
      path: 'students.csv',
      header: [
        { id: 'studentId', title: 'Student ID' },
        { id: 'studentName', title: 'Student Name' },
        { id: 'studentCollege', title: 'Student College' },
        { id: 'studentStatus', title: 'Student Status' },
        { id: 'dsaScore', title: 'DSA Final Score' },
        { id: 'webScore', title: 'WebD Final Score' },
        { id: 'reactScore', title: 'React Final Score' },
        { id: 'interviewDate', title: 'Interview Date' },
        { id: 'interviewCompany', title: 'Interview Company' },
        { id: 'interviewResult', title: 'Interview Student Result' },
      ]
    });

    const csvRecords = students.map(student => {

      const studentInterview = interview.find(interview => interview.studentId === student._id.toString());

      // Find the corresponding placement data for the current student's interview
      const studentPlacement = placement.find(placement => placement.selectedInterview.toString() === studentInterview._id.toString());


      return {
        studentId: student._id.$oid,
        studentName: student.name,
        studentCollege: student.college,
        studentStatus: student.placementStatus,
        dsaScore: student.dsa,
        webScore: student.web,
        reactScore: student.react,
        interviewDate: studentInterview ? studentInterview.date : '',
        interviewCompany: studentInterview ? studentInterview.company : '',
        interviewResult: studentPlacement ? studentPlacement.placementStatus : '',
      };
    });

    // Write the CSV records to the file
    await csvWriter.writeRecords(csvRecords);

    // Set the response headers to trigger the download
    res.setHeader('Content-Disposition', 'attachment; filename=students.csv');
    res.setHeader('Content-Type', 'text/csv');
    res.download('students.csv');
    req.flash("success", "Downloaded Sucessfully");
  } catch (error) {
    console.error('Error generating CSV:', error);
    req.flash("error", error);
    res.status(500).send('An error occurred');
  }
}
