import { Suspense } from 'react';
import LoadingState from '@/components/result/LoadingState';
import ResultContent from './ResultContent';

export default function ResultPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <ResultContent />
    </Suspense>
  );

}

