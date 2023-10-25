
const specHelper = () => {

  beforeAll(async() => {
    await mongoose.connect(process.env.TEST_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log('Connected to test database')

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    db.on("open", function () {
      done();
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
};

export default specHelper;