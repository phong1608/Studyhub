'use client'
import { useState, ChangeEvent, useEffect } from "react";
import InputField from "@/components/InputField"; 
import { FaBook } from "react-icons/fa";
import { useParams } from "next/navigation";
import { ILesson } from "@/interfaces/models/course.interface";
import axios from "axios";
import { LuSave } from "react-icons/lu";
import { toast } from "react-toastify";
import VideoPlayer from "@/components/VideoPlayer";
import RichTextEditor from "@/components/TextEditor";
const EditLessonPage = ()=> {
  const [lesson, setLesson] = useState<ILesson>();
  const [loading,setLoading] = useState(false)
  const {lessonId} = useParams()
  const [summarize,setSummarize] = useState<string|null|undefined>(null)
  const [text,setText] = useState<string|null|undefined>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setLesson((prev:any) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
  const fetchLesson = async () => {
    setLoading(true)
    const response = await axios.get(`http://localhost:3333/lesson/${lessonId}`, { withCredentials: true });
    
    setLesson(response.data);
    const videoSummarize = response.data.lessonVideo?.summarize || "";
    const lessonText = response.data.lessonText?.content || "";

    if (response.data.lessonType === "Video") {
      setSummarize(videoSummarize);
    } else {
      setText(lessonText);
    }
    setLoading(false)
  };
  fetchLesson();
}, [lessonId]);
  const handleSubmit = async () => {
    try {
      setLoading(true)
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/lesson/update/${lessonId}`,{
        ...lesson,
        summarize:summarize
      },{withCredentials:true})
      setLoading(false)
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };
  console.log(lesson?.lessonType)
const generateSummarize = async () => {
  try {
    setLoading(true);
    const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVICE_API_URL}/summarizer`, {
      video_path: lesson?.lessonVideo.videoUrl,
    });
    setSummarize(res.data.message);
    toast.info("Tạo tóm tắt thành công")
    setLoading(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    toast.error(err.message);
  } finally {
    setLoading(false);
  }
};

 
const onChange = (content: string) => {
  if (lesson?.lessonType === "Video") {
    setSummarize(content);
  } else {
    setText(content);
  }
};

  return (
    <div className="max-w-2xl mx-auto p-6">
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-2xl font-bold">Chỉnh sửa bài học</h1>
    <button
      onClick={handleSubmit}
      disabled={loading}
      className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition text-sm font-medium shadow-sm"
    >
      Lưu thay đổi
    </button>
  </div>

  <InputField
    id="name"
    label="Tên bài học"
    value={lesson?.name || ''}
    onChange={handleChange}
    icon={<FaBook className="h-5 w-5 text-gray-400" />}
    required
  />
  <div className="w-full space-y-5 mb-5">
  {lesson?.lessonType == "Video" && (
    <>
      <button
        disabled={loading}
        onClick={generateSummarize}
        className="w-full sm:w-auto justify-center py-2.5 px-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out inline-flex items-center gap-2"
      >
        {loading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Đang tạo...
          </>
        ) : (
          <>
            <LuSave size={18} /> Tạo tóm tắt
          </>
        )}
      </button>

      <div className="w-full max-w-4xl mx-auto">
        <div className="relative w-full pt-[56.25%] rounded-xl shadow-lg overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <VideoPlayer url={lesson?.lessonVideo.videoUrl || ''} />
          </div>
        </div>
      </div>
    </>
  )}
</div>

{ 
  !loading?
  <RichTextEditor
    onChange={onChange}
    content={(lesson?.lessonType=="Video"?summarize:text)||""}
  />
  :
  <>
  <p className="">Dang load</p>
  </>
}
</div>

  );
};

export default EditLessonPage;
