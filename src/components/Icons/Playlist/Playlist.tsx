import React from 'react';

import { CommonPropTypes } from '../IconTypes';

const Playlist: React.FC<CommonPropTypes> = ({ className, onClick }) => {
  return (
    <svg
      className={className}
      onClick={onClick}
      xmlns='http://www.w3.org/2000/svg'
      height='24px'
      viewBox='0 -960 960 960'
      width='24px'
    >
      <path
        fill='currentColor'
        d='M118-325.31v-58.38h311.62v58.38H118Zm0-172.84v-58.39h479.92v58.39H118Zm0-173.47V-730h479.92v58.38H118ZM658.31-156v-169.31H490v-58.38h168.31V-552h58.38v168.31H886v58.38H716.69V-156h-58.38Z'
      />
    </svg>
  );
};

export default Playlist;
