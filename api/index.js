import express from 'express';
import cors from 'cors';
import multer from 'multer';

const app = express();
const PORT = 3004;
const upload = multer({ storage: multer.memoryStorage() });

// Middleware
app.use(cors({
  origin: '*', // Allow requests from any origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

// File conversion endpoint
app.post('/conversion', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  console.log(`File received: ${req.file.originalname}`);
  
  // Return success response
  res.json({ 
    message: 'File received', 
    filename: req.file.originalname 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
