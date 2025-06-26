'use client';
import React, {  useEffect, useState } from 'react';
import useApi from '@/hooks/useApi';
interface Course {
  id: string;
  name?: string;
}

interface Discount {
  id: string;
  code: string;
  type: string; // Giả định chỉ có 2 loại
  amount: number;
  public: boolean;
  expiredAt: Date; // hoặc Date nếu bạn sẽ parse sang Date
  status: string; // hoặc string nếu có thể có nhiều trạng thái hơn
  updatedAt: string;
  course: Course;
}
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // import CSS mặc định của calendar
import axios from 'axios';



const IndexPage: React.FC = () => {
    const course = useApi<Course[]>(`course/me`,{method:'GET',withCredentials:true})
    const [isUpdated, setIsUpdated] = useState(false);
 
    const [expiryDate, setExpiryDate] = useState<Date | null>(new Date());
    useEffect(()=>{
        const fetchData=async()=>{

            const res=await axios.get("http://localhost:3333/discount/all",{withCredentials:true})
            setDiscount(res.data)
        }
        fetchData()
    },[isUpdated])
  const [showCalendar, setShowCalendar] = useState(false); // để bật/tắt calendar
  const [type,setType] = useState<string>('Fixed')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [currentDiscount, setCurrentDiscount] = useState<Discount | null>(null);
  const [discounts,setDiscount]=useState<Discount[]|null>(null)
  const [code, setCode] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [courseId,setCourseId] = useState<string>('')
  const openAddModal = () => {
    setModalMode('add');
    setCode('');
    setAmount(0);
    setDescription('');
    setCurrentDiscount(null);
    setIsModalOpen(true);
  };
  const openEditModal = (discount: Discount) => {
    setModalMode('edit');
    setCode(discount.code);
    // setPercentage(discount.percentage);
    // setDescription(discount.description);
    setCurrentDiscount(discount);
    setIsModalOpen(true);
  };
//{ code, courseId, amount, type, status, expiredAt, public: isPublic }
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (modalMode === 'add') {
        const addDiscount = {
            code,
            amount,
            type,
            public:true,
            courseId:courseId,
            expiredAt:expiryDate,
            status:'Active'
    
        };
        await axios.post('http://localhost:3333/discount/create',addDiscount,{withCredentials:true})
        setIsUpdated(prev=>!prev)
        
    } 
    else if (modalMode === 'edit' && currentDiscount) {
    //   const updatedDiscount = {
    //     code,
    //     amount,
    //     type,
    //     public:true,
    //     courseId:courseId,
    //     expiredAt:expiryDate,
    //     status:'Active'

    //   };
    }
    setIsModalOpen(false);
    console.log(expiryDate?.toLocaleDateString())
  };

  // const handleDelete = (id: number) => {
  //   setDiscounts(discounts.filter(d => d.id !== id));
  // };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Quản lý khuyến mãi</h1>
        <button
          onClick={openAddModal}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
        >
          Thêm khuyến mãi
        </button>
        <div className="bg-white shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên khóa học
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Loại
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khoảng
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày hết hạn
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Điều chỉnh
                </th>
                
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {discounts&&discounts?.map(d => (
                <tr key={d.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{d.code}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{d.course.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{d.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{d.type=="Fixed"?d.amount.toLocaleString('de-DE'):(`${d.amount}%` )}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{d.status}</td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(d.expiredAt).toLocaleDateString('vi-VN')}</td>

                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => openEditModal(d)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                        Chỉnh sửa
                    </button>
                    <button
                      // onClick={() => handleDelete(d.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed overflow-hidden inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {modalMode === 'add' ? 'Add Discount' : 'Edit Discount'}
            </h2>
            <form onSubmit={handleSubmit} >
            <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="percentage">
                  Khóa học 
                </label>
              {modalMode=="add"&&
              
              <select onChange={(e)=>setCourseId(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300">
                <option disabled >--- Chọn khóa học ---</option>
                {course.data && course.data.map((item) => (
                  <option
                    key={item.id}
                    value={item.id}
                    className="truncate text-ellipsis overflow-hidden whitespace-nowrap"
                  >
                    {item.name}
                  </option>
                ))}
            </select>
              }
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="code">
                  Code mã khuyến mãi
                </label>
                <input
                  id="code"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="percentage">
                  Loại khuyến mãi
                </label>
                <select onChange={(e)=>setType(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300">
                <option disabled  >--- Chọn loại khuyến mãi ---</option>
                  <option value="Percentage" className="truncate text-ellipsis overflow-hidden whitespace-nowrap">Theo phần trăm</option>
                  <option value="Fixed" className="truncate text-ellipsis overflow-hidden whitespace-nowrap">Cố định</option>

                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="percentage">
                  Định mức 
                </label>
                <input  
                  id="percentage"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="description">
                  Description
                </label>
                <input
                  id="description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-4">
              <label className="block text-gray-700 mb-1">
                Ngày hết hạn
              </label>
              <input
                type="text"
                readOnly
                value={expiryDate?.toLocaleDateString('vi-VN')}
                onClick={() => setShowCalendar(!showCalendar)}
                className="w-full border border-gray-300 rounded px-3 py-2 cursor-pointer focus:outline-none focus:ring focus:border-blue-300"
              />
              {showCalendar && (
                <div className="mt-2">
                  <Calendar
                    onChange={(date) => {
                      setExpiryDate(new Date(date as Date));
                      setShowCalendar(false);
                    }}
                    value={expiryDate}
                  />
                </div>
              )}
            </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mr-4 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndexPage;
