import os
import re

html_files = ['index.html', 'work.html', 'my-story.html', 'hire-me.html', 'contact-me.html', 'terms.html']
css_dir = 'src/styles'

# 1. Update vite.config.js to use relative base
config_path = 'vite.config.js'
if os.path.exists(config_path):
    with open(config_path, 'r', encoding='utf-8') as f:
        config = f.read()
    config = re.sub(r"base:\s*['\"].*?['\"]", "base: './'", config)
    with open(config_path, 'w', encoding='utf-8') as f:
        f.write(config)

# 2. Update HTML files
for filename in html_files:
    if not os.path.exists(filename): continue
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    def fix_html_asset(match):
        attr = match.group(1)
        path = match.group(2).lower().replace(" ", "-")
        # Get just the filename
        filename_only = path.split('/')[-1]
        
        # Don't touch src/ links (styles, scripts)
        if path.startswith('src/'):
            return f'{attr}="{path}"'
        
        # Point to the new src/assets location
        return f'{attr}="./src/assets/{filename_only}"'

    content = re.sub(r'(src|href)\s*=\s*"([^"]+\.(png|jpg|pdf|ico|svg))"', fix_html_asset, content)
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

# 3. Update CSS files
if os.path.exists(css_dir):
    for filename in os.listdir(css_dir):
        if filename.endswith('.css'):
            filepath = os.path.join(css_dir, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            def fix_css_asset(match):
                path = match.group(1).lower().replace(" ", "-").strip('"\'')
                if path.startswith('http') or path.startswith('data:'):
                    return match.group(0)
                
                # Get just the filename
                filename_only = path.split('/')[-1]
                # Point to the assets folder relative to src/styles/
                return f'url("../assets/{filename_only}")'

            content = re.sub(r'url\s*\(\s*["\']?([^"\'\)]+)["\']?\s*\)', fix_css_asset, content)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

print("Vite project standardized for relative paths and GitHub Pages.")
