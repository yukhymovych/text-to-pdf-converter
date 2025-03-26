import React from "react";

export const TextInput = ({ text, setText }) => {
  return (
    <div className="flex flex-col items-center">
      <p className="text-[16px] font-medium mb-[5px]">Write your text here</p>
      <textarea
        className="textarea w-[600px] h-[200px] p-2 border border-black rounded-md"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};
