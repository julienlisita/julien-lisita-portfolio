// src/components/recruitment/JobApplicationForm.tsx

'use client';

import { useTransition } from 'react';
import Button from '../ui/Button';
import { sendApplication } from '@/app/(site)/recruitment/actions';
import './JobApplicationForm.css';
import Radio from '../form/Radio';
import FloatingInput from '../form/FloatingInput';
import FloatingTextarea from '../form/FloatingTextarea';
import FileUpload from '../form/FileUpload';

type JobApplicationFormProps = {
  jobTitle: string;
  /** Alignement du bouton CTA (appliqué à partir de lg) */
  ctaAlign?: 'left' | 'center' | 'right';
  className?: string;
};

export default function JobApplicationForm({
  jobTitle,
  ctaAlign = 'left',
  className,
}: JobApplicationFormProps) {
  const [isPending, startTransition] = useTransition();

  const alignClass =
    ctaAlign === 'center'
      ? 'text-center lg:text-center'
      : ctaAlign === 'right'
        ? 'text-center lg:text-right'
        : 'text-center lg:text-left';

  const onAction = (formData: FormData) => {
    startTransition(async () => {
      await sendApplication(jobTitle, formData);
    });
  };

  return (
    <form name="job-application" action={onAction} className={`job-form ${className ?? ''}`}>
      <h2 className="job-form-title">Postuler à : {jobTitle}</h2>

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

      {/* Prénom / Nom */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FloatingInput label="Prénom" name="prenom" type="text" required />
        <FloatingInput label="Nom" name="nom" type="text" required />
      </div>

      {/* Email */}
      <FloatingInput label="Email" name="email" type="email" required />

      {/* Message */}
      <FloatingTextarea label="Message" name="message" required />

      {/* Upload CV */}
      <FileUpload
        label="Joindre un CV"
        name="cv"
        accept=".pdf,.doc,.docx"
        helperText="Formats acceptés : PDF, DOC, DOCX (max 5 Mo)"
        droppable
      />

      {/* CTA */}
      <div className={`${alignClass} mt-6`}>
        <Button type="submit" variant="primary" disabled={isPending}>
          {isPending ? 'Envoi en cours…' : 'Envoyer la candidature'}
        </Button>
      </div>
    </form>
  );
}
