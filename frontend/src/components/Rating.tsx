'use client'
import React, { useState } from 'react';
import axios from 'axios';
const Rating: React.FC<{ courseId: string }> = ({ courseId }) => {
    const [rating, setRating] = useState(0); // State for the rating
    const [review, setReview] = useState(''); // State for the text input
    
    const handleRatingClick = (value: number) => {
        setRating(value); // Update the rating state
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Rating:', rating);
        console.log('Review:', review);
        await axios.post(
            'http://localhost:3333/rating/add',
            {
            courseId: courseId,
            rating: rating,
            review: review,
            },
            { withCredentials: true }
        );
        window.location.reload();
    };

    return (
        <form onSubmit={handleSubmit} className="mx-auto max-w-lg rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-center text-xl font-semibold">Đánh giá khóa học</h2>

            <div className="mb-4 flex justify-center">
                <div className="flex flex-row-reverse space-x-2 space-x-reverse">
                    {[5, 4, 3, 2, 1].map((value) => (
                        <svg
                            key={value}
                            onClick={() => handleRatingClick(value)}
                            className={`cursor-pointer text-gray-600 duration-100 hover:text-yellow-400 ${
                                rating >= value ? 'text-yellow-400' : ''
                            }`}
                            width="23"
                            height="23"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            ></path>
                        </svg>
                    ))}
                </div>
            </div>

            <textarea
                className="w-full rounded-md border p-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                rows={4}
                placeholder="Nhập đánh giá của bạn..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
            ></textarea>

            <button
                type="submit"
                className="mt-4 w-full rounded bg-yellow-400 px-4 py-2 font-bold text-white hover:bg-yellow-500"
            >
                Gửi đánh giá
            </button>
        </form>
    );
};

export default Rating;