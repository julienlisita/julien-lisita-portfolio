// src/components/contact/contactForm.tsx

'use client';

import Button from '../ui/Button';
import FloatingInput from '../form/FloatingInput';
import FloatingTextarea from '../form/FloatingTextarea';
import { sendContact } from '@/app/(site)/contact/actions';
import './ContactForm.css';
import Radio from '../form/Radio';

type ContactFormProps = {
  /** Alignement du bouton CTA (appliqué à partir de lg) */
  ctaAlign?: 'left' | 'center' | 'right';
  className?: string;
};

export default function ContactForm({ ctaAlign = 'left', className }: ContactFormProps) {
  // mapping responsive : mobile = center, desktop selon prop
  const alignClass =
    ctaAlign === 'center'
      ? 'text-center lg:text-center'
      : ctaAlign === 'right'
        ? 'text-center lg:text-right'
        : 'text-center lg:text-left';

  return (
    <form name="contact" action={sendContact} className={`contact-form ${className ?? ''}`}>
      {/* honeypot anti-spam */}
      <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

      {/* Civilité */}
      <div className="mb-4">
        <span className="block mb-2 font-medium">Civilité</span>
        <div className="flex flex-wrap gap-6">
          <Radio name="civilite" value="Mme" label="Mme" />
          <Radio name="civilite" value="M." label="M." />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FloatingInput label="Prénom" name="prenom" type="text" required />
        <FloatingInput label="Nom" name="nom" type="text" required />
      </div>
      <FloatingInput label="Email" name="email" type="email" required />
      <FloatingTextarea label="Message" name="message" required />

      {/* CTA : centré mobile, prop appliquée desktop */}
      <div className={alignClass}>
        <Button type="submit" variant="primary">
          Envoyer
        </Button>
      </div>
    </form>
  );
}
