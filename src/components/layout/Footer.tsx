// src/components/layout/Footer.tsx

import Link from 'next/link';
import Image from 'next/image';
import { FiFacebook, FiInstagram } from 'react-icons/fi';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      {/* Bloc principal */}
      <div className="footer-top">
        {/* Logo */}
        <div className="footer-logo">
          <Image
            src="/images/logo-white.png"
            alt="Logo du site"
            width={226}
            height={100}
            className="h-full w-auto"
          />
        </div>

        {/* Menu principal */}
        <nav className="footer-nav">
          <Link href="/">Accueil</Link>
          <Link href="/a-propos">À propos</Link>
          <Link href="/services">Services</Link>
          <Link href="/realisations">Réalisations</Link>
          <Link href="/tarifs">Tarifs</Link>
          <Link href="/a-propos">À propos</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        {/* Réseaux sociaux */}
        <div className="footer-socials">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Suivez-nous sur Facebook"
          >
            <FiFacebook className="footer-icon" aria-hidden="true" />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Suivez-nous sur Instagram"
          >
            <FiInstagram className="footer-icon" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Séparateur */}
      <div className="footer-separator" />

      {/* Bloc inférieur */}
      <div className="footer-bottom">
        <p className="footer-copy">
          © {new Date().getFullYear()} Nom de l’entreprise – Tous droits réservés
        </p>
        <nav className="footer-legal">
          <Link href="/legal/imprint">Mentions légales</Link>
          <Link href="/legal/privacy">Politique de confidentialité</Link>
          <Link href="/legal/term">Conditions d'utilisation</Link>
          <Link href="/admin" className="footer-admin-link">
            Espace admin
          </Link>
        </nav>
      </div>
    </footer>
  );
}
