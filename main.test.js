const supertest = require('supertest');
const request = supertest('http://localhost:3000');

describe('Express Route Test', function () {

	it('Login Succesful', async() => {
		return request
			.post('/login')
			.send({username: 'Sofiya', password: "270343" })
			.expect('Content-Type', /json/)
			.expect(200).then(response => {
				expect(response.body).toEqual(
					expect.objectContaining({
						username: expect.any(String),
						password: expect.any(String),
					})
				);
			});
	});

	//it('expactation', () =>)
	it('Login failed', async  () => {
		return request
			.post('/login')
			.send({username: 'Ainin', password: "554567" })
			.expect('Content-Type', /type/)
			.expect(404).then(response => {
				expect(response.text).toEqual("Login failed")
			});
	})

	it('register', async () => {
		return request
		.post('/register')
		.send({username: 'Ash', password: "188689" })
		.expect('Content-Type', /type/)
		.expect(200).then(response => {
			expect(response.text).toEqual("Successfully, create new account")
		});
	});

	it('register failed', async () => {
		return request
		.post('/register')
		.send({username: 'Sofiya', password: "270343" })
		.expect('Content-Type', /type/)
		.expect(404).then(response => {
			expect(response.text).toEqual("Data already exists")
		});
	})
});