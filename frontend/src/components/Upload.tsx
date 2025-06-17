import { ChangeEventHandler } from "react"

export function Upload(handleFileChange: ChangeEventHandler<HTMLInputElement>){
    return (
        <div className="flex text-sm  text-gray-600">
            <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
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
            <p className="pl-1 text-black">or drag and drop</p>
        </div>
    )
}
export default Upload