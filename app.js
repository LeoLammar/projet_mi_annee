require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

const client = new MongoClient(process.env.MONGO_URL);

app.use(cors());
app.use(express.json()); // Middleware pour parser les données JSON

async function connectDB() {
    await client.connect();
    return client.db('data_base').collection('events'); // Collection des événements
}

// Ajouter un événement
app.post('/users/:userId/calendar', async (req, res) => {
    const { userId } = req.params;
    const { date, slot, title, description, duration } = req.body;

    if (!date || !slot || !title || !description || !duration) {
        return res.status(400).json({ success: false, message: 'Données manquantes' });
    }

    try {
        await client.connect();
        const db = client.db('data_base');
        const users = db.collection('users');

        const result = await users.updateOne(
            { _id: new ObjectId(userId) },
            { $push: { calendar: { date, slot, title, description, duration } } }
        );

        if (result.modifiedCount > 0) {
            res.json({ success: true, message: 'Événement ajouté !' });
        } else {
            res.json({ success: false, message: "Utilisateur non trouvé" });
        }
    } catch (error) {
        console.error("Erreur serveur :", error);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
});


// Récupérer tous les événements
app.get('/users/:userId/calendar', async (req, res) => {
    const { userId } = req.params;

    try {
        await client.connect();
        const db = client.db('data_base');
        const users = db.collection('users');

        const user = await users.findOne({ _id: new ObjectId(userId) });

        if (user) {
            res.json({ success: true, calendar: user.calendar || [] });
        } else {
            res.json({ success: false, message: "Utilisateur non trouvé" });
        }
    } catch (error) {
        console.error("Erreur serveur :", error);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
});


app.delete('/users/:userId/calendar', async (req, res) => {
    const { userId } = req.params;
    const { date, slot } = req.query;

    if (!date || !slot) {
        return res.status(400).json({ success: false, message: "Date et slot requis" });
    }

    try {
        await client.connect();
        const db = client.db('data_base');
        const users = db.collection('users');

        const result = await users.updateOne(
            { _id: new ObjectId(userId) },
            { $pull: { calendar: { date, slot } } }
        );

        if (result.modifiedCount > 0) {
            res.json({ success: true, message: "Événement supprimé" });
        } else {
            res.status(404).json({ success: false, message: "Événement non trouvé" });
        }
    } catch (error) {
        console.error("Erreur serveur :", error);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
});









async function loadData(data){
    await client.connect();
    const db = client.db('data_base');
    const collection = db.collection('users');
    const insertStuff = await collection.insertOne(data);
}

async function recupData(data){
    await client.connect();
    const db = client.db('data_base');
    const collection = db.collection('users');
    try{
        const recupStuff = await collection.findOne({email: data.email, password: data.password});
        return recupStuff;
    }catch(e){throw e;}
    
    
}

// Route d'inscription
app.post('/inscription', async (req, res) => {
    const { firstName, lastName, email, password, promotion, role, interests, favoriteSubjects } = req.body;

    if (!firstName || !lastName || !email || !password || !promotion || !role) {
        return res.status(400).json({ success: false, message: "Données manquantes" });
    }

    try {
        await client.connect();
        const db = client.db('data_base');
        const users = db.collection('users');

        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email déjà utilisé" });
        }

        const newUser = {
            firstName,
            lastName,
            email,
            password,
            promotion,
            role,
            interests: interests || [], // Assurer que c'est un tableau
            favoriteSubjects: favoriteSubjects || [],
            calendar: []
        };

        const result = await users.insertOne(newUser);
        res.json({ success: true, message: "Inscription réussie !", userId: result.insertedId });

    } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
});

app.get('/users/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        await client.connect();
        const db = client.db('data_base');
        const users = db.collection('users');

        const user = await users.findOne({ _id: new ObjectId(userId) });

        if (user) {
            delete user.calendar; // Supprime le calendrier avant d'envoyer la réponse
            res.json({ success: true, user });
        } else {
            res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
        }
    } catch (error) {
        console.error("Erreur serveur :", error);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
});



app.post('/connexion', async(req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        res.json({ success: false, message: 'Email ou mot de passe manquant' });
        return;
    }

    try{
        const userFromDB = await recupData(req.body);

        // Vérification des identifiants
        if (userFromDB) {
            res.json({ success: true, message: 'Connexion réussie !', userId: userFromDB._id });
        }
         else {
            res.json({ success: false, message: 'Email ou mot de passe incorrect' });
        }
    }
    catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
    
});


app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
