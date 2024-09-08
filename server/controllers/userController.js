const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
  try {
    console.log("getUserProfile");
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Benutzer nicht gefunden' });
    }
    res.json(user);
  } catch (error) {
    console.error('Fehler beim Abrufen des Benutzerprofils:', error);
    res.status(500).json({ message: 'Serverfehler beim Abrufen des Benutzerprofils' });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    console.log("updateUserProfile");
    console.log(req.body);

    const { firstName, lastName, email } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'Benutzer nicht gefunden' });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;

    await user.save();

    res.json({ message: 'Benutzerprofil erfolgreich aktualisiert', user });
  } catch (error) {
    console.error('Fehler beim Aktualisieren des Benutzerprofils:', error);
    res.status(500).json({ message: 'Serverfehler beim Aktualisieren des Benutzerprofils' });
  }
};
