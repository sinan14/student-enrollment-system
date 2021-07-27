const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const StudentData = require("../model/student");
const { verifyToken } = require("../middleware");
const nodemailer = require("nodemailer");

router.post("/login", function (req, res) {
  console.log(req.body);
  const { Email, Password } = req.body;
  if (Email == "admin@gmail.com" && Password == "Admin@11") {
    req.session.role = "admin";
    console.log("admin login success");
    const payload = { subject: Email + Password, admin: true };
    const token = jwt.sign(payload, "secretKey");
    res.send({ status: true, token, role: req.session.role });
  } else {
    StudentData.findOne(
      { Email: Email, Password: Password },
      function (err, user) {
        if (err) {
          res.send({ status: false, data: "you havenot registered" });
        } else if (user) {
          console.log("an user loginned");
          req.session.role = "user";
          const payload = { subject: Email + Password, admin: false };
          const token = jwt.sign(payload, "secretKey");
          res.send({ status: true, token, role: req.session.role });
        } else {
          res.send({ status: false, data: "NOT FOUND" });
        }
      }
    );
  }
});

//************************ register route **********************************************/
router.post("/register", function (req, res) {
  console.log(req.body.user);
  const user = new StudentData(req.body.user);
  user
    .save()
    .then(function (data) {
      res.send(true);
    })
    .catch(function (error) {
      res.send(false);
    });
});

router.get("/students", (req, res) => {
  StudentData.find().then((Students) => {
    res.send(Students);
  });
});

router.get("/students/:id", async (req, res) => {
  const Student = await StudentData.findById(req.params.id);
  // console.log(Student)
  return res.send(Student);
});

router.put("/students/:id", async (req, res) => {
  const { id } = req.params;
  console.log(req.body.Student);
  const Student = await StudentData.findByIdAndUpdate(id, {
    ...req.body.Student,
  });
  return res.send(Student);
});

router.delete("/students/:id", async (req, res) => {
  const deletedStudent = await StudentData.findByIdAndDelete(req.params.id);
  return res.send(deletedStudent);
});
// ********************       Mail   **************************************************
router.get("/sendmail/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);

  // return res.send("email sent");
  const link = `localhost:4200/pay/${id}`;
  await sendEmail("sinuzar5@gmail.com", "Password reset", link);
});

module.exports = router;
