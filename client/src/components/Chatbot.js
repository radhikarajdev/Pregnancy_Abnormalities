import './Chatbot.css';
import React, { useState } from 'react';

function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
  
    // Function to send messages to Rasa API
    const handleSubmit = async () => {
      if (!input.trim()) return; // Prevent empty messages
  
      // Add the user's message to the chat
      const newMessages = [...messages, { text: input, sender: 'user' }];
      setMessages(newMessages);
  
      // Send the message to Rasa
      const response = await fetch('http://localhost:5005/webhooks/rest/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sender: 'user', message: input }),
      });
  
      // Get the bot's response and update the chat
      const data = await response.json();
      const botMessage = data.map(item => item.text).join(' ');
  
      // Add bot's response to the chat
      setMessages([...newMessages, { text: botMessage, sender: 'bot' }]);
      setInput(""); // Clear the input field
    };
  

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="chat-container">
        <div className="chat-header">Chat with Us</div>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <p key={index}><strong>{msg.sender}:</strong> {msg.text}</p>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={handleSubmit}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;