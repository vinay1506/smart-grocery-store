import { pool } from './db';
import fs from 'fs';
import path from 'path';

async function setupDatabase() {
  try {
    const connection = await pool.getConnection();
    console.log('Database connection successful!');

    // Read and execute SQL file
    const sql = fs.readFileSync(path.join(__dirname, 'setup-db.sql'), 'utf8');
    const statements = sql.split(';').filter(statement => statement.trim());

    for (const statement of statements) {
      if (statement.trim()) {
        await connection.execute(statement);
        console.log('Executed SQL statement');
      }
    }

    console.log('Database setup completed successfully!');
    connection.release();
  } catch (error) {
    console.error('Database setup failed:', error);
  }
}

setupDatabase(); 