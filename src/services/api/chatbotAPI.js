const botKnowledge = {
  greetings: ['hi', 'hello', 'hey', 'salam', 'assalam', 'good morning', 'good evening', 'good afternoon', 'howdy', 'sup', 'whats up', "what's up"],
  farewells: ['bye', 'goodbye', 'see you', 'later', 'take care', 'cya'],
  thanks: ['thanks', 'thank you', 'thankyou', 'appreciate', 'helpful', 'great help', 'you helped'],
  flights: ['search flight', 'find flight', 'available flights', 'flight schedule', 'show flights', 'any flights', 'flight available', 'fly to', 'flights to', 'flights from'],
  booking: ['how to book', 'want to book', 'make booking', 'make a booking', 'book a ticket', 'book ticket', 'how do i book', 'reserve', 'reservation', 'purchase ticket'],
  cancel: ['cancel', 'cancellation', 'cancel booking', 'cancel my booking', 'cancel reservation', 'cancel ticket', 'cancel my ticket', 'cancel flight', 'cancel my flight', 'refund', 'cancel order'],
  airports: ['airport', 'airports', 'which cities', 'destinations', 'where can i fly', 'which destinations', 'available cities', 'which airports', 'serve', 'routes'],
  price: ['price', 'cost', 'how much', 'fare', 'cheap', 'expensive', 'pkr', 'ticket price', 'flight cost', 'how much does', 'charges', 'fee', 'affordable', 'rates'],
  seats: ['seat', 'seats', 'class', 'economy', 'business', 'first class', 'seat selection', 'choose seat', 'pick seat', 'seat available'],
  checkin: ['check in', 'checkin', 'check-in', 'boarding', 'boarding pass', 'gate', 'terminal', 'when to arrive'],
  luggage: ['luggage', 'baggage', 'bag', 'bags', 'weight limit', 'carry on', 'carry-on', 'suitcase', 'allowed weight', 'kg', 'kilos'],
  help: ['help', 'support', 'assist', 'problem', 'issue', 'not working', 'error', 'trouble', 'stuck', 'confused', 'dont understand', "don't understand"],
  account: ['account', 'profile', 'login', 'log in', 'register', 'sign up', 'signup', 'password', 'forgot password', 'create account', 'new account'],
  mybookings: ['my booking', 'my bookings', 'my ticket', 'my tickets', 'my reservation', 'view booking', 'see booking', 'booking history', 'past booking', 'upcoming flight'],
  admin: ['admin', 'manage', 'add flight', 'dashboard', 'admin panel', 'admin login'],
  status: ['flight status', 'status', 'delayed', 'on time', 'cancelled flight', 'flight cancelled', 'flight delay'],
  payment: ['payment', 'pay', 'credit card', 'debit card', 'how to pay', 'payment method', 'visa', 'mastercard', 'online payment'],
  children: ['child', 'children', 'kid', 'kids', 'infant', 'baby', 'minor', 'travelling with kids', 'family'],
  special: ['special meal', 'wheelchair', 'disability', 'special assistance', 'medical', 'special needs', 'vegetarian', 'halal'],
  wifi: ['wifi', 'internet', 'in flight', 'inflight', 'entertainment', 'movie', 'tv', 'screen'],
  duration: ['how long', 'duration', 'flight time', 'travel time', 'hours', 'long is the flight'],
};

const responses = {
  greetings: (user) => ({
    message: user
      ? `👋 Welcome back, **${user.name}**! Great to see you again.\n\nHow can I assist you today? Here are some things I can help with:`
      : `👋 Hello! Welcome to **SkyWay Airlines**!\n\nI'm your AI travel assistant. Here's what I can help you with:\n\n✈️ Search & book flights\n❌ Cancel bookings\n🏢 Airport information\n💰 Pricing details\n🧳 Baggage info\n🎫 Check-in & boarding\n\nWhat would you like to know?`,
    suggestions: ['Search flights', 'Book a flight', 'Cancel booking', 'Airport info', 'Flight prices']
  }),

  farewells: () => ({
    message: "✈️ Thank you for choosing **SkyWay Airlines**!\n\nHave a wonderful journey and a safe flight! Feel free to come back anytime. 😊🌍",
    suggestions: ['Search flights', 'My bookings']
  }),

  thanks: () => ({
    message: "😊 You're most welcome! I'm always happy to help.\n\nIs there anything else I can assist you with?",
    suggestions: ['Search flights', 'Book a flight', 'Airport info', 'Baggage info']
  }),

  flights: () => ({
    message: "🛫 **How to Search Flights:**\n\n1️⃣ Click the **Flights** tab in the navbar\n2️⃣ Select your **departure** airport (e.g. KHI)\n3️⃣ Select your **destination** airport (e.g. DXB)\n4️⃣ Pick your **travel date**\n5️⃣ Choose number of **passengers**\n6️⃣ Select **class** (Economy / Business / First)\n7️⃣ Hit **Search Flights**!\n\n🌍 We fly to destinations across Pakistan and the Middle East.",
    suggestions: ['Available airports', 'Flight prices', 'How to book', 'Check schedule']
  }),

  booking: (user) => ({
    message: user
      ? `📋 **How to Book a Flight:**\n\n1️⃣ Search for your desired flight\n2️⃣ Click **Select** on your preferred flight\n3️⃣ Choose your **seat** from the seat map\n4️⃣ Review your booking details\n5️⃣ Click **Confirm Booking**\n\n✅ Your booking will instantly appear in **My Bookings** in your profile!\n\nWould you like to search for a flight now?`
      : `⚠️ To book a flight, you need to be **logged in** first!\n\n👉 Click **Login** or **Sign Up** in the top navigation bar.\n\nOnce logged in:\n1️⃣ Search for a flight\n2️⃣ Select your flight & seat\n3️⃣ Confirm your booking\n\nIt's quick and easy! 😊`,
    suggestions: user ? ['Search flights', 'My bookings', 'Available seats'] : ['Login', 'Sign up', 'Search flights']
  }),

  cancel: (user) => ({
    message: user
      ? `❌ **How to Cancel a Booking:**\n\n1️⃣ Go to your **Profile** (top right)\n2️⃣ Click **My Bookings** tab\n3️⃣ Find the booking you want to cancel\n4️⃣ Click the red **Cancel** button\n5️⃣ Confirm the cancellation\n\n⚠️ **Important Notes:**\n• Cancellation is **immediate**\n• Your seat will be released back\n• Cancellations cannot be undone\n• Contact support for refund queries`
      : `⚠️ To cancel a booking, you need to be **logged in** first!\n\n👉 Click **Login** in the top navigation bar to access your bookings.`,
    suggestions: user ? ['My bookings', 'Search new flight', 'Contact support'] : ['Login', 'Sign up']
  }),

  mybookings: (user) => ({
    message: user
      ? `📂 **Your Bookings:**\n\nTo view all your bookings:\n\n1️⃣ Click your **name/avatar** in the top right\n2️⃣ Select **My Bookings** from the dropdown\n\nOR go to your **Profile** page and click the **My Bookings** tab.\n\nYou can see:\n✅ Upcoming flights\n✅ Past flights\n✅ Cancelled bookings\n✅ Booking status`
      : `⚠️ You need to be **logged in** to view your bookings!\n\n👉 Click **Login** in the navbar to access your account.`,
    suggestions: user ? ['Cancel booking', 'Search new flight', 'Download boarding pass'] : ['Login', 'Sign up']
  }),

  airports: () => ({
    message: `🏢 **Our Airports & Destinations:**\n\n🇵🇰 **Pakistan (Domestic):**\n• KHI — Karachi (Jinnah International)\n• LHE — Lahore (Allama Iqbal International)\n• ISB — Islamabad (New Islamabad International)\n\n🌍 **International:**\n• DXB — Dubai International, UAE\n• IST — Istanbul Airport, Turkey\n• DOH — Doha (Hamad International), Qatar\n\n📌 More destinations coming soon!`,
    suggestions: ['Flight prices', 'Search flights', 'How to book', 'Flight duration']
  }),

  price: () => ({
    message: `💰 **Starting Prices (PKR):**\n\n🇵🇰 **Domestic Flights:**\n• Karachi ↔ Lahore: PKR 12,000\n• Karachi ↔ Islamabad: PKR 15,000\n• Lahore ↔ Islamabad: PKR 8,000\n\n🌍 **International Flights:**\n• Karachi → Dubai (DXB): PKR 45,000\n• Karachi → Istanbul (IST): PKR 95,000\n• Karachi → Doha (DOH): PKR 55,000\n\n💡 Prices vary by date, class & availability.\n⭐ First Class & Business prices are higher.`,
    suggestions: ['Search flights', 'Seat classes', 'How to book', 'Available airports']
  }),

  seats: () => ({
    message: `💺 **Seat Classes Available:**\n\n🟢 **Economy Class**\n• Most affordable option\n• Standard comfortable seating\n• 23kg checked baggage\n\n🔵 **Business Class**\n• Extra legroom & wider seats\n• Premium meal service\n• 32kg checked baggage\n• Priority boarding\n\n⭐ **First Class**\n• Luxury fully-flat seats\n• Finest dining experience\n• 40kg checked baggage\n• Exclusive lounge access\n\nSelect your class when searching for flights!`,
    suggestions: ['Search flights', 'Baggage info', 'Flight prices', 'How to book']
  }),

  checkin: () => ({
    message: `🎫 **Check-in & Boarding Info:**\n\n⏰ **When to Arrive:**\n• Domestic flights: **2 hours** before departure\n• International flights: **3 hours** before departure\n\n📱 **Online Check-in:**\n• Opens **24 hours** before departure\n• Access via Profile → My Bookings\n\n🚪 **At the Airport:**\n• Carry your boarding pass (printed or digital)\n• Have your ID/Passport ready\n• Proceed to the designated gate\n\n⚠️ Late check-in may result in denied boarding!`,
    suggestions: ['Baggage info', 'My bookings', 'Airport info', 'Flight status']
  }),

  luggage: () => ({
    message: `🧳 **Baggage Allowance:**\n\n✈️ **Economy Class:**\n• Carry-on: 7 kg (1 bag)\n• Checked baggage: 23 kg (1 bag)\n\n💼 **Business Class:**\n• Carry-on: 10 kg (2 bags)\n• Checked baggage: 32 kg (2 bags)\n\n⭐ **First Class:**\n• Carry-on: 10 kg (2 bags)\n• Checked baggage: 40 kg (3 bags)\n\n⚠️ **Extra Baggage:**\n• Additional charges apply per kg\n• Must be declared at check-in\n\n🚫 **Prohibited Items:**\n• Sharp objects in carry-on\n• Liquids over 100ml in carry-on\n• Flammable materials`,
    suggestions: ['Check-in info', 'Seat classes', 'Flight prices', 'Special assistance']
  }),

  payment: () => ({
    message: `💳 **Payment Information:**\n\n✅ **Accepted Methods:**\n• Visa Credit/Debit Card\n• Mastercard\n• Online Banking\n\n🔒 **Security:**\n• All payments are encrypted\n• Secure SSL connection\n• No card details stored\n\n💰 **Pricing:**\n• Prices shown are per person\n• All taxes included\n• No hidden charges\n\n⚠️ Payment is required at time of booking to confirm your seat.`,
    suggestions: ['How to book', 'Flight prices', 'Cancel booking', 'Contact support']
  }),

  status: () => ({
    message: `📡 **Flight Status:**\n\nTo check your flight status:\n\n1️⃣ Go to your **Profile**\n2️⃣ Click **My Bookings**\n3️⃣ Your booking shows current flight status\n\n**Status meanings:**\n🟢 **Confirmed** — Your booking is active\n🟡 **Pending** — Awaiting confirmation\n🔴 **Cancelled** — Flight or booking cancelled\n✅ **Completed** — Flight has landed\n\nFor real-time delays, check at the airport or call support.`,
    suggestions: ['My bookings', 'Cancel booking', 'Contact support', 'Check-in info']
  }),

  children: () => ({
    message: `👨‍👩‍👧 **Travelling with Children:**\n\n👶 **Infants (under 2 years):**\n• Travel on parent's lap\n• Reduced fare applies\n• No separate seat assigned\n\n🧒 **Children (2-12 years):**\n• Require their own seat\n• Child fare may apply\n• Must travel with an adult\n\n🎒 **Tips for Family Travel:**\n• Book seats together in advance\n• Request child meals if needed\n• Arrive early for smooth check-in\n• Bring entertainment for kids\n\n📋 Children need valid ID or birth certificate.`,
    suggestions: ['Baggage info', 'Seat classes', 'How to book', 'Check-in info']
  }),

  special: () => ({
    message: `♿ **Special Assistance & Meals:**\n\n🦽 **Mobility Assistance:**\n• Wheelchair available on request\n• Priority boarding provided\n• Inform us at time of booking\n\n🍽️ **Special Meals:**\n• Halal meals available\n• Vegetarian options\n• Request when booking\n\n⚕️ **Medical Needs:**\n• Inform airline of medical conditions\n• Medication allowed in carry-on\n• Medical certificate may be required\n\n📞 Contact our support team for special requests.`,
    suggestions: ['Contact support', 'Baggage info', 'Check-in info', 'How to book']
  }),

  wifi: () => ({
    message: `📺 **In-Flight Entertainment:**\n\n🎬 **Available on selected flights:**\n• Personal entertainment screens\n• Movies & TV shows\n• Music & podcasts\n• Games\n\n📶 **WiFi:**\n• Available on international flights\n• Connect to SkyWay_WiFi network\n• Complimentary for Business & First Class\n• Economy: Small fee applies\n\n🔋 **USB charging ports** available at all seats on modern aircraft.`,
    suggestions: ['Seat classes', 'Flight prices', 'Search flights']
  }),

  duration: () => ({
    message: `⏱️ **Approximate Flight Durations:**\n\n🇵🇰 **Domestic:**\n• Karachi → Lahore: ~1h 30min\n• Karachi → Islamabad: ~2h\n• Lahore → Islamabad: ~1h\n\n🌍 **International:**\n• Karachi → Dubai: ~2h 30min\n• Karachi → Doha: ~3h\n• Karachi → Istanbul: ~6h 30min\n\n⚠️ Times are approximate and may vary due to weather, air traffic, and routing.`,
    suggestions: ['Search flights', 'Flight prices', 'Available airports', 'Check-in info']
  }),

  help: () => ({
    message: `🆘 **How Can I Help?**\n\nHere's everything I can assist with:\n\n✈️ **Flights** — Search, schedules, duration\n📋 **Booking** — How to book, seat selection\n❌ **Cancel** — How to cancel a booking\n🏢 **Airports** — All our destinations\n💰 **Prices** — Fares and charges\n💺 **Seats** — Classes and availability\n🧳 **Baggage** — Weight limits and rules\n🎫 **Check-in** — When and how to check in\n💳 **Payment** — Accepted methods\n👨‍👩‍👧 **Families** — Travelling with kids\n♿ **Special needs** — Assistance available\n\nJust type your question!`,
    suggestions: ['Search flights', 'Cancel booking', 'Baggage info', 'Airport info']
  }),

  account: () => ({
    message: `👤 **Account Help:**\n\n**📝 New User?**\n• Click **Sign Up** in the top right\n• Enter your name, email & password\n• Start booking immediately!\n\n**🔑 Existing User?**\n• Click **Login** in the top right\n• Enter your email & password\n\n**Your account lets you:**\n✅ Book flights\n✅ View & manage bookings\n✅ Cancel reservations\n✅ Access your profile\n\n🔒 Forgot password? Contact our support team.`,
    suggestions: ['How to book', 'My bookings', 'Cancel booking', 'Contact support']
  }),

  admin: () => ({
    message: `⚙️ **Admin Panel:**\n\nThe admin panel allows authorized users to:\n• 📊 View dashboard & statistics\n• ✈️ Add & manage flights\n• 🏢 Add & manage airports\n• 📋 View all bookings\n• 👥 Manage users\n\n🔐 Admin access requires special credentials.\nGo to **/admin/login** to access the admin panel.\n\nContact the system administrator for access.`,
    suggestions: ['Contact support', 'Search flights']
  }),

  default: () => ({
    message: `🤔 I'm not sure I understand that. But here's what I **can** help you with:\n\n✈️ Search & book flights\n❌ Cancel a booking\n🏢 Airport destinations\n💰 Flight prices\n🧳 Baggage rules\n🎫 Check-in info\n💳 Payment methods\n👨‍👩‍👧 Family travel\n\nTry typing something like:\n• "How do I cancel my booking?"\n• "What airports do you serve?"\n• "How much does a flight cost?"`,
    suggestions: ['Search flights', 'Cancel booking', 'Baggage info', 'Airport info', 'Flight prices']
  })
};

export const processChatMessage = async (message, user) => {
  const lowerMsg = message.toLowerCase().trim();

  // Check each category — longest match wins
  let bestMatch = null;
  let bestMatchLength = 0;

  for (const [category, keywords] of Object.entries(botKnowledge)) {
    for (const keyword of keywords) {
      if (lowerMsg.includes(keyword) && keyword.length > bestMatchLength) {
        bestMatch = category;
        bestMatchLength = keyword.length;
      }
    }
  }

  if (bestMatch) {
    const responseFunc = responses[bestMatch];
    return typeof responseFunc === 'function' ? responseFunc(user) : responseFunc;
  }

  return responses.default(user);
};