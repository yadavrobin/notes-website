import React from 'react';
import { MdOutlinePushPin } from 'react-icons/md';
import { MdCreate, MdDelete } from 'react-icons/md';
import moment from 'moment';

export const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote
}) => {
  const formattedDate = moment(date).isValid() ? moment(date).format('Do MMM YYYY') : "Invalid Date";

  return (
    <div className='bg-white border rounded-lg shadow-sm hover:shadow-xl transition-all duration-200 ease-in-out p-4'>
      {/* Header Section */}
      <div className='flex justify-between items-center mb-3'>
        <div>
          <h6 className='text-lg font-semibold text-gray-800 truncate'>{title}</h6>
          <span className='text-sm text-gray-500'>{formattedDate}</span>
        </div>
        <MdOutlinePushPin
          className={`text-2xl cursor-pointer transition-transform transform ${
            isPinned ? 'text-blue-500 scale-110' : 'text-gray-300'
          }`}
          onClick={onPinNote}
        />
      </div>

      {/* Content Section */}
      <p className='text-sm text-gray-600 leading-relaxed mb-3 line-clamp-3'>
        {content?.slice(0, 60)}{content?.length > 60 && '...'}
      </p>

      {/* Tags and Actions */}
      <div className='flex justify-between items-center'>
        {/* Tags */}
        <div className='flex flex-wrap gap-1 text-xs text-gray-500'>
          {tags.map((item, index) => (
            <span key={index} className='bg-gray-100 px-2 py-1 rounded-full'>
              #{item}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className='flex items-center gap-3'>
          <MdCreate
            className='text-lg text-gray-600 cursor-pointer hover:text-green-600 transition-colors'
            onClick={onEdit}
          />
          <MdDelete
            className='text-lg text-gray-600 cursor-pointer hover:text-red-500 transition-colors'
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
