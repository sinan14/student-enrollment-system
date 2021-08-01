const express = require("express");
const wrapAsync = require("../util/wrapAsync");
const router = express.Router();
const jwt = require("jsonwebtoken");
const StudentData = require("../model/student");
const { verifyToken } = require("../middleware");
const nodemailer = require("nodemailer");
const multer = require("multer");
var imagedest = __dirname;
var upload = multer({ dest: imagedest });
const fs = require("fs");
const generator = require("generate-password");
// var password = generator.generate({
// 	length: 8,
// 	numbers: true,
// symbols: true
// });

//************************        register route ***************************************/
router.post(
  "/register",
  wrapAsync(async function (req, res) {
    const user = new StudentData({ ...req.body.user });
    console.log(user);
    user
      .save()
      .then(function (data) {
        res.send({ status: true });
      })
      .catch(function (error) {
        res.send({ status: false });
      });
  })
);

//*********************************************** login routes ********************************** */
router.post(
  "/login",
  wrapAsync(async function (req, res) {
    console.log(req.body);
    const { Email, Password } = req.body;
    // const foundUser = await StudentData.findAndValidate(Email, Password);
    StudentData.findOne(
      { Email: Email, Password: Password },
      function (err, foundUser) {
        if (err) {
          res.send({ status: false, data: "you havenot registered" });
        } else if (foundUser) {
          const id = foundUser._id;
          console.log("an user loginned");
          req.session.role = "user";
          const payload = { subject: Email, admin: false };
          const token = jwt.sign(payload, "secretKey", { expiresIn: "1h" });
          res.send({ status: true, token, id, role: req.session.role });
        } else {
          res.send({ status: false, data: "NOT FOUND" });
        }
      }
    );
  })
);

router.get(
  "",
  wrapAsync(async (req, res) => {
    await StudentData.find().then((Students) => {
      res.send(Students);
    });
  })
);
router.put(
  "/reset",
  wrapAsync(async (req, res) => {
    console.log(req.body);
    const { Email, Password } = req.body;
    // const student = await StudentData.findOne(Email);
    const student = await StudentData.findOneAndUpdate(Email, { Password });
    if (student) {
      // await student.update({Password})

      res.status(200).send({ status: true });
    } else {
      res.send({ status: false });
    }
  })
);
//*************** students fetching  */

router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    const Student = await StudentData.findById(req.params.id);
    // console.log(Student)
    if (Student) {
      return res.send(Student);
    }
    return res.send(false);
  })
);

//************************ profile update */
router.put(
  "/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    console.log(id);
    console.log(req.body.Student);
    const Student = await StudentData.findByIdAndUpdate(id, {
      ...req.body.Student,
    });

    console.log(Student);
    return res.send(Student);
  })
);
//******************* profiel photo update  ******************************/
router.put(
  "/:id/profilepic",
  upload.single("img"),
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    await StudentData.updateOne(
      { _id: id },
      {
        $set: {
          image: {
            data: fs.readFileSync(req.file.path),
            contentType: "image",
          },
        },
      }
    );
  })
);

router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    const deletedStudent = await StudentData.findByIdAndDelete(req.params.id);
    return res.status(200).send(true);
  })
);

// ********************       Mail   **************************************************
router.get(
  "/:id/sendmail",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const link = `localhost:4200/students/${id}/pay`;
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
        // user: "sinuzar5@gmail.com",
        // pass: "ningade mailinte password",
      },
    });
    const mailOptions = {
      from: process.env.USER,
      to: process.env.USER,
      // from: "sinuzar5@gmail.com",
      // to: "sinuzar5@gmail.com",
      subject: `pay your turion fee for ictak`,
      text:
        `you are receiving this email because ictak approved your request for joining for\n\n` +
        `Please click on the following link to pay the tution fee for the program\n\n` +
        `${link}`,

      // html:'<p>you are receiving this email because ictak approved your request for joining for\n\n
      // Please click on the following link to pay the tution fee for the program
      // <a href="localhost:4200/students/${id}/pay"></a></p>',
    };
    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.log("there is an error", err);
      } else {
        console.log("here is the res", response);
      }
    });
  })
);

module.exports = router;
