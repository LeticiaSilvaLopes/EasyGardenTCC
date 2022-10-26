
async function connect() {
	if (global.connection)
		return global.connection.connect();

	const { Pool } = require('pg');
	const pool = new Pool({
		connectionString: 'postgres://qryjlarz:VdvWR7mCcBVimLqzYUIYUXMMivvdSScJ@babar.db.elephantsql.com/qryjlarz'
	});

	//apenas testando a conexão
	const client = await pool.connect();
	console.log("Criou pool de conexões no PostgreSQL!");

	const res = await client.query('SELECT NOW()');
	console.log(res.rows[0]);
	client.release();

	//guardando para usar sempre o mesmo
	global.connection = pool;
	return pool.connect();
}
exports.connect = connect;
