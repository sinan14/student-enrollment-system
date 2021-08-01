const express = require("express");
const wrapAsync = require("../util/wrapAsync");
const router = express.Router();
const jwt = require("jsonwebtoken");
const StudentData = require("../model/student");
const { verifyToken } = require("../middleware");
const nodemailer = require("nodemailer");

router.get(
  "",
  wrapAsync(async (req, res) => {
    await StudentData.find().then((Students) => {
      res.send(Students);
    });
  })
);

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

router.put(
  "/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    console.log(id);
    console.log(req.body.Student);
    const Student = await StudentData.findByIdAndUpdate(id, {
      ...req.body.Student,
    });

    // const Student = await StudentData.findByIdAndUpdate(id, {
    //   $set: {
    //     Name: req.body.Student.Name,
    //     Email: req.body.Student.Email,
    //     Phone: req.body.Student.Phone,
    //     State: req.body.Student.State,
    //     HighestQualification: req.body.Student.HighestQualification,
    //     PassOfYear: req.body.Student.PassOfYear,
    //     SkillSet: req.body.Student.SkillSet,
    //     EmploymentStatus: req.body.Student.EmploymentStatus,
    //     Course: req.body.Student.Course,
    //     DOB: req.body.Student.DOB,
    //     Password:req.body.Student.Password,
    //   },
    // });

    console.log(Student);
    return res.send(Student);
  })
);
// router.put(
//   "/:id/profilepic",
//   upload.single("img"),
//   wrapAsync(async (req, res) => {
//     const { id } = req.params;
//     await Bookdata.updateOne(
//       { _id: id },
//       {
//         $set: {
//           image: {
//             data: fs.readFileSync(req.file.path),
//             contentType: "image",
//           },
//         },
//       }
//     );
//   })
// );

// app.put("/book", upload.single("img"), (req, res) => {
//   console.log(req.body);
//   (id = req.body._id),
//     (title = req.body.title),
//     (author = req.body.author),
//     (description = req.body.description),
//     (genre = req.body.genre),
//     BookData.updateOne(
//       { _id: id },
//       {
//         $set: {
//           title: title,
//           author: author,
//           description: description,
//           genre: genre,
//           image: {
//             data: fs.readFileSync(req.file.path),
//             contentType: "image",
//           },
//         },
//       }
//     ).then(function (book) {
//       res.send(book);
//     });
// });

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
