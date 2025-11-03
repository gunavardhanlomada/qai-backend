const Publication = require('../models/Publication');

exports.createPublication = async (req, res) => {
    try {
        const { name, URL } = req.body;
        const publication = new Publication({ name, URL });
        const savedPublication = await publication.save();
        res.status(201).json({ message: 'Publication created', publication: savedPublication });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create publication' });
    }
};
exports.getAllPublications = async (req, res) => {
    try {
        const publications = await Publication.find();
        res.json(publications);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve publications' });
    }
};
exports.editPublication = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, URL } = req.body;
        const updatedPublication = await Publication.findByIdAndUpdate(
            id,
            { name, URL },
            { new: true }
        );
        if (!updatedPublication) {
            return res.status(404).json({ error: 'Publication not found' });
        }
        res.json({ message: 'Publication updated', publication: updatedPublication });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update publication' });
    }
};
exports.deletePublication = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPublication = await Publication.findByIdAndDelete(id);
        if (!deletedPublication) {
            return res.status(404).json({ error: 'Publication not found' });
        }
        res.json({ message: 'Publication deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete publication' });
    }
};