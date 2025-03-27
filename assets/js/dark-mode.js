function changeGiscusTheme(theme) {
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

function toggleTheme() {
      currentTheme = sessionStorage.getItem('theme');
      themeToggle = document.getElementById('theme-toggle');
      node1 = document.getElementById('theme_source');
      node2 = document.getElementById('theme_source_2');
      if (node1.getAttribute('rel')=='stylesheet') {
            node1.setAttribute('rel', 'stylesheet alternate');
            node2.setAttribute('rel', 'stylesheet');
            sessionStorage.setItem('theme', 'dark');
            themeToggle.classList.remove('fa-adjust');
            themeToggle.classList.add('fa-sun');
          } else {
            node1.setAttribute('rel', 'stylesheet');
            node2.setAttribute('rel', 'stylesheet alternate');
            sessionStorage.setItem('theme', 'light');
            themeToggle.classList.remove('fa-sun');
            themeToggle.classList.add('fa-adjust');
          }
      changeGiscusTheme(newTheme);
}
