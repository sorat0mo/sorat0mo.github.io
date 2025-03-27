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

function updateButtonIcons() {
      themeMode = sessionStorage.getItem('theme');
      themeToggle = document.getElementById('theme-toggle');
      
      // Update theme toggle icon based on current theme
      if (themeMode === 'dark') {
        themeToggle.classList.remove('fa-adjust');
        themeToggle.classList.add('fa-sun');
      } else {
        themeToggle.classList.remove('fa-sun');
        themeToggle.classList.add('fa-adjust');
      }
    }

function toggleTheme() {
      currentTheme = sessionStorage.getItem('theme');
      newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      node1 = document.getElementById('theme_source');
      node2 = document.getElementById('theme_source_2');
      if (newTheme === "dark") {
            sessionStorage.setItem('theme', 'dark');
            node1.setAttribute('rel', 'stylesheet alternate');
            node2.setAttribute('rel', 'stylesheet');
          } else {
            sessionStorage.setItem('theme', 'light');
            node1.setAttribute('rel', 'stylesheet');
            node2.setAttribute('rel', 'stylesheet alternate');
          }
      changeGiscusTheme(newTheme);
      updateButtonIcons();
}
