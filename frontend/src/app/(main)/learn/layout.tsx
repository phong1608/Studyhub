// app/layout.tsx
import { CourseProvider } from '@/contexts/CourseContext';

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return (
    <CourseProvider>
      {children}
    </CourseProvider>
  );
}