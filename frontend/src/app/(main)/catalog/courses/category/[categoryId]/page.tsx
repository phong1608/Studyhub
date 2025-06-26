'use client'
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";
import { Course } from "@/interfaces/models/course.interface";
import Image from "next/image";
import Link from "next/link";

const CategoryPage = () => {
  const router = useRouter();
  const [filters, setFilters] = useState<{
    totalRating: string;
    level: string;
    price: string;
  }>({
    totalRating: "",
    level: "",
    price: "",
  });
  const [categoryName, setCategoryName] = useState<string>("");

  const [courses, setCourses] = useState<Course[]>([]);
  const { categoryId } = useParams();
  const updateQuery = async () => {
    const query = {
      ...(filters.totalRating && { totalRating: filters.totalRating }),
      ...(filters.level && { level: filters.level }),
      ...(filters.price && { price: filters.price }),
    };

    const queryString = new URLSearchParams(query).toString();
    router.push(`${window.location.pathname}?${queryString}`);
    try {
      const response = await axios.get(
        `http://localhost:3333/course/category/${categoryId}/page=1?${queryString}`
      );
      const categoryData = await axios.get(
        `http://localhost:3333/category/${categoryId}`
      );
      if (!categoryData.data || categoryData.data.length === 0) {
        router.push("/404");
        return;
      }
      setCourses(response.data);
      setCategoryName(categoryData.data.name);
    } catch (error) {
      router.push("/404");
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    updateQuery();
    console.log(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handleFilterChange = (type: string, value: string) => {
    setFilters((prev) => {
      return { ...prev, [type]: value };
    });
  };

  return (
    <div className="bg-white my-10">
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1
            className="flex items-center gap-2 text-4xl text-cyan-500 hover:text-gray-800"
          >
          {categoryName}
          </h1>
        </div>
        <div className="flex gap-6">
          <div className="w-1/4 bg-white p-6 rounded-lg shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Bộ lọc</h2>
              {filters.totalRating || filters.level || filters.price ? (
                <button
                  className="bg-white text-violet-500 px-4 py-2 rounded hover:text-violet-700 transition-all"
                  onClick={() =>
                    setFilters({ totalRating: "", level: "", price: "" })
                  }
                >
                  Bỏ bộ lọc
                </button>
              ) : null}
            </div>

            <details className="mb-6">
              <summary className="font-semibold cursor-pointer">Đánh giá</summary>
              <ul className="space-y-2 mt-2">
                {["5", "4", "3", "2"].map((rating) => (
                  <li key={rating}>
                    <input
                      type="radio"
                      name="totalRating"
                      className="mr-2"
                      onChange={() => handleFilterChange("totalRating", rating)}
                      checked={filters.totalRating === rating}
                    />{" "}
                    {"★".repeat(Number(rating)) +
                      "☆".repeat(5 - Number(rating))}
                  </li>
                ))}
              </ul>
            </details>
            <hr className="my-4 border-gray-300" />

            {/* Cấp độ */}
            <details className="mb-6">
              <summary className="font-semibold cursor-pointer">Cấp độ</summary>
              <ul className="space-y-2 mt-2">
                {["Beginner", "Intermediate", "Advanced"].map((level) => (
                  <li key={level}>
                    <input
                      type="radio"
                      name="level"
                      className="mr-2"
                      onChange={() => handleFilterChange("level", level)}
                      checked={filters.level === level}
                    />
                    {level}
                  </li>
                ))}
              </ul>
            </details>
            <hr className="my-4 border-gray-300" />

            {/* Giá */}
            <details className="mb-6">
              <summary className="font-semibold cursor-pointer">Giá</summary>
              <ul className="space-y-2 mt-2">
                {["0-50", "50-100", "100-150", "150+"].map((price) => (
                  <li key={price}>
                    <input
                      type="radio"
                      className="mr-2"
                      name="price"
                      onChange={() => handleFilterChange("price", price)}
                      checked={filters.price === price}
                    />{" "}
                    {price === "150+" ? "$150+" : `$${price.replace("-", " - $")}`}
                  </li>
                ))}
              </ul>
            </details>
          </div>

          <div className="flex-1">
    {courses.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white border border-gray-200 p-5 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-transform"
                ><Link href={`/catalog/courses/${course.id}`}>
                  <Image
                    src={course.thumbnail}
                    alt="Course Image"
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                </Link>
                  <h2 className="font-semibold text-xl mt-3 text-gray-900">
                    {course.name}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">Bởi Hoàng Văn</p>
                  <p className="text-yellow-500 mt-1">★★★★★</p>
                  <p className="text-sm text-gray-600 mt-1">
                    22 Giờ • 15 Bài học • Beginner
                  </p>
                    <p className="font-bold text-lg mt-3 text-gray-800">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.price)}
                    </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              Không tìm thấy khóa học phù hợp.
            </p>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};
export default CategoryPage;