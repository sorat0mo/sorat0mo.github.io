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

function updateThemeButton(){
      let currentTheme = sessionStorage.getItem('theme');
      let themeToggle = document.getElementById('theme-toggle');
      if (currentTheme === 'dark') {
            themeToggle.classList.remove('fa-adjust');
            themeToggle.classList.add('fa-sun');
      } else {
            themeToggle.classList.remove('fa-sun');
            themeToggle.classList.add('fa-adjust');
      }
}

function ThemeOnLoad() {
let theme = sessionStorage.getItem('theme');
    if(theme === "dark" || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !window.ManualToggled))
    {
      sessionStorage.setItem('theme', 'dark');
      node1 = document.getElementById('theme_source');
      node2 = document.getElementById('theme_source_2');
      node1.setAttribute('rel', 'stylesheet alternate'); 
      node2.setAttribute('rel', 'stylesheet');
    }
    else
    {
      sessionStorage.setItem('theme', 'light');
    }
}

function toggleTheme() {
      node1 = document.getElementById('theme_source');
      node2 = document.getElementById('theme_source_2');
      if (node1.getAttribute('rel')=='stylesheet') {
            node1.setAttribute('rel', 'stylesheet alternate');
            node2.setAttribute('rel', 'stylesheet');
            sessionStorage.setItem('theme', 'dark');
            changeGiscusTheme("dark");
          } else {
            node1.setAttribute('rel', 'stylesheet');
            node2.setAttribute('rel', 'stylesheet alternate');
            sessionStorage.setItem('theme', 'light');
            changeGiscusTheme("light");
          }
      updateThemeButton();
      window.ManualToggled = true;
}
