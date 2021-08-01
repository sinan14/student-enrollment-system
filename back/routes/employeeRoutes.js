const express = require("express");
const wrapAsync = require("../util/wrapAsync");
const router = express.Router();
const jwt = require("jsonwebtoken");
const empData = require("../model/employee");
router.post(
  "/register",
  wrapAsync(async function (req, res) {
    const employee = new empData(req.body.user);
    console.log(employee);
    employee
      .save()
      .then(function (data) {
        res.send(true);
      })
      .catch(function (error) {
        console.log(error)
        res.send(false);
      });
  })
);
//******************************************************************* */
router.put(
  "/reset",
  wrapAsync(async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    const employee = await empData.findOneAndUpdate( email ,{ password });
    if (employee) {
      res.status(200).send({status:true})
    } else {
      res.send({ status: false });
    }
  })
);

router.post(
  "/login",
  wrapAsync(async function (req, res) {
    console.log(req.body);
    const { email, password } = req.body;
    if (email == "admin@gmail.com" && password == "Admin@11") {
      req.session.role = "admin";
      console.log("admin login success");
      const payload = { subject: email, admin: true };
      const token = jwt.sign(payload, "secretKey", { expiresIn: "1h" });
      res.send({ status: 200, token, role: req.session.role });
    } else {
      const foundUser = await empData.findAndValidate(email, password);
      const id = foundUser._id;
      console.log(id);

      if (foundUser) {
        console.log("an employee loginned");
        req.session.role = "employee";
        const payload = { subject: email, admin: false };
        const token = jwt.sign(payload, "secretKey", { expiresIn: "1h" });
        res.send({ status: true, token, id, role: req.session.role });
      } else {
        res.send({ status: false, data: "NOT FOUND" });
      }
    }
  })
);


module.exports = router;
