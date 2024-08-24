const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/db'); // PostgreSQL connection
const Document = require('./models/Document'); // Sequelize model
const documentRoutes = require('./routes/documentRoutes'); // Your routes

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // For parsing application/json

// Sync the Sequelize models
sequelize.sync().then(() => console.log('Sequelize models synced'));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST"]
  }
});

// Routes
app.use('/api/documents', documentRoutes);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join-document', (documentId) => {
    socket.join(documentId);
  });

  socket.on('send-changes', (delta) => {
    const documentId = Object.keys(socket.rooms).find((room) => room !== socket.id);
    if (documentId) {
      socket.broadcast.to(documentId).emit('receive-changes', delta);
    }
  });

  socket.on('save-document', async (documentId, content) => {
    await Document.update({ content }, { where: { id: documentId } });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
