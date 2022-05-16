const MongoClient = require("mongodb").MongoClient;
const User = require("./user")

describe("User Account Management", () => {
	let client;
	beforeAll(async () => {
		client = await MongoClient.connect(
			"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.tlq8x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
			{ useNewUrlParser: true },
		);
		User.injectDB(client);
	})

	afterAll(async () => {
		await client.close();
	})

	test("New user registration", async () => {
		const res = await User.register("Ainin", "12345")
		expect(res).toBe("Successfully, create new account")
	})

	test("Duplicate username", async () => {
		const res = await User.register("Sofiya", "270343")
		expect(res).toBe("Username already exists")
	})

	test("User login invalid username", async () => {
		const res = await User.login("Ainin", "270343")//Safi
		expect(res).toBe("Username invalid")
	})

	test("User login invalid password", async () => {
		const res = await User.login("Sofiya", "115462") //"115462"
		expect(res).toBe("Password invalid")
	})

	test("User login successfully", async () => {
		const res = await User.login("Sofiya", "270343")
		// expect(res.username).toBe("Sofiya");
		// expect(res.password).toBe("270343");
		expect(res).toBe("Login Succesful")
	})

	// test('should run', () => {
	// });
});