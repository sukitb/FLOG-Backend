require('dotenv').config();

const config = {
    isVercel: process.env.IS_VERCEL || false,
    port: process.env.PORT || 8080,
    secret: process.env.SECRET,
    mongodb: {
        uri: process.env.MONGODB_URI,
        username: process.env.MONGODB_USERNAME,
        password: process.env.MONGODB_PASSWORD,
        mongoUrl: process.env.MONGODB_URL,
        retryWrites: true,
        w: 'majority'
    },
    
}

module.exports = config;