const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../utils/emailService');

exports.register = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Benutzer oder E-Mail existiert bereits' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Passwort muss mindestens 6 Zeichen lang sein' });
    }

    const verificationToken = crypto.randomBytes(20).toString('hex');

    const newUser = new User({
      username,
      email,
      password,
      firstName,
      lastName,
      verificationToken
    });

    await newUser.save();
    await sendVerificationEmail(newUser.email, verificationToken);

    res.status(201).json({ message: 'Benutzer erfolgreich registriert. Bitte überprüfen Sie Ihre E-Mail zur Verifizierung.' });
  } catch (error) {
    console.error('Registrierungsfehler:', error);
    res.status(500).json({ message: 'Serverfehler bei der Registrierung' });
  }
};


exports.testregister = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Erstellen eines neuen Benutzers ohne Passwort-Hashing oder Validierung
      const newUser = new User({
        username,
        email,
        password, // Achtung: Das Passwort wird hier im Klartext gespeichert!
        isVerified: true // Setzen wir auf true, um die E-Mail-Verifizierung zu umgehen
      });
  
      // Speichern des Benutzers in der Datenbank
      await newUser.save();
  
      res.status(201).json({ 
        message: 'Benutzer erfolgreich registriert', 
        user: { id: newUser._id, username: newUser.username, email: newUser.email }
      });
    } catch (error) {
      console.error('Registrierungsfehler:', error);
      res.status(500).json({ message: 'Serverfehler bei der Registrierung', error: error.message });
    }
  };

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Ungültige Anmeldeinformationen' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Ungültige Anmeldeinformationen' });
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: 'Bitte verifizieren Sie zuerst Ihre E-Mail-Adresse' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ 
        token, 
        user: { 
          id: user._id, 
          username: user.username, 
          email: user.email 
        } 
      });
  } catch (error) {
    console.error('Login-Fehler:', error);
    res.status(500).json({ message: 'Serverfehler beim Login' });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).json({ message: 'Ungültiger Verifizierungstoken' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.json({ message: 'E-Mail erfolgreich verifiziert' });
  } catch (error) {
    console.error('E-Mail-Verifizierungsfehler:', error);
    res.status(500).json({ message: 'Serverfehler bei der E-Mail-Verifizierung' });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Benutzer nicht gefunden' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 Stunde gültig
    await user.save();

    await sendPasswordResetEmail(user.email, resetToken);

    res.json({ message: 'Passwort-Reset-E-Mail wurde gesendet' });
  } catch (error) {
    console.error('Fehler beim Anfordern des Passwort-Resets:', error);
    res.status(500).json({ message: 'Serverfehler beim Anfordern des Passwort-Resets' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Ungültiger oder abgelaufener Token' });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Passwort erfolgreich zurückgesetzt' });
  } catch (error) {
    console.error('Fehler beim Zurücksetzen des Passworts:', error);
    res.status(500).json({ message: 'Serverfehler beim Zurücksetzen des Passworts' });
  }
};
