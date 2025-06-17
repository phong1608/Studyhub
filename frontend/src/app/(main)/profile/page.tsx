'use client'
import { useAppContext } from "@/contexts/AuthContext"
import Image from "next/image"
import { useState } from "react"
import { FaEdit } from "react-icons/fa";
import axios from 'axios'
const Page = ()=>{
      const [thumbnail, setPreviewImage] = useState<File  | null>(null)
      const {user} = useAppContext()
      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          setPreviewImage(e.target.files[0]);
        }
      }
      const [isEdit,setEdit ] = useState<boolean>(true)
      const [name, setName] = useState<string|undefined>(user?.name)
      const [bio, setBio] = useState<string|undefined>(user?.bio)
      const handleSave = async () => {
        console.log(name,bio)
        setEdit(true)
        const formData = new FormData()
        if(name)
        {
            formData.append('name', name) 
        }
        if(bio)
        {
            formData.append('bio', bio) 
        }
        if(thumbnail){
          formData.append('thumbnail', thumbnail)
        }
        try {
            const response = await axios.put('http://localhost:3333/user/me', formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                },
                withCredentials:true
            });
            console.log(response.data); 
        }
        catch (error) {
            console.error('Error uploading file:', error);
        }
      }
      
    return (
        <div className="bg-gray-100 ">
        <div className="max-w-7xl mx-auto p-4 mt-10">
            <div className="grid grid-cols-12 gap-6 mt-10">
                <div className="col-span-3 bg-white p-6 rounded-xl shadow">
                    <div className="flex flex-col items-center text-center">
                        {user?.profilePicture ?<Image src={user?.profilePicture} alt="Profile Picture" width={24} height={24} className="w-24 h-24 rounded-full" /> :
                        <Image src='/img/Avatar.jpg' alt="Profile Picture" width={24} height={24} className="w-24 h-24 rounded-full" />}
                        <h2 className="mt-4 text-lg font-semibold">John Doe</h2>
                    </div>
                     <div>
                        <div className="flex flex-col items-center text-sm text-gray-600 mt-4 p-4 border-2 border-dashed border-gray-300 rounded-md bg-white hover:bg-gray-50">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                            <span>Tải file lên</span>
                            <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleFileChange}
                            accept="image/png, image/jpeg, image/gif"
                            />
                        </label>
                        <p className="mt-2 text-black">or drag and drop</p>
                        </div>
                        <p className="mt-1 text-xs text-black">PNG, JPG, GIF </p>
        
                        {thumbnail && (
                        <div className="mt-4">
                            <Image
                            src={thumbnail ? URL.createObjectURL(thumbnail) : ''}
                            alt="Preview"
                            width={200} 
                            height={200} 
                            className="max-w-full h-auto rounded-md shadow-sm"
                            />
                        </div>
                        )}
                    </div>
                </div>
    
                <div className="col-span-9 bg-white p-6 rounded-xl shadow relative">
                    {isEdit ? (
                        <button 
                            onClick={() => setEdit(false)} 
                            className="absolute right-3 top-10 text-2xl text-indigo-500 hover:text-indigo-700"
                        >
                            <FaEdit />
                        </button>
                    ) : (
                        <button 
                            onClick={handleSave} 
                            className="absolute right-3 top-10 bg-indigo-500 text-white rounded-lg p-2 hover:bg-indigo-700"
                        >
                            Lưu
                        </button>
                    )}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col relative">
                            <label className="text-slate-900 text-xl font-bold font-['Inter'] leading-6 mb-2">Tên</label>
                            <input 
                                disabled={isEdit} 
                                defaultValue={user?.name}
                                onChange={(e => setName(e.target.value))} 
                                type="text" 
                                placeholder="Nhập tên" 
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            
                        </div>
                        <div className="flex flex-col col-span-2">
                            <label className="text-slate-900 font-bold text-xl  font-['Inter'] leading-6 mb-2">Mô tả</label>
                            <textarea onChange={(e)=>{setBio(e.target.value)}} defaultValue={user?.bio} disabled={isEdit} placeholder="Nhập mô tả" className="w-full p-3 border border-gray-300 rounded-lg h-28 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                        </div>
                    </div>
                    <div className="mt-5 max-w-[950px] w-full mx-auto h-auto p-6 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-slate-200 overflow-hidden">
                        <div className="text-slate-900 text-lg font-semibold font-['Inter'] leading-7 mb-4">Mạng xã hội</div>
                        <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <div className="text-slate-900 text-sm font-normal font-['Inter'] leading-tight">Website</div>
                            <input type="text" placeholder="Nhập Website" className="w-full p-4 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-slate-200"/>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                            <div className="text-slate-900 text-sm font-normal font-['Inter'] leading-tight">LinkedIn</div>
                            <input type="text" placeholder="Nhập LinkedIn" className="w-full p-4 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-slate-200"/>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                            <div className="text-slate-900 text-sm font-normal font-['Inter'] leading-tight">Facebook</div>
                            <input type="text" placeholder="Nhập Facebook" className="w-full p-4 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-slate-200"/>
                        </div>
                        </div>
                    </div>
                </div>
                
            </div>
       

        </div>
        
    </div>
)
}
export default Page