import Forum from "../models/forum.model.js";

// Controlador para crear un nuevo foro
export const createForum = async (req, res) => {
    const { title, content } = req.body;

    try {
        // // Verificar si el usuario tiene el rol de "Influencer"
        // if (req.user.role !== 'Influencer') {
        //     return res.status(403).json({ message: 'Permission denied. Only influencers can create forums.' });
        // }

        // Crear el foro
        const newForum = new Forum({
            title,
            content,
            author: req.user._id  // Asignar el ID del usuario como autor del foro
        });

        const savedForum = await newForum.save();

        res.status(201).json(savedForum);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controlador para obtener todos los foros
export const getForums = async (req, res) => {
    try {
        const forums = await Forum.find();
        res.status(200).json(forums);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un foro
export const updateForum = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const forum = await Forum.findById(id);

        // Verificar si el usuario es el propietario del foro o es un administrador
        if (req.user.role === 'Influencer' && forum.author.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Permission denied. You can only update your own forums.' });
        }

        // Actualizar el foro
        forum.title = title;
        forum.content = content;
        const updatedForum = await forum.save();

        res.json(updatedForum);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un foro
export const deleteForum = async (req, res) => {
    const { id } = req.params;

    try {
        const forum = await Forum.findById(id);

        // Verificar si el usuario es el propietario del foro o es un administrador
        if (req.user.role === 'Influencer' && forum.author.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Permission denied. You can only delete your own forums.' });
        }

        // Eliminar el foro
        await forum.remove();

        res.json({ message: 'Forum deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Ver un solo foro
export const getForumById = async (req, res) => {
    const { id } = req.params;

    try {
        const forum = await Forum.findById(id);
        res.json(forum);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// marcar un foro como favorito
export const favForum = async (req, res) => {
    try {
        const forum = await Forum.findById(req.params.id);
        if (forum) {
            forum.favorite = true;
            await forum.save();
            res.json({ message: 'Foro marcado como favorito' });
        } else {
            res.status(404).json({ message: 'Foro no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const reportForum = async (req, res) => {
    try {
        const forum = await Forum.findById(req.params.id);
        if (forum) {
            forum.reported = true;
            await forum.save();
            res.json({ message: 'Foro reportado' });
        } else {
            res.status(404).json({ message: 'Foro no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};