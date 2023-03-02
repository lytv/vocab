import React from 'react';

import { CompletionResponse } from '../app/completion';

import { Content } from './Content';

import '../tailwind.css';

export const Main = ({ completion, finish_reason }: CompletionResponse) => {
  const closeModal = (e: React.MouseEvent<HTMLInputElement>) => {
    if (e.target === e.currentTarget) {
      document.getElementsByTagName('my-extension-root')[0].remove();
      document.body.style.overflow = 'visible';
    }
  };
  return (
    <div
      style={{
        zIndex: 2147483549,
      }}
      className="fixed w-full min-h-screen left-0 top-0 bg-gray-500 bg-opacity-75"
      onClick={closeModal}
    >
      <div
        style={{
          zIndex: 2147483550,
        }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10/12 max-w-3xl"
      >
        <Content completion={completion} finish_reason={finish_reason} />
      </div>
    </div>
  );
};
