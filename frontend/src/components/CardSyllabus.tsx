import React from 'react'

interface CardSyllabusProps  {
    title: string,
    description: string
}

const CardSyllabus: React.FC<CardSyllabusProps> = ({ title, description }) => {
    return (
    <div className='p-[30px] flex flex-col gap-5 rounded-2xl border shadow-xl'>
        <h3 className='text-[rgb(87,85,254)] font-semibold text-[25px]'>{title}</h3>
        <p className="text-[rgb(102,102,102)] text-xs">{description}</p>

    </div>
  )
}

export default CardSyllabus