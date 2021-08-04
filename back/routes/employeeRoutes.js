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
        console.log(error);
        res.send(false);
      });
  })
);
//******************************************************************* */
router.put(
  "/reset",
  wrapAsync(async (req, res) => {
    console.log(req.body);
    const { Email, Password } = req.body;
    const employee = await empData.findOneAndUpdate(Email, {Password });
    if (employee) {
      res.status(200).send({ status: true });
    } else {
      res.send({ status: false });
    }
  })
);

router.post(
  "/login",
  wrapAsync(async function (req, res) {
    console.log(req.body);
    console.log(Email);
    if (Email == "admin@ictak.com" && Password == "Admin@11") {
      req.session.role = "admin";
      console.log("admin login success");
      const payload = { subject: Email, admin: true };
      const token = jwt.sign(payload, "secretKey", { expiresIn: "1h" });
      res.send({ status: 200, token, role: req.session.role });
    } else {
      const foundUser = await empData.findAndValidate(Email, Password);
      const id = foundUser._id;
      console.log(id);

      if (foundUser) {
        console.log("an employee loginned");
        req.session.role = "employee";
        const payload = { subject: Email, admin: false };
        const token = jwt.sign(payload, "secretKey", { expiresIn: "1h" });
        res.send({ status: true, token, id, role: req.session.role });
      } else {
        res.send({ status: false, data: "NOT FOUND" });
      }
    }
  })
);

//***************************    Getting all employee      *************************/

router.get(
  "",
  wrapAsync(async (req, res) => {
    const Employees = await empData.find();
    if (Employees) {
      res.send(Employees);
    } else {
      res.send(false);
    }
  })
);

//***************            employee fetching By Id      *****************************/

router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    const Employee = await empData.findById(req.params.id);
    // console.log(Employee)
    if (Employee) {
      return res.send(Employee);
    } else {
      return res.send(false);
    }
  })
);

//************************        profile update        ******************************/
router.put(
  "/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    // console.log(id);
    // console.log(req.body.Employee);
    const Employee = await empData.findByIdAndUpdate(id, {
      ...req.body.Employee,
    });
    // console.log(Employee);
    if (Employee) {
      return res.send(true);
    } else {
      return res.send(false);
    }
  })
);

//*************************    delete the employee profile     *************************/

router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    const deletedStudent = await empData.findByIdAndDelete(req.params.id);
    if (deletedStudent) {
      return res.status(200).send(true);
    } else {
      return res.send(false);
    }
  })
);
//************************************************************** */

module.exports = router;
