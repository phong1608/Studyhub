import prisma from './prsima-client'



const seed = async () => {
  try{
    await prisma.category.deleteMany()
    const categories = [
      { name: 'Phát triển Web', description: 'Học cách xây dựng website và ứng dụng web.' },
      { name: 'Phát triển Mobile', description: 'Làm chủ kỹ năng xây dựng ứng dụng cho Android và iOS.' },
      { name: 'Khoa học Dữ liệu', description: 'Học phân tích dữ liệu, machine learning và AI.' },
      { name: 'Thiết kế', description: 'Khám phá nền tảng UI/UX và thiết kế đồ họa.' },
      { name: 'Kinh doanh', description: 'Học cách phát triển và quản lý doanh nghiệp.' },
      { name: 'Marketting', description: 'Làm chủ Marketting số và các kỹ thuật SEO.' },
      { name: 'Nhiếp ảnh', description: 'Nâng cao kỹ năng nhiếp ảnh và chỉnh sửa hình ảnh.' },
      { name: 'Âm nhạc', description: 'Học lý thuyết âm nhạc, sản xuất và nhạc cụ.' },
      { name: 'Sức khỏe & Thể hình', description: 'Các khóa học về sức khỏe, thể dục và dinh dưỡng.' },
      { name: 'Phát triển Cá nhân', description: 'Nâng cao kỹ năng cá nhân và phát triển nghề nghiệp.' },
    ];

    for (const category of categories) {
      await prisma.category.create({
        data: {
          name: category.name,
          description: category.description,
        },
      });
    }

  }
  catch(err)
  {
    console.log(err)
  }
}
seed()
