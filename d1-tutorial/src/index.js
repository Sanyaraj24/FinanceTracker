import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();

app.use('*', cors());

//--------- ADD USERS (POST) --------------------------------------
app.post('/api/users', async (c) => {
	const db = c.env.DB;
	const body = await c.req.json();
	const {
		user_id,
		name,
		email,
		phone,
		photo_url,
		location,
		pincode,
		default_currency = 'INR',
		timezone = 'Asia/Kolkate',
		is_verified = false,
	} = body;

	try {
		const insertQuery = `INSERT INTO users(user_id, name, email, phone, photo_url, location, pincode, default_currency, timezone, is_verified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

		await db
			.prepare(insertQuery)
			.bind(user_id, name, email, phone, photo_url, location, pincode, default_currency, timezone, is_verified)
			.run();

		return c.json({ success: true, message: 'User added successfully' }, 201);
	} catch (err) {
		return c.json({ success: false, error: err.message }, 500);
	}
});

// ------- FETCH USERS (GET) --------------------------------------
app.get('/api/users', async (c) => {
	const db = c.env.DB;

	try {
		const { results } = await db.prepare('SELECT * FROM users').all();
		return c.json({ success: true, users: results });
	} catch (err) {
		return c.json({ success: false, error: err.message }, 500);
	}
});
//---------------------ACCOUNTS API---------------------
//get all accounts
app.get('/api/accounts', async (c) => {
	const db = c.env.DB;
	const user_id = c.req.query('user_id');
	if (!user_id) {
		return c.json({ error: 'Missing user_id in query' }, 400);
	}

	try {
		const { results } = await db.prepare('SELECT * FROM accounts WHERE user_id = ? AND is_active = TRUE').bind(user_id).all();
		return c.json(results);
	} catch (err) {
		return c.json({ success: false, error: err.message }, 500);
	}
});
//Add an Account--Saving,Credit
app.post('/api/add-accounts', async (c) => {
	const db = c.env.DB;
	// client is sending JSON data
	const body = await c.req.json();
	//Destructures the fields from the body object with some default values
	const { user_id, name, account_type, balance = 0.0, currency = 'INR', bank_name, account_number, notes, is_active = true } = body;

	try {
		// SQL query to insert a new row into the accounts table using parameterized placeholders
		console.log('Received:', {
			user_id,
			name,
			account_type,
			balance,
			currency,
			bank_name,
			account_number,
			notes,
			is_active,
		});
		const query = `
			INSERT INTO accounts (
				user_id, name, account_type, balance, currency,
				bank_name, account_number, notes, is_active
			)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
		`;

		await db.prepare(query).bind(user_id, name, account_type, balance, currency, bank_name, account_number, notes, is_active).run();

		return c.json(
			{
				success: true,
				message: 'Account added successfully',
				account: {
					user_id,
					name,
					account_type,
					balance,
					currency,
					bank_name,
					account_number,
					notes,
					is_active,
				},
			},
			201
		);
	} catch (err) {
		console.error('DB Insert Error:', err.message);
		return c.json({ success: false, error: err.message }, 500);
	}
});

//not in use now--
app.get('/api/accounts/:id', async (c) => {
	const db = c.env.DB;
	//Extracts the id parameter from the URL
	const id = c.req.param('id');
	const body = await c.req.json();

	const { name, account_type, balance, currency, bank_name, account_number, notes, is_active } = body;

	try {
		const query = `
			UPDATE accounts
			SET
				name = ?,
				account_type = ?,
				balance = ?,
				currency = ?,
				bank_name = ?,
				account_number = ?,
				notes = ?,
				is_active = ?,
				updated_at = CURRENT_TIMESTAMP
			WHERE id = ?
		`;

		await db.prepare(query).bind(name, account_type, balance, currency, bank_name, account_number, notes, is_active, id).run();

		return c.json({ success: true, message: 'Account updated successfully' });
	} catch (err) {
		return c.json({ success: false, error: err.message }, 500);
	}
});
//DELETE AN ACCOUNT--
app.delete('/api/delete-account', async (c) => {
	const db = c.env.DB;
	const url = new URL(c.req.url);
	const account_id = url.searchParams.get('account_id');
	const user_id = url.searchParams.get('user_id');

	if (!account_id || !user_id) {
		return c.json({ error: 'Missing account_id or user_id' }, 400);
	}

	try {
		const result = await db.prepare('DELETE FROM accounts WHERE id = ? AND user_id = ?').bind(account_id, user_id).run();

		if (result.success) {
			return c.json({ message: 'Account deleted successfully' }, 200);
		} else {
			return c.json({ error: 'Account not found or could not delete' }, 404);
		}
	} catch (err) {
		console.error('DELETE ERROR:', err);
		return c.json({ error: 'Internal server error' }, 500);
	}
});
//GRAPH--PROFILE
// Example: /api/get-transactions?user_id=abc123&range=1month
// Example: /api/get-transactions?user_id=abc123&range=1month
app.get('/api/get-transactions', async (c) => {
	const userId = c.req.query('user_id');
	if (!userId) {
		return c.json({ success: false, message: 'User ID is required' }, 400);
	}

	const db = c.env.DB;

	try {
		const result = await db
			.prepare(
				`
        SELECT * FROM transactions
        WHERE user_id = ?
        ORDER BY transaction_date DESC
        LIMIT 20
      `
			)
			.bind(userId)
			.all();

		return c.json({
			success: true,
			transactions: result.results,
		});
	} catch (err) {
		console.error('DB error:', err); // <- check your logs for this
		return c.json({ success: false, message: 'Database error' }, 500);
	}
});

//-------------------TRANSACTION API-----------------------
//GET PARTICULAR ACCOUNT TRANSACTIONS--
app.get('/api/get-account-transactions', async (c) => {
	const db = c.env.DB;
	const url = new URL(c.req.url);
	const accountId = url.searchParams.get('account_id');
	const user_id = url.searchParams.get('user_id');

	if (!accountId || !user_id) {
		return c.json({ success: false, message: 'Missing account_id or user id' }, 400);
	}

	try {
		const transactions = await db
			.prepare(`SELECT * FROM transactions WHERE user_id = ? and account_id = ? ORDER BY transaction_date DESC`)
			.bind(user_id, accountId)
			.all();

		return c.json({
			success: true,
			transactions: transactions.results,
		});
	} catch (err) {
		console.error(err);
		return c.json({ success: false, message: 'Database error' }, 500);
	}
});

// ADD TRANSACTION
app.post('/api/add-transactions', async (c) => {
	const db = c.env.DB;
	const body = await c.req.json();
	const {
		user_id,
		account_id,
		amount,
		description,
		category,
		transaction_type,
		payment_method = 'cash',
		transaction_date,
		notes = '',
		reference_number = '',
	} = body;

	try {
		await db
			.prepare(
				`
      INSERT INTO transactions (
        user_id, account_id, amount, description, category, transaction_type,
        payment_method, transaction_date, notes, reference_number
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
			)
			.bind(user_id, account_id, amount, description, category, transaction_type, payment_method, transaction_date, notes, reference_number)
			.run();

		return c.json({ success: true, message: 'Transaction added' });
	} catch (e) {
		return c.json({ success: false, error: e.message }, 500);
	}
});
app.get('/api/get-transactions-by-account', async (c) => {
	const db = c.env.DB;
	const { user_id, account_id } = c.req.query();

	try {
		const query = `
      SELECT * FROM transactions
      WHERE user_id = ? AND account_id = ?
    `;
		const { results } = await db.prepare(query).bind(user_id, account_id).all();
		return c.json({ success: true, data: results });
	} catch (err) {
		return c.json({ success: false, error: err.message }, 500);
	}
});
//get all transactions
app.get('/api/get-transactions', async (c) => {
	const userId = c.req.query('user_id');
	if (!userId) {
		return c.json({ success: false, message: 'User ID is required' }, 400);
	}

	const db = c.env.DB;
	try {
		const result = await db
			.prepare(
				`
        SELECT * FROM transactions
        WHERE user_id = ?
      `
			)
			.bind(userId)
			.all();

		return c.json({
			success: true,
			transactions: result.results,
		});
	} catch (err) {
		console.error('DB error:', err);
		return c.json({ success: false, message: 'Database error' }, 500);
	}
});
export default app;
