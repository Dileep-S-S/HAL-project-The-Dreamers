import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import "../Styles/Footer.css"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Contact and Social Media in 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Contact Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-blue-400 mb-4">Contact Us</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-2 text-gray-300">
                <Phone size={20} />
                <p>+91 9347305063</p>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Mail size={20} />
                <p>khushalkishore@gmail.com</p>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin size={20} />
                <p>Bheemavaram, Andhra Pradesh, India - 534202</p>
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-blue-400 mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="p-3 bg-gray-800 rounded-full hover:bg-blue-500 transition-colors duration-300">
                <Facebook size={24} />
              </a>
              <a href="#" className="p-3 bg-gray-800 rounded-full hover:bg-blue-500 transition-colors duration-300">
                <Twitter size={24} />
              </a>
              <a href="#" className="p-3 bg-gray-800 rounded-full hover:bg-blue-500 transition-colors duration-300">
                <Linkedin size={24} />
              </a>
              <a href="#" className="p-3 bg-gray-800 rounded-full hover:bg-blue-500 transition-colors duration-300">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Platform Developers Section */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <h3 className="text-2xl font-semibold text-blue-400 mb-4">Platform Developers</h3>
          <div className="flex flex-wrap justify-center gap-6 text-gray-300">
            <span className="hover:text-blue-400 transition-colors duration-300">Bhaskara</span>
            <span className="hover:text-blue-400 transition-colors duration-300">B Harath</span>
            <span className="hover:text-blue-400 transition-colors duration-300">Khushal</span>
            <span className="hover:text-blue-400 transition-colors duration-300">Dileep</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Your Platform Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
