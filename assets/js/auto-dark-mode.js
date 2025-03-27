function updateButtonIcons() {
      const themeMode = sessionStorage.getItem('theme');
      const themeToggle = document.getElementById('theme-toggle');
      const autoToggle = document.getElementById('auto-theme-toggle');
      
      // Update auto button visual state
      if (themeMode === 'auto') {
        autoToggle.style.color = 'var(--accent-color, #4a9ae1)';
      } else {
        autoToggle.style.color = '';
      }
      
      // Update theme toggle icon based on current theme
      if (themeMode === 'dark' || (themeMode === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        themeToggle.classList.remove('fa-moon');
        themeToggle.classList.add('fa-sun');
      } else {
        themeToggle.classList.remove('fa-sun');
        themeToggle.classList.add('fa-moon');
      }
    }

    // Function to apply theme
    function applyTheme(theme) {
      const node1 = document.getElementById('theme_source');
      const node2 = document.getElementById('theme_source_2');
      
      if (theme === "dark") {
        node1.setAttribute('rel', 'stylesheet alternate');
        node2.setAttribute('rel', 'stylesheet');
        if (typeof changeGiscusTheme === 'function') {
          changeGiscusTheme('dark');
        }
      } else {
        node1.setAttribute('rel', 'stylesheet');
        node2.setAttribute('rel', 'stylesheet alternate');
        if (typeof changeGiscusTheme === 'function') {
          changeGiscusTheme('light');
        }
      }
      
      updateButtonIcons();
    }

    // Function to get system theme
    function getSystemTheme() {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    // Toggle between light and dark
    function toggleTheme() {
      const currentTheme = sessionStorage.getItem('theme');
      
      // If auto, switch to explicit mode based on current appearance
      if (currentTheme === 'auto') {
        const newTheme = getSystemTheme() === 'dark' ? 'light' : 'dark';
        sessionStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
      } 
      // If already in explicit mode, just toggle
      else {
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        sessionStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
      }
    }

    // Toggle auto theme mode
    function toggleAutoTheme() {
      const currentTheme = sessionStorage.getItem('theme');
      
      if (currentTheme === 'auto') {
        // Switch to explicit mode based on current appearance
        const currentAppearance = getSystemTheme();
        sessionStorage.setItem('theme', currentAppearance);
        applyTheme(currentAppearance);
      } else {
        // Switch to auto mode
        sessionStorage.setItem('theme', 'auto');
        applyTheme(getSystemTheme());
        
        // Set up listener for system theme changes if not already set
        if (!window.systemThemeListenerSet) {
          window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (sessionStorage.getItem('theme') === 'auto') {
              applyTheme(e.matches ? 'dark' : 'light');
            }
          });
          window.systemThemeListenerSet = true;
        }
      }
    }

    // Initialize buttons
    document.addEventListener('DOMContentLoaded', function() {
      // Set up system theme change listener
      if (window.matchMedia && !window.systemThemeListenerSet) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
          if (sessionStorage.getItem('theme') === 'auto') {
            applyTheme(e.matches ? 'dark' : 'light');
          }
        });
        window.systemThemeListenerSet = true;
      }
      
      // Apply initial theme
      const savedTheme = sessionStorage.getItem('theme');
      if (!savedTheme) {
        sessionStorage.setItem('theme', 'auto');
        applyTheme(getSystemTheme());
      } else if (savedTheme === 'auto') {
        applyTheme(getSystemTheme());
      } else {
        applyTheme(savedTheme);
      }
      
      updateButtonIcons();
    });
