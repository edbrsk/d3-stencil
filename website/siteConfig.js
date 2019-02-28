// List of projects/orgs using your project for the users page.
const users = [
  {
    caption: 'User1',
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/docusaurus.svg'.
    image: '/img/docusaurus.svg',
    infoLink: 'https://www.facebook.com',
    pinned: true,
  },
];

const siteConfig = {
  title: 'D3-Stencil',
  tagline: 'Framework-agnostic, simple.',
  url: 'https://d3-stencil.dev',
  baseUrl: '/',
  projectName: 'd3-stencil',
  organizationName: 'edgarordonez',

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    { doc: 'basics/basics-install', label: 'Getting Started' },
    { doc: 'api/api-introduction', label: 'API Reference' },
    { page: 'help', label: 'Help' },
    { blog: false },
  ],

  // If you have users set above, you add it here:
  // users,

  /* path to images for header/footer */
  headerIcon: 'img/d3-stencil_logo.png',
  footerIcon: 'img/d3-stencil_footer.png',
  favicon: 'img/favicon.png',

  disableHeaderTitle: true,
  disableTitleTagline: false,

  /* Colors for website */
  colors: {
    primaryColor: '#2c4c5c',
    secondaryColor: '#e48e21',
  },

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} D3-Stencil`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'atom-one-dark',
    defaultLang: 'typescript',
  },

  usePrism: ['jsx'],

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ['https://buttons.github.io/buttons.js'],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',

  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/d3-stencil_logo.png',
  twitterImage: 'img/d3-stencil_logo.png',

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  repoUrl: 'https://github.com/edgarordonez/d3-stencil',
};

module.exports = siteConfig;
