
const mongoose = require('mongoose');

//نعملو cnx مع DB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connectée avec succès");
    } catch (error) {
        console.log("Erreur de connexion :", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
