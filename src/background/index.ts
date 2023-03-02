import { getCompletion } from '../app/completion';

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'translation',
    title: '選択したテキストを翻訳',
    contexts: ['selection'],
  });
});

// chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (tab === undefined || info.selectionText === undefined) return;
  const { menuItemId, selectionText } = info;
  const lowerCasedText = selectionText.toLocaleLowerCase('en-US');
  switch (menuItemId) {
    case 'translation': {
      const data = await getCompletion(lowerCasedText);
      console.log(data);

      // const data = {
      //   completion: {
      //     example_1: 'The leopard was spotted with black spots.',
      //     example_2: 'The tablecloth was spotted with red wine.',
      //     meaning: 'covered with spots',
      //     parts_of_speech: 'adjective',
      //     synonym: 'test',
      //     word: 'spotted',
      //   },
      //   finish_reason: 'stop',
      // };
      const { completion, finish_reason } = data;
      chrome.tabs.sendMessage(tab.id as number, {
        type: 'SHOW',
        data: {
          completion,
          finish_reason,
        },
      });
      break;
    }
  }
});

export {};
