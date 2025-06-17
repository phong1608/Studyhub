import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

interface TextEditorProps {
	placeholder?: string;
}

const TextEditor: React.FC<TextEditorProps> = ({ placeholder }) => {
	const editor = useRef(null);
	const [content, setContent] = useState('');

	const config = useMemo(() => ({
			readonly: false, 
			placeholder: placeholder || 'Start typings...'
		}),
		[placeholder]
	);

	return (
		<JoditEditor
			ref={editor}
			value={content}
			config={config}
			tabIndex={1} 
			onBlur={newContent => setContent(newContent)} 
			onChange={newContent => setContent(newContent)}
		/>
	);
};
export default TextEditor