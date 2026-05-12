// Array of possible HTML tags
const htmlTags = ["div", "p", "h1", "a", "img", "span", "ul", "li"];

// Array of possible CSS classes
const cssClasses = ["container", "text-center", "header", "link", "image", "highlight", "list", "item"];

// Generate a random HTML tag
function generateRandomTag() {
  const index = Math.floor(Math.random() * htmlTags.length);
  return htmlTags[index];
}

// Generate a random CSS class
function generateRandomClass() {
  const index = Math.floor(Math.random() * cssClasses.length);
  return cssClasses[index];
}

// Generate a random HTML code snippet
function generateHtmlCode() {
  const tag = generateRandomTag();
  const className = generateRandomClass();
  return `<${tag} class="${className}">Your content here</${tag}>`;
}

// Usage example
const generatedCode = generateHtmlCode();
console.log(generatedCode);
