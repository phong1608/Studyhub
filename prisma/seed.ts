import prisma from './prsima-client'
import { CourseLevel } from '@prisma/client';


const seed = async () => {
  try{
    // await prisma.category.deleteMany()
    // const categories = [
    //   { name: 'Phát triển Web', description: 'Học cách xây dựng website và ứng dụng web.' },
    //   { name: 'Phát triển Mobile', description: 'Làm chủ kỹ năng xây dựng ứng dụng cho Android và iOS.' },
    //   { name: 'Khoa học Dữ liệu', description: 'Học phân tích dữ liệu, machine learning và AI.' },
    //   { name: 'Thiết kế', description: 'Khám phá nền tảng UI/UX và thiết kế đồ họa.' },
    //   { name: 'Kinh doanh', description: 'Học cách phát triển và quản lý doanh nghiệp.' },
    //   { name: 'Marketting', description: 'Làm chủ Marketting số và các kỹ thuật SEO.' },
    //   { name: 'Nhiếp ảnh', description: 'Nâng cao kỹ năng nhiếp ảnh và chỉnh sửa hình ảnh.' },
    //   { name: 'Âm nhạc', description: 'Học lý thuyết âm nhạc, sản xuất và nhạc cụ.' },
    //   { name: 'Sức khỏe & Thể hình', description: 'Các khóa học về sức khỏe, thể dục và dinh dưỡng.' },
    //   { name: 'Phát triển Cá nhân', description: 'Nâng cao kỹ năng cá nhân và phát triển nghề nghiệp.' },
    // ];
    const courses = [
    
      { title: 'React Native for Beginners',thumbnail:'https://learnhubbucket.s3.us-east-1.amazonaws.com/CourseThumbnail/React-native.jpg', description: 'Build mobile apps using React Native.', categoryId: 'cm7sshgrx0001b6n8eai59pmv', level: 'Intermediate', price: 29.99,instructorId:'cm8st20ip0002b6002aquh0h0' },
      { title: 'Data Science with Python',thumbnail:'https://learnhubbucket.s3.us-east-1.amazonaws.com/CourseThumbnail/images+(2).jpg', description: 'Analyze data and build machine learning models.', categoryId: 'cm7sshgrz0002b6n8lbvbj8xr', level: 'Advanced', price: 39.99,instructorId:'cm8st20ip0002b6002aquh0h0' },
      { title: 'UI/UX Design Principles',thumbnail:'https://learnhubbucket.s3.us-east-1.amazonaws.com/CourseThumbnail/thiet-ke-do-hoa-co-ban-vtc-acade.jpg', description: 'Learn the essentials of user interface and experience design.', categoryId: 'cm7sshgrz0002b6n8lbvbj8xr', level: 'Beginner', price: 19.99,instructorId:'cm8st20ip0002b6002aquh0h0' },
      { title: 'Starting Your Own Business',thumbnail:'https://learnhubbucket.s3.us-east-1.amazonaws.com/CourseThumbnail/Business-Management.jpg', description: 'Learn how to create and manage a successful business.', categoryId: 'cm7sshgs30004b6n8p4xwasbb', level: 'Intermediate', price: 34.99,instructorId:'cm8st3f6v0005b6005avq2ful' },
      { title: 'SEO and Digital Marketing',thumbnail:'https://learnhubbucket.s3.us-east-1.amazonaws.com/CourseThumbnail/image_nghe-marketing-1.jpg', description: 'Master SEO techniques and digital marketing strategies.', categoryId: 'cm7sshgs60005b6n8zr2wtm00', level: 'Intermediate', price: 29.99,instructorId:'cm8st3f6v0005b6005avq2ful' },
      { title: 'Photography Basics',thumbnail:'https://learnhubbucket.s3.us-east-1.amazonaws.com/CourseThumbnail/hoc_nhiep_anh-1000x625.jpg', description: 'Learn the art of photography and photo editing.', categoryId: 'cm7sshgs80006b6n8331oebb5', level: 'Beginner', price: 14.99,instructorId:'cm8st3f6v0005b6005avq2ful' },
      { title: 'Music Production 101',thumbnail:'https://learnhubbucket.s3.us-east-1.amazonaws.com/CourseThumbnail/caught-in-joy-ptVBlniJi50-unsplash-1-scaled.jpg', description: 'Create and produce your own music.', categoryId: 'cm7sshgsb0007b6n8pjevrrrw', level: 'Intermediate', price: 24.99,instructorId:'cm8st3zbs0008b600vz5oa4jv' },
      { title: 'Fitness and Nutrition',thumbnail:'https://learnhubbucket.s3.us-east-1.amazonaws.com/CourseThumbnail/cach-tap-the-hinh-hieu-qua-1024x.jpg', description: 'Improve your health with fitness and nutrition tips.', categoryId: 'cm7sshgsd0008b6n8yrj2b6tt', level: 'Beginner', price: 19.99,instructorId:'cm8st3zbs0008b600vz5oa4jv' },
      { title: 'Time Management Skills',thumbnail:'https://learnhubbucket.s3.us-east-1.amazonaws.com/CourseThumbnail/time-managment.jpg', description: 'Enhance your productivity and personal growth.', categoryId: 'cm7sshgsf0009b6n8ddm20n0u',level: 'Beginner', price: 14.99,instructorId:'cm8st3zbs0008b600vz5oa4jv' },
    ];
    // for (const category of categories) {
    //   await prisma.category.create({
    //     data: {
    //       name: category.name,
    //       description: category.description,
    //     },
    //   });
    // }
    for(const course of courses){
      await prisma.course.create({
        data:{
          name:course.title,
          description:course.description,
          thumbnail:course.thumbnail,
          level:course.level as CourseLevel,
          price:course.price,
          CategoryId:course.categoryId,
          instructorId:course.instructorId
        }
    })}

  }
  catch(err)
  {
    console.log(err)
  }
}
seed()
