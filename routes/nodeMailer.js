var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");

router.post("/", function (req, res, next) {
  const { mail, asunto, mensaje, nombre } = req.body;
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    tls: { rejectUnauthorized: false },
    auth: {
      user: "emailstpi391@gmail.com",
      pass: "hfevlmejhibsekkh",
    },
  });
  let infoMail = {
    from: "emailstpi391@gmail.com",
    to: "tomasschool391@gmail.com",
    subject: asunto,
    text: mensaje + " " + "Nombre: " + nombre + " " + "mail contacto: " + mail,
  };
  mailTransporter.sendMail(infoMail, (err) => {
    if (err) {
      console.log("hubo un error");
      console.log(err);
    } else {
      console.log("Email enviado correctamente");
    }
  });
});

module.exports = router;
