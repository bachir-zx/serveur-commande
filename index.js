const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-order", async (req, res) => {
  const { message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: '"Commande Boutique" <' + process.env.EMAIL_USER + '>',
      to: "vendeur@email.com", // à modifier
      subject: "Nouvelle commande client",
      text: message
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Erreur:", err);
    res.status(500).json({ success: false });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Serveur prêt sur http://localhost:${PORT}`));
