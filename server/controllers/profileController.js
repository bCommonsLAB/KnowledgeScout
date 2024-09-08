const Profile = require('../models/Profile');

exports.createProfile = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newProfile = new Profile({
      user: req.user.id,
      name,
      description
    });
    await newProfile.save();
    res.status(201).json({ message: 'Profil erfolgreich erstellt', profile: newProfile });
  } catch (error) {
    console.error('Fehler beim Erstellen des Profils:', error);
    res.status(500).json({ message: 'Serverfehler beim Erstellen des Profils' });
  }
};

exports.getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find({ user: req.user.id });
    res.json(profiles);
  } catch (error) {
    console.error('Fehler beim Abrufen der Profile:', error);
    res.status(500).json({ message: 'Serverfehler beim Abrufen der Profile' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, description } = req.body;
    const profile = await Profile.findOne({ _id: req.params.id, user: req.user.id });
    if (!profile) {
      return res.status(404).json({ message: 'Profil nicht gefunden' });
    }
    profile.name = name || profile.name;
    profile.description = description || profile.description;
    await profile.save();
    res.json({ message: 'Profil erfolgreich aktualisiert', profile });
  } catch (error) {
    console.error('Fehler beim Aktualisieren des Profils:', error);
    res.status(500).json({ message: 'Serverfehler beim Aktualisieren des Profils' });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!profile) {
      return res.status(404).json({ message: 'Profil nicht gefunden' });
    }
    res.json({ message: 'Profil erfolgreich gelöscht' });
  } catch (error) {
    console.error('Fehler beim Löschen des Profils:', error);
    res.status(500).json({ message: 'Serverfehler beim Löschen des Profils' });
  }
};