function changeGiscusTheme (theme) {
  function sendMessage(message) {
    const iframe = document.querySelector('iframe.giscus-frame');
    if (!iframe) return;
    iframe.contentWindow.postMessage({ giscus: message }, 'https://giscus.app');
  }
  sendMessage({
    setConfig: {
      theme: theme
    }
  });
}
