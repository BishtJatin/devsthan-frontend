
import React, { useEffect } from 'react'

import Image from "next/image";
import styles from './about.module.css'
import Link from 'next/link';
const about = () => {

    useEffect(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                console.log('Text container is in view');
                entry.target.classList.add(styles.animate);
              } else {
                entry.target.classList.remove(styles.animate);
              }
            });
          },
          { threshold: 0.2 } // Trigger when 20% of the element is visible
        );
    
        const textContainer = document.querySelector(`.${styles['text-container']}`);
        const imagesContainer = document.querySelector(`.${styles['images-container']}`);
    
        if (textContainer) observer.observe(textContainer);
        if (imagesContainer) observer.observe(imagesContainer);
    
        return () => {
          if (textContainer) observer.unobserve(textContainer);
          if (imagesContainer) observer.unobserve(imagesContainer);
        };
      }, []);
    
      return (
        <section className={styles['about-us-section']}>
          <div className={styles['text-container']}>
            <p className={styles['subtitle']}>About Us</p>
            <h2 className={styles['title']}>Let’s know About Devsthan Expert</h2>
            <div className={styles['icons']}>
              <div className={styles['icon-item']}>
                <span className={styles['icon-text']}>🎯 Mission & Vision</span>
              </div>
              <div className={styles['icon-item']}>
                <span className={styles['icon-text']}>🤝 Focus On Customer</span>
              </div>
            </div>
            <p className={styles['description']}>
              Devsthan Expert Pvt. Ltd. is a premier travel company dedicated to crafting
              unforgettable journeys...
            </p>
            <Link href="/about">
              <button className={styles['button']}>More About</button>
            </Link>
          </div>
          <div className={styles['images-container']}>
            <div className={styles['image-wrapper']}>
              <Image
                src="https://res.cloudinary.com/dmyzudtut/image/upload/v1735376268/images/uxs5pgmanov5vyntgom4.webp"
                alt="Group"
                width={200}
                height={200}
                className={styles['about-images']}
              />
            </div>
            <div className={styles['image-wrapper']}>
              <Image
                src="https://res.cloudinary.com/dmyzudtut/image/upload/v1735376398/about_zlvr4e.jpg"
                alt="Resort"
                width={200}
                height={200}
                className={styles['about-images']}
              />
            </div>
            <div className={styles['image-wrapper']}>
              <Image
                src="https://res.cloudinary.com/dmyzudtut/image/upload/v1735376406/about2_yy6k9x.jpg"
                alt="Desert"
                width={200}
                height={200}
                className={styles['about-images']}
              />
            </div>
            <div className={styles['image-wrapper']}>
              <Image
                src="https://res.cloudinary.com/dmyzudtut/image/upload/v1735377308/about3_qul6sh.jpg"
                alt="Couple"
                width={200}
                height={200}
                className={styles['about-images']}
              />
            </div>
          </div>
        </section>
        )
}

export default about

