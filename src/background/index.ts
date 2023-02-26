chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'translation',
    title: '選択したテキストを翻訳',
    contexts: ['selection'],
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (tab !== undefined) {
    switch (info.menuItemId) {
      case 'translation':
        // TODO ここのselectionTextでGPT→Notionを行う
        // https://zenn.dev/alvinvin/books/chrome_extension/viewer/chapter09
        // Notion APIのPOSTが完了したら成功モーダルみたいの出す
        // その際に、サービスワーカーからコンテンツスクリプトに成功結果をメッセージ送信して結果を表示する
        // https://zenn.dev/alvinvin/books/chrome_extension/viewer/chapter11
        console.log(info.selectionText);
        break;
    }
  }
});

export {};
