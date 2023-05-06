const mongoConfig = {
    host: `mongodb+srv://cristholzmann:wDRhWvNen2HNfUdu@cluster0.2smy7qn.mongodb.net/?retryWrites=true&w=majority`,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
}

module.exports = mongoConfig;