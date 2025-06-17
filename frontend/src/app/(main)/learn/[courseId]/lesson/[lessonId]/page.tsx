'use client';
import VideoPlayer from "@/components/VideoPlayer";
import { Section } from "@/components/Section";
import { ISection } from "@/interfaces/models/course.interface";
import { ILesson } from "@/interfaces/models/course.interface";
import useApi from "@/hooks/useApi";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppContext } from "@/contexts/AuthContext";
import axios from "axios";
import { useCourseContext } from "@/contexts/CourseContext";
import Comment from "@/components/Comment";
import { RootComment } from "@/interfaces/models/comment.interface";
import htmlParser from 'html-react-parser';

const LearnPage = () => {
  const router = useRouter();
  const { courseId, lessonId } = useParams();
  const { isAuthenticated,loading } = useAppContext();
  const [showSummary,setShowSummary] = useState(false)
  const [comments, setComments] = useState<RootComment[] | null>([]);
  const [lesson, setLesson] = useState<ILesson | null>(null);
  const { data } = useApi<ISection[]>(`section/${courseId}`, { method: 'get' });

  useEffect(() => {
    const checkAuthentication = async () => {
      if (!loading && !isAuthenticated) {
        router.push('/login');
        return;
      }
    };

    checkAuthentication();

    const fetchLesson = async () => {
      const response = await axios.get(`http://localhost:3333/lesson/${lessonId}`, { withCredentials: true });
      setLesson(response.data);
    };

    const fetchComments = async () => {
      const response = await axios.get(`http://localhost:3333/comment/lesson=${lessonId}/comment`, { withCredentials: true });
      setComments(response.data);
    };

    if (isAuthenticated) {
      fetchLesson();
      fetchComments();
    }
  }, [lessonId, courseId, isAuthenticated, router,loading]);

  const { selectedCourse } = useCourseContext();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-gray-700 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-8 sm:py-12 lg:py-16">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">{selectedCourse?.name}</h1>
        </header>

        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
          <main className="lg:w-2/3 xl:w-3/4 space-y-8">
            <div className="w-full relative pb-[56.25%] overflow-hidden rounded-xl shadow-lg">
              <div className="absolute inset-0">
                <VideoPlayer url={lesson?.lessonVideo.videoUrl || ''} />
              </div>
            </div>
            <div className="mt-4">
          <button
            onClick={() => setShowSummary((prev) => !prev)}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition"
          >
            {showSummary ? 'Ẩn tóm tắt' : 'Hiển thị tóm tắt'}
          </button>

          {showSummary && (
            <div className="mt-4 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-bold mb-2 text-gray-800">Tóm tắt bài giảng</h3>
              <p className="text-gray-600 leading-relaxed">
                <>
                {htmlParser(lesson?.lessonVideo.summarize||"") || 'Chưa có tóm tắt cho bài giảng này.'}
                </>
              </p>
            </div>
          )}
        </div>
            <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{lesson?.name}</h2>
              <p className="text-gray-600 leading-relaxed">
                Nội dung mô tả chi tiết về khóa học, mục tiêu đào tạo và các yêu cầu cần thiết...
              </p>
            </section>
            <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <Comment comments={comments || []} lessonId={Array.isArray(lessonId) ? lessonId[0] : lessonId || ''} />
            </section>
          </main>

          <aside className="lg:w-1/2 xl:w-1/3">
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
                <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                  Nội dung khóa học
                </h2>
                <div className="space-y-3">
                  <Section
                    isDisable={false}
                    courseId={Array.isArray(courseId) ? courseId[0] : courseId}
                    sections={data ?? []}
                  />
                </div>
              </div>
              
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default LearnPage;
