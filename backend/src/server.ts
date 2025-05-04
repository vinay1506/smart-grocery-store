import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productsRouter from './routes/products';
import ordersRouter from './routes/orders';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Smart Grocery Store API' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 