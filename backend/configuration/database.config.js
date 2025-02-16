const mongoose = require('mongoose');

/**
 * Establishes a connection to the MongoDB database using mongoose.
 * Utilizes the MongoDB connection string for authentication and connection.
 * Logs a success message upon successful connection, otherwise logs a failure message.
 */

const dbConnect = async () => {
    await mongoose.connect('mongodb+srv://officialhritik:Chand123@cluster0.vih8a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((error) => {
        console.log(error);
        console.log('Database connection failed');
    });   
}

module.exports = dbConnect;