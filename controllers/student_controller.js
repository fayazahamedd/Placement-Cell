const mongoose = require('mongoose');
const Student = require('../model/student')
const Interview = require('../model/interview');
const Placement = require('../model/placement');

module.exports.add = function (req, res) {
  return res.render("add_profile", {
    title: "Create Student",
  });
};

module.exports.interview = async function (req, res) {
  try {
    const details = await Student.find({})
    return res.render("add_interview", {
      title: "Add Interview",
      students: details,
    });
  } catch (err) {
    console.log(err)
    return res.render("back");
  }
};

module.exports.addStudent = async function (req, res) {
  try {
    if (req.body) {
      await Student.create(req.body);
      req.flash("success", "Added Successfully");
      return res.redirect("/users/dashboard")
    } else {
      console.log('error in adding the student')
    }
  } catch (err) {
    console.error(err);
  }
  return res.send("back")
}

module.exports.addInterview = async function (req, res) {
  try {
    if (req.body) {
      await Interview.create(req.body);
      Student.findOneAndUpdate(
        { _id: req.body.studentId },
        { placementStatus: 'Interview Scheduled with ' + req.body.company },
        { new: true }
      )
        .then(updatedStudent => {
          if (updatedStudent) {
            console.log('Student updated:', updatedStudent);
          } else {
            console.log('Student not found');
          }
        })
        req.flash("success", "Intervew Scheduled");
      return res.redirect('/users/dashboard') 
    }
  } catch (err) {
    console.log(err);
  }
  return res.redirect('back');
}

module.exports.placement = async function (req, res) {
  try {
    const student = await Student.find({})
    const interview = await Interview.find({})

    return res.render('placement', {
      title: 'placement',
      response_student: student,
      response_interview: interview,
    })
  } catch (err) {
    console.error(err)
  }
}

module.exports.processinterview = async function (req, res) {
  try {
    if (req.body) {
      await Placement.create(req.body);

      Student.findOneAndUpdate(
        { _id: req.body.selectedStudent },
        { placementStatus: 'placed' },
        { new: true }
      )
        .then(updatedStudent => {
          if (updatedStudent) {
            console.log('Student updated:', updatedStudent);
          } else {
            console.log('Student not found');
          }
        })
        req.flash("success", "Status Updated");
      return res.redirect('/users/dashboard');
    }
  } catch (err) {
    console.error(err)
  }
  return res.redirect('back');
}