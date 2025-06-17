'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import {z} from 'zod'
import { FiMail, FiLock, FiBookOpen, FiLogIn } from 'react-icons/fi'
import Link from 'next/link';

const LoginPage: React.FC = () => {
    const {login,isAuthenticated} = useAppContext()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const loginSchema = z.object({
            email: z.string().email('Email không hợp lệ'),
            password: z.string().nonempty('Mật khẩu không được để trống')
        })
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const validation = loginSchema.safeParse({ email, password })
        if (!validation.success) {
            const formattedError = validation.error.errors[0]?.message || 'Invalid input'
            setError(formattedError)
            return
        }
    
        setError('') // clear lỗi cũ
        try{
            await login({ email, password }) 
        }
        catch(err){
            console.log(err)
            setError('Đăng nhập thất bại')
        }

    }
    
    useEffect(() => {
    if (isAuthenticated) {
        router.push('/')
    }
    
    }, [isAuthenticated, router])
    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-sky-100 to-emerald-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 md:p-12 w-full max-w-md space-y-6 transform transition-all duration-500 hover:scale-[1.02]">
                <div className="flex flex-col items-center space-y-4">
                    <div className="bg-indigo-600 text-white p-4 rounded-full shadow-md">
                        <FiBookOpen size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-center text-gray-800">Chào mừng</h2>
                    <p className="text-center text-gray-500">Đăng nhập để tiếp tục học</p>
                </div>

                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
                        <p>{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiMail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email "
                            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                            required
                        />
                    </div>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiLock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Mật khẩu"
                            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                            required
                        />
                    </div>
                    
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                        >
                            <FiLogIn size={18} />
                            <span>Đăng nhập</span>
                        </button>
                    </div>
                </form>
                <p className="text-center text-sm text-gray-600">
                    Không có tài khoản?{' '}
                    <Link href={"/signup"} className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-200">
                        Đăng ký ngay
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;