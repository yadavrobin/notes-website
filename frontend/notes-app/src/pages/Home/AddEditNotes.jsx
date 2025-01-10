import React, { useRef } from 'react';
import TagInput from '../../components/Input/TagInput';
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/axiosInstance';

const AddEditNotes = ({ noteData, type, getAllNotes, onClose, showToastMessage }) => {
  const [title, setTitle] = React.useState(noteData?.title || '');
  const [content, setContent] = React.useState(noteData?.content || '');
  const [tags, setTags] = React.useState(noteData?.tags || []);
  const [error, setError] = React.useState(null);
  const modalRef = useRef();

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post('/add-note', {
        title,
        content,
        tags,
      });
      if (response.data && response.data.note) {
        showToastMessage('Note added successfully', 'success');
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  };

  const editNote = async () => {
    try {
      const noteId = noteData._id;
      const response = await axiosInstance.put('/edit-note/' + noteId, {
        title,
        content,
        tags,
      });
      if (response.data && response.data.note) {
        showToastMessage('Note updated successfully', 'success');
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError('Please enter a title');
      return;
    }
    if (!content) {
      setError('Please enter content');
      return;
    }
    setError('');
    if (type === 'edit') {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      {/* Modal */}
      <div
        ref={modalRef}
        className="relative bg-white rounded-lg shadow-lg p-6 w-3/4 max-w-3xl mx-auto"
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-gray-300 transition-all"
          onClick={onClose}
        >
          <MdClose className="text-xl text-gray-500" />
        </button>

        {/* Title Input */}
        <div className="flex flex-col gap-2 mt-8">
          <label className="text-sm font-semibold text-gray-700">Title</label>
          <input
            type="text"
            className="text-lg text-gray-900 border-b border-gray-300 focus:border-primary focus:outline-none transition"
            placeholder="Enter note title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        {/* Content Input */}
        <div className="flex flex-col gap-2 mt-4">
          <label className="text-sm font-semibold text-gray-700">Content</label>
          <textarea
            className="text-gray-900 bg-gray-50 border border-gray-300 rounded-md p-3 focus:border-primary focus:outline-none transition resize-none"
            placeholder="Enter note content"
            rows={10}
            value={content}
            onChange={({ target }) => setContent(target.value)}
          ></textarea>
        </div>

        {/* Tags Input */}
        <div className="mt-4">
          <label className="text-sm font-semibold text-gray-700">Tags</label>
          <TagInput tags={tags} setTags={setTags} />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* Action Button */}
        <button
          className="bg-primary text-white font-medium rounded-md py-3 px-6 mt-6 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 transition"
          onClick={handleAddNote}
        >
          {type === 'edit' ? 'Update' : 'Add'}
        </button>
      </div>
    </div>
  );
};

export default AddEditNotes;
