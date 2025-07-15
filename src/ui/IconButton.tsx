import React from 'react';

interface IconButtonProps {
  clickAction: () => void;
  imageSource: string;
  alt: string;
  title: string | undefined;
}

const IconButton = ({
  clickAction,
  imageSource,
  alt,
  title,
}: IconButtonProps) => {
  return (
    <button
      title={title}
      onClick={clickAction}
      className={`h-30px  z-50 
         text-[#7ca2b2] rounded-md rounded-b-none`}
    >
      <img src={imageSource} width="20" alt={alt} className="text-[#7ca2b2]" />
    </button>
  );
};

export default IconButton;
