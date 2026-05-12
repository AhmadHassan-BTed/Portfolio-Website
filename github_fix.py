import os
import re

html_files = ['index.html', 'work.html', 'my-story.html', 'hire-me.html', 'contact-me.html', 'terms.html']
css_dir = 'src/styles'

# 1. Update HTML files
for filename in html_files:
    if not os.path.exists(filename): continue
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix Assets (images, pdfs) to start with /assets/
    def fix_html_asset(match):
        attr = match.group(1)
        path = match.group(2).lower().replace(" ", "-")
        # Remove any leading 'assets/' or '/assets/' if duplicated
        path = re.sub(r'^/?(assets/)+', '', path)
        
        # If it's a CSS or JS file in src/, don't touch it as Vite handles those fine
        if path.startswith('src/'):
            return f'{attr}="{path}"'
        
        # Make it absolute-like from the root (Vite will add the base path)
        return f'{attr}="/assets/{path}"'

    content = re.sub(r'(src|href)\s*=\s*"([^"]+\.(png|jpg|pdf|ico|svg))"', fix_html_asset, content)
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

# 2. Update CSS files
# For CSS, relative paths are actually better because Vite resolves them and hashes them
# BUT the previous path was ../../public/assets/... which is outside the root.
# Let's use relative paths that point to the public folder correctly.
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
                
                # Use absolute-like path for public assets
                clean_name = path.split('/')[-1]
                return f'url("/assets/{clean_name}")'

            content = re.sub(r'url\s*\(\s*["\']?([^"\'\)]+)["\']?\s*\)', fix_css_asset, content)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

print("Paths updated to absolute-style for GitHub Pages compatibility.")
