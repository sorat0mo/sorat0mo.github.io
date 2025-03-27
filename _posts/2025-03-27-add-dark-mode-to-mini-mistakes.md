---
title: Add Dark Mode Toggle to Minimal Mistakes Theme
toc: true
toc_sticky: true
---

### The WHY
I had been using [Beautiful Jekyll](https://github.com/daattali/beautiful-jekyll) since I created this blog. It was amazing: simple, responsive and quick. However, I still felt like it was too empty for my taste. Then I came across [Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes). The *almost* perfect theme. If only there was a dark mode toggle.

Beautiful Jekyll *technically* had a dark mode toggle available, but its scripts and css are only available to patreon supporters. I was on a tight budget and too lazy to create my own css stylesheets, so I didn't bother. Now that minimal mistakes have dark and light themes *by default*, I think I can achieve this with minimal efforts.

I finally decided to take this seriously, and found [this discussion](https://github.com/mmistakes/minimal-mistakes/discussions/2033), exactly what I looked for. I will try to document the changes I made below.

### Dark Mode
First, start by adding the following lines directly below `minimal_mistakes_skin` in `_config.yml`:
```yaml
minimal_mistakes_skin_dark: "dark"

# logo: "/assets/brand/logo.svg"
# logo_dark: "/assets/brand/logo_dark.svg"
head_scripts:
  - /assets/js/dark-mode.js
```

Then create a new file `/assets/css/main2.css`:
```css
@charset "utf-8";

@import "minimal-mistakes/skins/{{ site.minimal_mistakes_skin_dark | default: 'dark' }}"; // skin
@import "minimal-mistakes"; // main partials
```

After that, create a new file `/assets/js/dark-mode.js` with the following content:
<details>
  
<summary>dark-mode.js</summary>
<div markdown=1>
```js
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
```

Note: You can safely remove the function `changeGiscusTheme` if you do not use Giscus as comments system.
{: .notice--info}
</div>
</details>


Next, in the file `_includes/head.html`, copy from [mmistakes/minimal-mistakes](https://github.com/mmistakes/minimal-mistakes/blob/master/_includes/head.html) if using remote theme. Find the following line:
```html
<link rel="stylesheet" href="{{ '/assets/css/main.css' | relative_url }}">
```

Replace it with:
```html
{% raw %}<link title="main" rel="stylesheet" href="{{ '/assets/css/main.css' | relative_url }}" id="theme_source">
{% if site.minimal_mistakes_skin_dark %}
<link rel="stylesheet alternate" href="{{ '/assets/css/main2.css' | relative_url }}" id="theme_source_2">
<script>
  let theme = sessionStorage.getItem('theme');
  if (theme === "dark") {
    sessionStorage.setItem('theme', 'dark');
    node1 = document.getElementById('theme_source');
    node2 = document.getElementById('theme_source_2');
    node1.setAttribute('rel', 'stylesheet alternate');
    node2.setAttribute('rel', 'stylesheet');
  }
  else {
    sessionStorage.setItem('theme', 'light');
  }
</script>
{% endif %}{% endraw %}
```

Then, find the file `_includes/masthead.html`, again, copy from [mmistakes/minimal-mistakes](https://github.com/mmistakes/minimal-mistakes/blob/master/_includes/masthead.html) if it does not already exist. Add the following to the **top** of the file:
```liquid
{% raw %}{% capture logo_path %}{{ site.logo }}{% endcapture %}
{% capture logo_path_dark %}{{ site.logo_dark }}{% endcapture %}{% endraw %}
```

In the same file, find the following code:
```liquid
{% raw %}{% unless logo_path == empty %}
  <a class="site-logo" href="{{ '/' | relative_url }}"><img src="{{ logo_path | relative_url }}" alt="{{ site.masthead_title | default: site.title }}"></a>
{% endunless %}{% endraw %}
```

Replace it with:
```liquid
{% raw %}{% unless logo_path == empty %}
  <a class="site-logo" href="{{ '/' | relative_url }}">
      <picture>
        {% unless logo_path_dark == empty %}
          <!-- dark mode logo -->
          <source
            srcset="{{ logo_path_dark | relative_url }}"
            media="(prefers-color-scheme: dark)">
        {% endunless %}
        <img src="{{ logo_path | relative_url }}" alt="{{ site.masthead_title | default: site.title }}">
      </picture>
  </a>
{% endunless %}{% endraw %}
```

Then, find the following line in the same file:
```liquid
{% raw %}{% if site.search == true %}{% endraw %}
```

Add the following **above** this line:
```liquid
{% raw %}{% if site.minimal_mistakes_skin_dark %}
  <i class="fas fa-fw fa-adjust" id="theme-toggle" aria-hidden="true" title="Toggle between light and dark mode" onclick="toggleTheme(); return false;"></i>
{% endif %}{% endraw %}
```

### The End
If you've followed through, then dark mode should be added to your jekyll site using the Minimal Mistake theme! You can click the sun button next to the search button in the top right corner of this page to see its effects.
