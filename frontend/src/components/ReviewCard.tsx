import Image from "next/image"
export interface ReviewCardProps {
    id:string,
    rating:number,
    review:string,
    user:{
        id:string,
        name:string,
        profilePicture:string
    },
    course:{
        id:string,
        name:string
    }
}
const ReviewCard: React.FC<{review:ReviewCardProps}> = ({ review }) => {
    return (
        
    <div key={review.id} className="mx-auto p-4 border rounded-2xl shadow-lg bg-white">
      <div className="flex items-center space-x-2">
      {review.user.profilePicture ? (
        <Image
        width={24}
        height={24}
        src={review.user.profilePicture}
        alt="User Avatar"
        className="w-10 h-10 rounded-full"
        />
      ) : (
        <Image
        width={24}
        height={24}
        src="/img/Avatar.jpg"
        alt="User Avatar"
        className="w-10 h-10 rounded-full"
        />
      )}
      <div>
        <p className="font-medium">{review.user.name}</p>
        <div className="flex">
        {[...Array(5)].map((_, index) => (
          <span
          key={`star-${index}`}
          className={
            index < review.rating
            ? "text-yellow-400 text-lg"
            : "text-gray-300 text-lg"
          }
          >
          ★
          </span>
        ))}
        </div>
      </div>
      </div>
      {review.course?.name && (
      <h2 className="text-lg font-semibold mt-2">{review.course.name}</h2>
      )}
      <p className="mt-3 text-gray-700 text-sm">{review.review}</p>
    </div>
    )
}
export default ReviewCard