'use client'
import useApi from "@/hooks/useApi"
import { useAppContext } from "@/contexts/AuthContext"
import React, { useState, useEffect,useRef } from "react"
import JoditEditor from 'jodit-react';
import Image from "next/image"
import axios from "axios"
import { useRouter } from 'next/navigation'
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
  const editor = useRef(null)
  const [level,setLevel] = useState<string | null>(null)
  const [category,setcategory] = useState<string | null>(null)


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPreviewImage(e.target.files[0]);
    }
  }


  const hanldeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()


    const formData = new FormData();
    formData.append('name', name || '');
    formData.append('price', price ? price.toString() : '');
    formData.append('description', description || '');
    formData.append('level', level || '');
    formData.append('category', category || '');
    if (thumbnail) {
      formData.append('thumbnail', thumbnail);
    }

    await axios.post(`${process.env.NEXT_PUBLIC_URL}/course/create`, formData, {
      headers: {
      'Content-Type': 'multipart/form-data',
      },
      withCredentials: true
    });
    router.push('/instructor')

  }
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Giá</label>
            <input
              type="number"
              className="mt-1 w-full px-4 py-2 border rounded-lg bg-white text-gray-800 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPrice(e.target.value ? parseFloat(e.target.value) : null)}
            />
          </div>
          <div className="w-full md:w-1/3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Danh mục</label>
            <select
              className="mt-1 w-full px-4 py-2 border rounded-lg bg-white text-gray-800 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setcategory(e.target.value)}
            >
              <option disabled selected>--Danh mục--</option>

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
              <option disabled selected>--Chọn mức độ--</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mô tả khóa học</label>
          <div className="mt-2">
            <JoditEditor  ref={editor}  onChange={(e) => setContent(e)} />
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
