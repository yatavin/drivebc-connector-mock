import mongoose from 'mongoose';
import eventSchema from './schemas/eventSchema.js';

const Models = {
    Event: mongoose.model('Event', eventSchema)
};

const connectDB = () => {
    let host = process.env.MOTI_API_MONGO_DB_HOST || "localhost";
    console.log(`Connecting monogo @ ${host}`);
    return mongoose.connect(
        `mongodb://event-api:event-api@${host}:27017/event-db`
        , { useNewUrlParser: true, useUnifiedTopology: true});
}

export {Models, connectDB};
export default Models;