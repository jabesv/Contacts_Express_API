const mongoose = require('mongoose')


module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        await mongoose.connection  // checks if we have connection
        console.log('MongoDB Connected!!')
        } catch (error) {
            console.log(error)
    }
}