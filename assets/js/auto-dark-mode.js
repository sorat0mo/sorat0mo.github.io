<script>
  // Function to apply theme
  function applyTheme(theme) {
    const node1 = document.getElementById('theme_source');
    const node2 = document.getElementById('theme_source_2');
    
    if (theme === "dark") {
      node1.setAttribute('rel', 'stylesheet alternate');
      node2.setAttribute('rel', 'stylesheet');
    } else {
      node1.setAttribute('rel', 'stylesheet');
      node2.setAttribute('rel', 'stylesheet alternate');
    }
  }

  // Function to check system preference
  function getSystemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Set theme based on user preference or system setting
  let userSelectedTheme = sessionStorage.getItem('theme');
  let autoTheme = true;

  // If user has explicitly selected a theme
  if (userSelectedTheme) {
    autoTheme = userSelectedTheme === 'auto';
    
    if (!autoTheme) {
      // Apply user-selected theme
      applyTheme(userSelectedTheme);
    }
  } else {
    // Default to auto if no preference saved
    sessionStorage.setItem('theme', 'auto');
    autoTheme = true;
  }

  // If using auto theme, apply system preference
  if (autoTheme) {
    applyTheme(getSystemTheme());
  }

  // Add listener for system theme changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      // Only update if we're in auto mode
      if (sessionStorage.getItem('theme') === 'auto' || !sessionStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // You can add these functions to allow users to change themes
  // These can be called from buttons on your site
  window.setLightTheme = function() {
    sessionStorage.setItem('theme', 'light');
    applyTheme('light');
  }

  window.setDarkTheme = function() {
    sessionStorage.setItem('theme', 'dark');
    applyTheme('dark');
  }

  window.setAutoTheme = function() {
    sessionStorage.setItem('theme', 'auto');
    applyTheme(getSystemTheme());
  }
</script>
