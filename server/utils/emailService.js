const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  // Konfigurieren Sie hier Ihren E-Mail-Service
  // Beispiel für Gmail:
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendVerificationEmail = async (email, token) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'E-Mail-Verifizierung für Ihr KnowledgeScout-Konto',
    html: `
      <h1>Willkommen bei KnowledgeScout!</h1>
      <p>Bitte klicken Sie auf den folgenden Link, um Ihre E-Mail-Adresse zu verifizieren:</p>
      <a href="${process.env.FRONTEND_URL}/verify-email/${token}">E-Mail verifizieren</a>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verifizierungs-E-Mail gesendet');
  } catch (error) {
    console.error('Fehler beim Senden der Verifizierungs-E-Mail:', error);
  }
};

const sendPasswordResetEmail = async (email, token) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Passwort-Reset für Ihr KnowledgeScout-Konto',
    html: `
      <h1>Passwort-Reset für KnowledgeScout</h1>
      <p>Bitte klicken Sie auf den folgenden Link, um Ihr Passwort zurückzusetzen:</p>
      <a href="${process.env.FRONTEND_URL}/reset-password/${token}">Passwort zurücksetzen</a>
      <p>Dieser Link ist eine Stunde lang gültig.</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Passwort-Reset-E-Mail gesendet');
  } catch (error) {
    console.error('Fehler beim Senden der Passwort-Reset-E-Mail:', error);
  }
};

async function testEmailConfig() {
    try {
      await transporter.verify();
      console.log('E-Mail-Konfiguration ist korrekt');
    } catch (error) {
      console.error('E-Mail-Konfigurationsfehler:', error);
    }
  }
  
  testEmailConfig();

module.exports = { sendVerificationEmail, sendPasswordResetEmail };