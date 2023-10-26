import { testDatabaseConnector, 
  testDatabaseUsersTruncator,
  testDatabaseConnectionCloser
} from "../../../testSetup.js";

// import Server from "../../server.js";

describe("/api/users - Endpoint", () => {
  beforeAll(async () => {
    await testDatabaseConnector();
    await testDatabaseUsersTruncator();
  });

  afterAll(async () => {
    await testDatabaseConnectionCloser();
  });

  


})
