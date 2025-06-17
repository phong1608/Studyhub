// contexts/CourseContext.tsx
'use client'
import { createContext, useContext, ReactNode,useState } from 'react';
import { CoursePreview } from '@/interfaces/models/course.interface';
type CourseContextType = {
  selectedCourse: CoursePreview | null;
  setSelectedCourse: (course: CoursePreview) => void;
};

const CourseContext = createContext<CourseContextType>({
  selectedCourse: null,
  setSelectedCourse: () => {}
});

export const useCourseContext = () => useContext(CourseContext);

export const CourseProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCourse, setSelectedCourse] = useState<CoursePreview | null>(null);

  return (
    <CourseContext.Provider value={{ selectedCourse, setSelectedCourse }}>
      {children}
    </CourseContext.Provider>
  );
};