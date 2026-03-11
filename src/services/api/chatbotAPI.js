// This is a simple chatbot service
export const processChatMessage = async (message, user) => {
  console.log('Processing message:', message);
  
  // Simple responses based on message content
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('book') || lowerMessage.includes('flight')) {
    return {
      message: 'To book a flight, go to the Search page and enter your travel details.',
      suggestions: ['Search flights', 'Check prices']
    };
  } else if (lowerMessage.includes('cancel')) {
    return {
      message: 'To cancel a booking, go to your Profile and click on Bookings.',
      suggestions: ['View my bookings']
    };
  } else if (lowerMessage.includes('baggage')) {
    return {
      message: 'Baggage allowance: Economy: 23kg, Business: 32kg.',
      suggestions: ['More about baggage']
    };
  } else {
    return {
      message: 'How can I help you with your flight today?',
      suggestions: ['Book a flight', 'Cancel booking', 'Baggage info']
    };
  }
};