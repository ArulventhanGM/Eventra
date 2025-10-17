'use client';

import { motion } from 'framer-motion';

const sponsorLogos = [
  {
    id: 1,
    name: "TechCorp",
    logo: null,
    alt: "TechCorp - Technology Solutions",
    color: "bg-blue-500"
  },
  {
    id: 2,
    name: "InnovateLab",
    logo: null,
    alt: "InnovateLab - Innovation Hub",
    color: "bg-emerald-500"
  },
  {
    id: 3,
    name: "FutureTech",
    logo: null,
    alt: "FutureTech - Future Solutions",
    color: "bg-violet-500"
  },
  {
    id: 4,
    name: "DevSoft",
    logo: null,
    alt: "DevSoft - Software Development",
    color: "bg-amber-500"
  },
  {
    id: 5,
    name: "CloudBase",
    logo: null,
    alt: "CloudBase - Cloud Solutions",
    color: "bg-red-500"
  },
  {
    id: 6,
    name: "DataFlow",
    logo: null,
    alt: "DataFlow - Data Analytics",
    color: "bg-cyan-500"
  },
  {
    id: 7,
    name: "SmartSys",
    logo: null,
    alt: "SmartSys - Smart Systems",
    color: "bg-lime-500"
  },
  {
    id: 8,
    name: "NextGen",
    logo: null,
    alt: "NextGen - Next Generation Tech",
    color: "bg-orange-500"
  }
];

export default function SponsorCarousel() {
  // Duplicate the logos for seamless infinite scroll
  const duplicatedLogos = [...sponsorLogos, ...sponsorLogos];

  return (
    <section className="sponsor-carousel bg-white py-16 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Proud Sponsors</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Partnering with leading organizations to make amazing events possible
          </p>
        </motion.div>

        {/* Sponsor Logos Carousel */}
        <div className="relative overflow-hidden">
          <motion.div 
            className="flex gap-12 items-center"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              width: `${duplicatedLogos.length * 160}px`
            }}
          >
            {duplicatedLogos.map((sponsor, index) => (
              <motion.div
                key={`${sponsor.id}-${index}`}
                className="flex-shrink-0 group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`h-16 w-32 ${sponsor.color} rounded-lg flex items-center justify-center filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100`}>
                  <span className="text-white font-bold text-sm">{sponsor.name}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>


      </div>

      <style jsx>{`
        .sponsor-carousel {
          position: relative;
        }
        
        .sponsor-carousel::before,
        .sponsor-carousel::after {
          content: '';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 100px;
          height: 100%;
          background: linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0));
          z-index: 10;
          pointer-events: none;
        }
        
        .sponsor-carousel::before {
          left: 0;
        }
        
        .sponsor-carousel::after {
          right: 0;
          background: linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0));
        }
      `}</style>
    </section>
  );
}