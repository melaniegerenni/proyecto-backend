import dotenv from 'dotenv';
dotenv.config();

export default {
    app: {
        persistence: process.env.PERSISTENCE,
        enviroment: process.env.NODE_ENV
    },
    mongo: {
        url: process.env.DB_STRING
    }
}