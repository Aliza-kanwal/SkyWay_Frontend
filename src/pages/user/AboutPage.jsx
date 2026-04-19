import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaPlane, 
  FaGlobe, 
  FaUsers, 
  FaAward, 
  FaHeart, 
  FaShieldAlt,
  FaRocket,
  FaHandsHelping,
  FaTree
} from 'react-icons/fa';

const AboutPage = () => {
  const stats = [
    { icon: FaPlane, value: '500K+', label: 'Flights Annually' },
    { icon: FaGlobe, value: '150+', label: 'Countries' },
    { icon: FaUsers, value: '10M+', label: 'Happy Customers' },
    { icon: FaAward, value: '25+', label: 'Industry Awards' },
  ];

  const values = [
    { icon: FaHeart, title: 'Customer First', desc: 'Your comfort and satisfaction are our top priorities' },
    { icon: FaShieldAlt, title: 'Safety First', desc: 'Rigorous safety standards and maintenance protocols' },
    { icon: FaRocket, title: 'Innovation', desc: 'Constantly improving with cutting-edge technology' },
    { icon: FaHandsHelping, title: 'Community', desc: 'Giving back to the communities we serve' },
    { icon: FaTree, title: 'Sustainability', desc: 'Committed to reducing our environmental impact' },
    { icon: FaUsers, title: 'Diversity', desc: 'Celebrating diversity in our team and passengers' },
  ];

  const team = [
    { name: 'Sarah Iqbal', role: 'CEO & Founder', image: '👩‍✈️', bio: 'Former pilot with 20 years experience' },
    { name: 'Mohammad Ali', role: 'Chief Operations Officer', image: '👨‍✈️', bio: 'Aviation expert from Singapore Airlines' },
    { name: 'Ali Saqlain', role: 'Customer Experience Director', image: '👩‍💼', bio: 'Passionate about service excellence' },
    { name: 'Haris Shakeel', role: 'Head of Safety', image: '👨‍🔧', bio: 'Ensuring the highest safety standards' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100/50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        
        <div className="relative container mx-auto px-4 py-24 text-center">
    <motion.h1 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-5xl md:text-6xl font-bold mb-6"
    >
      About SkyWay
    </motion.h1>
    <motion.p 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="text-xl text-blue-100 max-w-3xl mx-auto"
    >
      Since 1995, we've been connecting people, cultures, and dreams across the 
      globe. Your journey is our passion.
    </motion.p>
  </div>

        {/* Stats Section - Overlapping Cards */}
        <div className="container mx-auto px-4 -mb-32 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 text-center
                         border border-white/20 hover:transform hover:scale-105 
                         transition-all duration-300"
              >
                <stat.icon className="text-4xl text-blue-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Spacer for overlapping cards */}
      <div className="h-32"></div>

      {/* Our Story Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Our Story
              </span>
            </h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Founded in 1995 by former pilot Sarah Johnson, SkyWay began with a simple vision: 
              to make air travel comfortable, affordable, and memorable for everyone.
            </p>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              What started as a single route between New York and Los Angeles has grown into 
              one of the world's most trusted airlines, serving over 150 destinations across 
              6 continents.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Today, we're proud to be recognized as a leader in aviation innovation, customer 
              satisfaction, and sustainable practices. But our mission remains the same: to 
              make every journey extraordinary.
            </p>
            
            <div className="flex space-x-4">
              <div className="flex -space-x-2">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 
                                        rounded-full border-2 border-white flex items-center 
                                        justify-center text-white font-bold">
                    {['SJ', 'MC', 'EW', 'DR'][i-1]}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm text-gray-500">Meet our leadership team</p>
                <p className="text-sm font-semibold text-gray-800">25+ years of combined experience</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 
                            border border-blue-100/50">
                <span className="text-4xl mb-2 block">✈️</span>
                <h3 className="font-bold text-gray-800">30 Years</h3>
                <p className="text-sm text-gray-600">of excellence in aviation</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 
                            border border-blue-100/50">
                <span className="text-4xl mb-2 block">🌍</span>
                <h3 className="font-bold text-gray-800">6 Continents</h3>
                <p className="text-sm text-gray-600">connecting the world</p>
              </div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 
                            border border-blue-100/50">
                <span className="text-4xl mb-2 block">👥</span>
                <h3 className="font-bold text-gray-800">15,000+</h3>
                <p className="text-sm text-gray-600">dedicated employees</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 
                            border border-blue-100/50">
                <span className="text-4xl mb-2 block">🏆</span>
                <h3 className="font-bold text-gray-800">25 Awards</h3>
                <p className="text-sm text-gray-600">and counting</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="bg-white/50 backdrop-blur-sm py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-4"
          >
            Our Core Values
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12"
          >
            These principles guide everything we do, every single day
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 
                         border border-blue-100/50 hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 
                              rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Leadership Team */}
      <div className="container mx-auto px-4 py-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-4"
        >
          Meet Our Leadership
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12"
        >
          Experienced professionals dedicated to your safety and comfort
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden
                       border border-blue-100/50 group"
            >
              <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-8xl transform group-hover:scale-110 transition-transform">
                    {member.image}
                  </span>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white mb-4"
          >
            Ready to Fly With Us?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
          >
            Join millions of satisfied travelers and experience the SkyWings difference
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg
                     hover:shadow-2xl transition-all duration-300"
          >
            Book Your Flight Now
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;