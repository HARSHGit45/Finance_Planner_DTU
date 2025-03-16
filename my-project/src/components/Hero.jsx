import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import hero2 from '../assets/hero2.svg';
import hero1 from '../assets/hero1.png';

const Hero = () => {
  return (
    <div className="min-h-screen bg-[#012c23] overflow-hidden">
      <div className="relative">
        <Navbar />
        
        <div className="container mx-auto px-6 pt-16 pb-32 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-white max-w-xl">
              <motion.h1 
                className="head text-6xl font-bold leading-[1.1] mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                How will you spend your{' '}
                <div className="relative inline-block">
                    <span className="relative">
                        <span className="absolute top-14 left-0 w-full h-[6px] rounded-sm bg-[#4a7c00]"></span>
                        <span className=" font-semibold">money</span>
                    </span>
                </div>

                {' '}life?
              </motion.h1>
              
              <motion.p 
                className="text-xl mb-8 text-white/90 font-semibold italic"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Create a friendly, flexible plan and spend it well with FinancePro.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-2"
              >
                <Link 
                  to="/signup"
                  className="inline-block border-2 border-orange-50 text-white px-6 py-2 rounded-xl font-medium text-lg hover:bg-[#0b5223] transition-colors"
                >
                  Start Your Free Trial
                </Link>
                <p className="text-sm text-white/80">
                  It's easy! No credit card required.
                </p>
              </motion.div>
            </div>
            
            <div className="relative mt-24 w-full max-w-[500px] mx-auto">
    
              <img 
                src={hero2} 
                alt="Budget Interface Foreground" 
                className="relative w-full left-6 transform rotate-5 z-10 scale-115"
              />
              
          
              <motion.img 
                src={hero1} 
                alt="Budget Interface Background" 
                className="absolute -top-8 w-[130vh] h-[60vh] transform rotate-6 scale-y-150"
                animate={{ 
                  y: [0, -12, 0],
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  repeatType: "mirror",
                  ease: "easeInOut" 
                }}
              />
              
              
              <motion.div 
                className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 w-64 h-8 bg-black blur-lg rounded-full z-0"
                animate={{ 
                  opacity: [0.15, 0.25, 0.15],
                  width: ['64%', '58%', '64%'],
                  height: ['8px', '6px', '8px']
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  repeatType: "mirror", 
                  ease: "easeInOut" 
                }}
              ></motion.div>
            </div>
          </div>
        </div>
        
        {/* Dual Wave Decoration */}
        <div className="absolute -bottom-28 left-0 right-0">
          {/* Back Wave */}
          <svg 
            viewBox="0 0 1440 320" 
            className="w-full absolute bottom-2 opacity-50"
            preserveAspectRatio="none"
          >
            <path 
              fill="#fff3e0" 
              fillOpacity="1" 
              d="M0,224L48,213.3C96,203,192,181,288,160C384,139,480,117,576,133.3C672,149,768,203,864,208C960,213,1056,171,1152,154.7C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>

          {/* Front Wave */}
          <svg 
            viewBox="0 0 1440 320" 
            className="w-full relative"
            preserveAspectRatio="none"
          >
            <path 
              fill="#fff3e0" 
              fillOpacity="1" 
              d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,224C672,213,768,171,864,149.3C960,128,1056,128,1152,133.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Hero;
