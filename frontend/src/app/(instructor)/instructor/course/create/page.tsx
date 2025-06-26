'use client'
import useApi from "@/hooks/useApi"
import { useAppContext } from "@/contexts/AuthContext"
import React, { useState, useEffect } from "react"
import Image from "next/image"
import axios from "axios"
import { useRouter } from 'next/navigation'
import { z } from 'zod';
import {toast} from 'react-toastify'
import RichTextEditor from "@/components/TextEditor";
export type Category = {
  id: string,
  name: string
}
export type CourseLevel = 'Intermediate' | 'Advanced' | 'Beginner';
const NewCoursePage = () => {
    const { isAuthenticated, loading } = useAppContext()
    const router = useRouter()
    
  useEffect(() => {
    if (!loading && isAuthenticated === false) {
      router.push('/')
    }
  }, [isAuthenticated, router,loading])
  const [thumbnail, setPreviewImage] = useState<File  | null>(null)
  const [name,setName] = useState<string | null>(null)
  const [price,setPrice] = useState<number | null>(null)
  const [description,setContent] = useState<string | undefined>('')
  const [level,setLevel] = useState<string | null>("Beginner")
  const [category,setcategory] = useState<string | null>(null)
  const [displayPrice, setDisplayPrice] = useState<string>('');

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const raw = e.target.value.replace(/\./g, ''); // loại bỏ dấu chấm khi người dùng gõ
  const number = parseInt(raw, 10);

  if (isNaN(number)) {
    setPrice(null);
    setDisplayPrice('');
    return;
  }

  setPrice(number);
  setDisplayPrice(number.toLocaleString('vi-VN')); // thêm dấu . theo kiểu VN
};
const onChange = (content: string) => {
    setContent(content);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPreviewImage(e.target.files[0]);
    }
  }
  


// Define Zod schema for course validation
const CourseSchema = z.object({
  name: z.string().min(1, 'Tên khóa học không được để trống'),
  price: z.number().min(1000, 'Giá phải lớn hơn 1000 VND'),
  description: z.string().min(1, 'Mô tả không được để trống'),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced'], {
    errorMap: () => ({ message: 'Vui lòng chọn trình độ hợp lệ' })
  }),
  category: z.string().min(1, 'Vui lòng chọn danh mục'),
  thumbnail: z.instanceof(File).optional(),
});

// Inside your component, update hanldeSubmit
const hanldeSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const validated = CourseSchema.parse({
      name,
      price,
      description,
      level,
      category,
      thumbnail,
    });

    const formData = new FormData();
    formData.append('name', validated.name);
    formData.append('price', validated.price.toString());
    formData.append('description', validated.description);
    formData.append('level', validated.level);
    formData.append('category', validated.category);
    if (validated.thumbnail) {
      formData.append('thumbnail', validated.thumbnail);
    }

    await axios.post(`http://localhost:3333/course/create`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true
    });

    router.push('/instructor');
  } catch (error) {
    if (error instanceof z.ZodError) {
      toast.error('Lỗi dữ liệu: ' + error.errors[0].message);
    } else {
      console.error('Unexpected error', error);
    }
  }
};
  const { data } = useApi<Category[]>('category/get', { method: 'get' })

  return (
    <div className="flex w-full justify-center bg-gray-100 min-h-screen">
  <section className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 mt-20">
    <div className="flex items-start justify-between mb-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">Khóa học mới</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Hoàn thành các thông tin bên dưới để tạo khóa học mới của bạn
        </p>
      </div>
    </div>
    <form onSubmit={hanldeSubmit}>
      <div className="grid gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tên khóa học</label>
          <input
            type="text"
            className="mt-1 w-full px-4 py-2 border rounded-lg bg-white text-gray-800 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Giá(VND)</label>
            <input
            type="text"
            value={displayPrice}
            onChange={handlePriceChange}
            inputMode="numeric"
            className="mt-1 w-full px-4 py-2 border rounded-lg bg-white text-gray-800 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          </div>
          <div className="w-full md:w-1/3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Danh mục</label>
            <select
              className="mt-1 w-full px-4 py-2 border rounded-lg bg-white text-gray-800 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setcategory(e.target.value)}
            >
              <option disabled defaultValue={""}>--Danh mục--</option>

              {data?.map((item, index) => (
                <option key={index} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Trình độ</label>
            <select
              className="mt-1 w-full px-4 py-2 border rounded-lg bg-white text-gray-800 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setLevel(e.target.value)}
            >
              <option disabled defaultValue=''>--Chọn mức độ--</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mô tả khóa học</label>
          <div className="mt-2">
            <RichTextEditor content={description||""} onChange={onChange}/>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Ảnh khóa học</label>
          <div className="mt-3 border-2 border-dashed border-gray-300 dark:border-gray-600 p-6 rounded-lg flex flex-col items-center bg-gray-50 dark:bg-gray-700">
            <label className="cursor-pointer bg-blue-100 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-200">
              <span>Upload a file</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/gif"
              />
            </label>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">or drag and drop</p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-300">PNG, JPG, GIF up to 10MB</p>

            {thumbnail && (
              <div className="mt-4">
                <Image
                  src={URL.createObjectURL(thumbnail)}
                  alt="Preview"
                  width={200}
                  height={200}
                  className="rounded-md shadow-md"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 text-white bg-pink-500 rounded-lg hover:bg-pink-600 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  </section>
</div>

  )
}

export default NewCoursePage