import React, { useState } from 'react';
import { MdCheckCircle } from 'react-icons/md';
import { useClickOutside } from '@mantine/hooks';

import { CompletionResponse } from '../app/completion';
import { addVocabToNotion, convertTextToNotionBody } from '../app/completion';

export const Content = ({ completion, finish_reason }: CompletionResponse) => {
  const [opened, setOpened] = useState(true);
  const [diaglog, setDialog] = useState<HTMLDivElement | null>(null);
  useClickOutside(() => setOpened(false), null, [diaglog]);
  const IconUrl = chrome.runtime.getURL('images/extension_128.png');

  const data = [{ word: 'spotted' }];

  const { word, meaning, synonym, parts_of_speech, example_1, example_2 } = completion;

  const register = async (completion: CompletionResponse['completion']) => {
    const res = await addVocabToNotion(convertTextToNotionBody(completion));
    console.log(res);
  };

  return opened ? (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg space-y-1">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="flex items-center space-x-1 text-base font-semibold leading-6 text-gray-900">
          <span>翻訳データ生成</span> <MdCheckCircle className="text-green-600" />
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">翻訳データの生成に成功しました</p>
      </div>
      <div className="border-y border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">単語</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{word}</dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">意味</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{meaning}</dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">同義語</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{synonym}</dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">品詞</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{parts_of_speech}</dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">例文1</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{example_1}</dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">例文2</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{example_2}</dd>
          </div>
        </dl>
      </div>
      <div className="flex justify-center items-center space-x-6 p-4">
        <button
          onClick={() => register(completion)}
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          登録する
        </button>
        <button
          onClick={() => document.getElementsByTagName('my-extension-root')[0].remove()}
          type="button"
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          キャンセル
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
};
