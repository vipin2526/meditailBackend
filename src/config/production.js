module.exports = {
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/meditail',
    secretKey: process.env.SECRET_KEY || 'DefaultKey',
    NODE_ENV: 'production',
    rapidApiKey: process.env.RAPIDAPI_KEY || 'your rapid api key'
};