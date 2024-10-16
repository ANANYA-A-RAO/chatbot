const express = require('express');
const cors = require('cors');
const responses = require('./responses.json'); // Import the chatbot responses

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Route for handling chat
app.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body.message.toLowerCase();

    // Check if the userMessage matches a response
    if (responses[userMessage]) {
      // If the response exists, send it
      res.json({ response: responses[userMessage] });
    } else {
      // Default response if the query is not found
      res.json({ response: "I am not sure how to respond to that." });
    }
  } catch (error) {
    console.error("Error handling the request:", error);
    res.status(500).json({ response: "An error occurred while processing your request." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
