// src/components/home/Hero.tsx

import Button from '@/components/ui/Button';
import './Hero.css';
import Image from 'next/image';
import heroImage from '../../../public/images/home/hero.png';

export default function Hero({ showBackground = true }: { showBackground?: boolean }) {
  return (
    <section className="hero-section" aria-labelledby="home-hero-title">
      {/* Image de fond */}
      {showBackground && (
        <div className="hero-bg" aria-hidden="true">
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-bg__img"
            placeholder="blur"
            quality={80}
          />
          <div className="hero-bg__overlay" />
        </div>
      )}
      <div className="hero-container">
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="/images/logo-white.png"
            alt="Logo du site"
            width={226}
            height={100}
            className="h-20 sm:h-24 w-auto"
            priority
          />
        </div>

        {/* Titre */}
        <h1 id="home-hero-title" className="hero-title">
          Mettre en valeur votre activité avec un site professionnel
        </h1>

        {/* Tagline*/}
        <p className="hero-subtitle">Un design clair, responsive et rapide à mettre en place.</p>

        {/* CTAs */}
        <div className="hero-actions">
          <Button variant="primary" href="/contact">
            Demander un devis
          </Button>
          <Button variant="secondary" href="/portfolio">
            Voir des exemples
          </Button>
        </div>
      </div>
    </section>
  );
}
