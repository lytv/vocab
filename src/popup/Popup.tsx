import React, { ReactElement } from 'react';

const Popup = (): ReactElement => {
  document.body.style.width = '18rem';
  document.body.style.height = '18rem';
  return (
    <div className="p-4 space-y-4">
      <header className="bg-red-300">
        <nav className="mx-auto flex max-w-7xl items-center justify-between" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
          </div>
        </nav>
      </header>
      <div className="bg-green-400 flex flex-col items-center justify-center">
        <div className="flex items-center">
          <div className="mr-4 flex-shrink-0 self-center text-lg">👍</div>
          <h4 className="text-md">Open AIのAPIキー</h4>
        </div>
        <div className="flex items-center">
          <div className="mr-4 flex-shrink-0 self-center text-lg">👍</div>
          <h4 className="text-md">Notion APIのシークレット</h4>
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Word
        </label>
        <div className="mt-1">
          <input
            type="email"
            name="email"
            id="email"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="you@example.com"
          />
        </div>
      </div>
      <button
        type="button"
        className="w-full rounded-md border border-transparent bg-indigo-600 px-2 py-1 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        翻訳する
      </button>
    </div>
  );
};

export default Popup;
