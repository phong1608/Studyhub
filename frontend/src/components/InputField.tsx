import { ChangeEvent } from "react";
const InputField = ({ id, label, type = 'text', value, onChange, icon, placeholder, required = false, disabled = false }: { id: string; label: string; type?: string; value: string | number; onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void; icon: React.ReactNode; placeholder?: string; required?: boolean; disabled?: boolean }) => (
    <div className="mb-5">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
          {icon}
        </div>
        {type === 'textarea' ? (
            
            <select
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            className={`block w-full pl-10 pr-10 py-2.5 border ${disabled ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed' : 'bg-white dark:bg-gray-900'} border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:text-white transition duration-150 ease-in-out appearance-none`}
         >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
         </select>
        ) : type === 'select' ? (
           <select
              id={id}
              name={id}
              value={value}
              onChange={onChange}
              required={required}
              disabled={disabled}
              className={`block w-full pl-10 pr-10 py-2.5 border ${disabled ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed' : 'bg-white dark:bg-gray-900'} border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:text-white transition duration-150 ease-in-out appearance-none`}
           >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="All Levels">All Levels</option>
           </select>
        ) : (
          <input
            type={type}
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            className={`block w-full pl-10 pr-4 py-2.5 border ${disabled ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed' : 'bg-white dark:bg-gray-900'} border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:text-white transition duration-150 ease-in-out`}
            step={type === 'number' ? '0.01' : undefined}
          />
        )}
         {type === 'select' && <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-400"><svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg></div>}
      </div>
    </div>
  );
export default InputField;