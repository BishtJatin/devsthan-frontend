
import React, { useState,useEffect } from 'react';
import styles from '../header/header.module.css';
import { FaRegUser } from "react-icons/fa6";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { FiPhoneCall } from "react-icons/fi";

import Link from 'next/link';
import MobileMenu from '../mobileMenue/mobileMenue';

const Header = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user login status

  // Check login status when the component mounts
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    // Check if the user is logged in
    if (userId && token) {
      setIsLoggedIn(true); // User is logged in
    } else {
      setIsLoggedIn(false); // User is not logged in
    }
  }, []); // Run once when the component mounts

  // Handle logout
 

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <header className={styles['header-container']}>
        <div className={styles['logo-container']}>
          <Link href="/">
            <img 
              src='https://res.cloudinary.com/dmyzudtut/image/upload/v1731261401/Untitled_design_11_dlpmou.jpg' 
              alt="TripRex" 
              className={styles['logo']} 
            />
          </Link>
        </div>
        <nav className={styles['nav-menu']}>
          <ul>

            <li><Link className={styles['nav-link']} href="/tours/allTours">Tours</Link></li>
            <li><Link className={styles['nav-link']} href="/about">About</Link></li>
            <li><Link className={styles['nav-link']} href="/destinations">Destinations</Link></li>
            <li><Link className={styles['nav-link']} href="/blogs">Blogs</Link></li>
            <li><Link className={styles['nav-link']} href="/contact">Contact Us</Link></li>
          </ul>
        </nav>
        
        <div className={styles['header-right-option']}>
          {isLoggedIn ? (
            <Link href="/profile">
              <p className={styles['profile-link']}>
                <FaRegUser className={styles['profile-icon']} />
              </p>
            </Link>
          ) : (
            <div className={styles['auth-links']}>
              <Link className={styles['login-link']} href="/login">
                <p >Login</p>
              </Link>
              <span>/</span>
              <Link className={styles['login-link']} href="/sign-up">
                <p >Sign up</p>
              </Link>
            </div>
          )}

          {/* Logout Button for Logged In Users */}
          {/* {isLoggedIn && (
            <button onClick={handleLogout} className={styles['logout-btn']}>
              Log Out
            </button>
          )} */}

          {/* Hamburger Menu */}
          <HiOutlineMenuAlt3 
            className={styles['hamburger']} 
            onClick={toggleMenu} 
          />
        </div>
      </header>
      <MobileMenu isOpen={menuOpen} toggleMenu={toggleMenu}  isLoggedIn={isLoggedIn}/>
    </>
  );

};

export default Header;
