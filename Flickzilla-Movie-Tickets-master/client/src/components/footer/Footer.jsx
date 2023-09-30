import React from 'react';
import Logo from "../../images/flicklogo.png";
import { Link } from "react-router-dom";
import Icons from "../icons/icons"
import { AiOutlineCopyrightCircle } from 'react-icons/ai';
import "./Footer.css";

const Footer = () => {
  return (
    <>
    <div className="bg-black text-white">
      <div className="container mx-auto py-8 px-20">
        <div className="flex items-center justify-between footer-top">
        <Link to="/" className="-m-1.5 p-1.5">
            <div className="md:text-xl lg:text-2xl xl:text-3xl">
            <img src={Logo} alt="flick" width="150px"/>
        </div>
            </Link>
          <div className="flex items-center space-x-4 footer-icons-help">
            <p className='footer-help'>
              <a href="/" className="text-gray-300 hover:text-white">Help</a>/
              <a href="/" className="text-gray-300 hover:text-white">Privacy Policy</a>
            </p>
            <div className="flex space-x-4">
              <Icons.Whatsapp size={40} className="text-black hover:text-pink2 bg-white bg-opacity-50 rounded-full p-2" />
              <Icons.Facebook size={40} className="text-black hover:text-pink2 bg-white bg-opacity-50 rounded-full p-2" />
              <Icons.Instagram size={40} className="text-black hover:text-pink2 bg-white bg-opacity-50 rounded-full p-2" />
              <Icons.Tiktok size={40} className="text-black hover:text-pink2 bg-white bg-opacity-50 rounded-full p-2" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
          <div>
            <h2 className="text-lg md:text-xl font-bold">Buy movie tickets easily with Flickzilla</h2>
            <button className="px-4 py-2 mt-4 get-your-ticket text-white rounded">
              Get Your Ticket
            </button>
          </div>
          <div>
            <span className="block text-lg font-bold text-pink2">Movies</span>
            <ul className="mt-2 space-y-2 effect-links">
            <li><a href='/'>Action</a></li>
              <li><a href='/'>Adventure</a></li>
              <li><a href='/'>Animation</a></li>
              <li><a href='/'>Comedy</a></li>
              <li><a href='/'>Crime</a></li>
            </ul>
          </div>
          <div>
            <span className="block text-lg font-bold text-pink2">Links</span>
            <ul className="mt-2 space-y-2 effect-links">
              <li><a href='/about'>About</a></li>
              <li><a href='/login'>My account</a></li>
              <li><a href='/contact'>Contact</a></li>
              <li><a href='/about'>About</a></li>
              <li><a href='/'>News</a></li>
            </ul>
          </div>
          <div>
            <span className="block text-lg font-bold text-pink2">Useful Links</span>
            <ul className="mt-2 space-y-2 effect-links">
              <li><a href='/'>Terms of Service</a></li>
              <li><a href='/'>FAQs</a></li>
              <li><a href='/'>Careers</a></li>
              <li><a href='/'>Feedback</a></li>
              <li><a href='/'>Support</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className='flex justify-center items-center bg-wblack111 text-gray-300 py-5'>
      <p className='flex justify-center items-center '>
        <AiOutlineCopyrightCircle className='mr-2'/>Copyright 2023 by<span className='flicklogo font-bold ml-1'>ESA Coding Lab Team</span>
        </p>
    </div>
    </>
  );
};

export default Footer;
