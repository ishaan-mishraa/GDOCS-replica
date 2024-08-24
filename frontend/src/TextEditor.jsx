import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

const TextEditor = ({ documentId }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const loadDocument = async () => {
      if (documentId) {
        const response = await axios.get(`/api/documents/${documentId}`);
        setContent(response.data.content);
      }
    };
    loadDocument();
  }, [documentId]);

  const handleChange = (value) => {
    setContent(value);
  };

  const saveDocument = async () => {
    if (documentId) {
      await axios.put(`/api/documents/${documentId}`, { content });
    } else {
      const response = await axios.post('/api/documents', { content });
      window.location.href = `/document/${response.data.id}`;
    }
  };

  return (
    <div className="text-editor">
      <ReactQuill
        value={content}
        onChange={handleChange}
        placeholder="Start writing..."
        modules={TextEditor.modules}
        formats={TextEditor.formats}
        className="h-64"
      />
      <button
        onClick={saveDocument}
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
      >
        Save
      </button>
    </div>
  );
};

TextEditor.modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
};

TextEditor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video',
];

export default TextEditor;
