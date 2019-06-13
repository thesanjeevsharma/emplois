module.exports = {
    MongoURI : `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_PORT}:27017/${process.env.DB_NAME}`
}