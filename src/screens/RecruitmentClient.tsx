// src/screens/RecruitmentClient.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Modal from '@/components/ui/Modal';
import JobApplicationForm from '@/components/recruitment/JobApplicationForm';

export default function RecruitmentClient() {
  const router = useRouter();
  const search = useSearchParams();
  const applyTitle = search.get('apply');
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    setOpen(Boolean(applyTitle));
  }, [applyTitle]);

  const close = () => {
    setOpen(false);
    router.replace('/recruitment', { scroll: false });
  };

  return (
    <div className="pt-8 sm:pt-10 md:pt-14 lg:pt-20">
      <Modal isOpen={isOpen} onClose={close}>
        <JobApplicationForm jobTitle={applyTitle ?? ''} />
      </Modal>
    </div>
  );
}
