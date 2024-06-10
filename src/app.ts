import express from 'express';
import cors from 'cors';
import { router } from './routes';
import db from './configs/mongo';
const PORT = process.env.PORT || 3001;
const app = express();

db().then(() => {
  console.log('Database connected successfully!');
});

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
