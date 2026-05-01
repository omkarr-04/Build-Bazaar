"use client";

import "./Hero.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Speaker from "./images/category/speaker.png";
import VR from "./images/category/vr.png";
import Monitor from "./images/category/monitor.png";
import Garmin from "./images/category/garmin.png";

const slides = [
  {
    image: Speaker,
    title: "Speakers",
    subtitle: "Premium Sound",
    description: "Experience legendary audio quality",
  },
  {
    image: VR,
    title: "VR Headset",
    subtitle: "Virtual Reality",
    description: "Step into the future of gaming",
  },
  {
    image: Monitor,
    title: "Curved Monitor",
    subtitle: "Ultra Wide",
    description: "Immersive viewing experience",
  },
  {
    image: Garmin,
    title: "Smart Watch",
    subtitle: "Fitness Tracker",
    description: "Track your health and fitness",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleShopNow = () => {
    // Navigate to the shop page with the relevant category based on current slide
    const categories = {
      0: "/shop/speaker", // For Marshall Speaker
      1: "/shop/vr headsets", // For VR Headset
      2: "/shop/monitors", // For Curved Monitor
      3: "/shop/smart watch", // For Smart Watch
    };
    router.push(categories[currentSlide as keyof typeof categories]);
  };

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="slider-container">
            <button className="slider-button prev" onClick={prevSlide} aria-label="Previous slide">
              &#8249;
            </button>
            <div className="slider-content">
              <Image
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                width={400}
                height={400}
                priority
                className="hero-image"
                style={{ objectFit: "contain" }}
              />
              <div className="hero-text">
                <h2>{slides[currentSlide].title}</h2>
                <h3>{slides[currentSlide].subtitle}</h3>
                <p>{slides[currentSlide].description}</p>
                <button onClick={handleShopNow} className="btn">
                  Shop Now
                </button>
              </div>
            </div>
            <button className="slider-button next" onClick={nextSlide} aria-label="Next slide">
              &#8250;
            </button>
          </div>
          <div className="slider-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? "active" : ""}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
