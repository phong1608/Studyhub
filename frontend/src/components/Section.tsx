import type { ISection } from "@/interfaces/models/course.interface";
import { useRouter } from "next/navigation";
import { FaVideo } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";

const Section: React.FC<{ sections: ISection[] | undefined, courseId: string | undefined,isDisable:boolean }> = ({ sections, courseId,isDisable }) => {
    const router = useRouter(); 

    const handleLessonClick = (lessonId: string) => {
        router.push(`/learn/${courseId}/lesson/${lessonId}`); 
    };

    

    return (
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <ul>
                {sections && sections.length > 0 ? (
                    sections.map((section,index) => (
                        <li key={index} className="mb-4">
                            <details className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                                <summary className="text-xl font-semibold mb-2 cursor-pointer">
                                    {index+1}.{section.name}
                                </summary>
                                <ul className="mt-4">
                                    {section.lessons.length > 0 ? (
                                        section.lessons.map((lesson,idx) => (
                                            <li
                                                key={idx}
                                                className={`mb-2 flex justify-between items-center ${
                                                    isDisable ? "text-gray-500" : "cursor-pointer text-blue-500 hover:underline"
                                                }`}
                                                onClick={!isDisable ? () => handleLessonClick(lesson.id) : undefined}
                                            >
                                                <span>
                                                    {idx+1}.{lesson.name}
                                                </span>
                                                {lesson.lessonType === "Video" ? (
                                                    <FaVideo className={`inline-block ${isDisable ? "text-gray-500" : "text-blue-500"}`} />
                                                ) : (
                                                    <IoDocumentTextOutline className={`inline-block ${isDisable ? "text-gray-500" : "text-green-500"}`} />
                                                )}
                                            </li>
                                        ))
                                    ) : (
                                        <h2>No lessons available</h2>
                                    )}
                                </ul>
                            </details>
                        </li>
                    ))
                ) : (
                    <h1>No sections available</h1>
                )}
            </ul>
        </div>
    );
};

export { Section };