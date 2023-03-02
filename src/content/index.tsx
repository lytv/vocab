import React from 'react';
import { createRoot } from 'react-dom/client';

import { Main } from './Main';

chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
  if (message.type === 'SHOW') {
    if (document.getElementsByTagName('my-extension-root').length > 0) {
      document.getElementsByTagName('my-extension-root')[0].remove();
    }
    const { completion, finish_reason } = message.data;
    const container = document.createElement('my-extension-root');
    container.classList.add('parentclass');
    document.body.after(container);
    document.body.style.overflow = 'hidden';
    createRoot(container).render(<Main completion={completion} finish_reason={finish_reason} />);
  }
});
