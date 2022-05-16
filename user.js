const bcrypt = require("bcryptjs")
let users;

class User {
	static async injectDB(conn) {
		users = await conn.db("API").collection("users")
	}

	/**
	 * @remarks
	 * This method is not implemented yet. To register a new user, you need to call this method.
	 * 
	 * @param {*} username 
	 * @param {*} password 
	 * @param {*} phone 
	 */

	static async register(username, password) {
		const user = await users.findOne({Username: username})
		.then(async user =>{
			if (user) {
				if (user.username == username)		//check whether the username exists or not
				{
					return "Username already exists";
				}
		}
		else 
		{
		// TODO: Hash password
			const Passwordhash = bcrypt.hashSync(password, 10);		
		// TODO: Save user to database
			await users.insertOne({
				Username: username,
				Password: Passwordhash,
			})
			return "Successfully, create new account";
		}
	})
	return user;
	}

	static async login(username, password) {

	const user = await users.findOne({Username: username})
	.then(async user =>{
		if (user) 
		{
			if (user.password != password)		//check whether the username exists or not
			{
				return "Password invalid";
			}
			else if(user.username != username)
			{
				return "Username invalid";
			}
			else
			{
				return user;
			}
		}
		else
		{
			return "Login failed"
		}
	})
	return user;
    }

}
module.exports = User;