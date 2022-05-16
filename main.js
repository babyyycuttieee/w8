const MongoClient = require("mongodb").MongoClient;
const User = require("./user");

MongoClient.connect( 
	"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.tlq8x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
	{ useNewUrlParser: true },
).catch(err => {
	console.error(err.stack)
	process.exit(1)
}).then(async client => {
	console.log('Connected to MongoDB');
	User.injectDB(client);
})

const express = require('express');
const bcrypt = require("bcryptjs/dist/bcrypt");
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
	res.send('Hello World')
})

app.get('/hello', (req, res) => {
	res.send('Hello BENR2423')
})

app.post('/login',async(req,res)=>{
	try{
		const user = await User.findOne({Username: req.body.username});
		if(!user)
		{
			res.status(400).send('Invalid Username')
		}
		else
		{
			const checkPassword = await bcrypt.compare(req.body.password,user.password)
			console.log(checkPassword)
			if(!checkPassword)
			{
				res.status(400).send('Invalid Password')
			}
			else
			{
				res.status(200).send('Successful login')
			}
		}
	}
	catch(error)
	{
		res.status(400).send(error);
	}
})

app.post('/register', async (req, res) => {
    console.log(req.body);
    const user = await User.register(req.body.username, req.body.password);
    if (user == false) {
        return res.status(400).send("User already exits")
    } 
    return res.status(200).send("Successfully, create new account")
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})

//404 is not found
//401 can't do that
//400 i don't like what you said(request was bad)
