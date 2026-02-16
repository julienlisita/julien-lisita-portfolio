// src/components/auth/LoginFormSection.tsx

import Section from '../layout/Section';
import SectionWrapper from '../layout/SectionWrapper';
import LoginForm from '@/components/form/LoginForm';
import './LoginFormSection.css';

export default function LoginFormSection() {
  return (
    <Section className="login-section">
      <SectionWrapper>
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm border border-neutral-200 p-6 sm:p-8">
            <h2 className="text-lg font-semibold mb-2 text-center">Connexion admin</h2>
            <p className="text-sm text-neutral-600 mb-6 text-center">
              Cet espace est réservé aux administrateurs du site.
            </p>

            <LoginForm />
          </div>
        </main>
      </SectionWrapper>
    </Section>
  );
}
