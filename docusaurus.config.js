// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';
require('dotenv').config()

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Babouins - Documentation',
  tagline: '⚠️ DocSearch est en cours de développement ⚠️',
  favicon: 'img/baboons.svg',

  // Set the production url of your site here
  url: 'https://babouins-project.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'babouins-project', // Usually your GitHub org/user name.
  projectName: 'docs.babouins.fr', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },


  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/BABOUINS-PROJECT/docs.babouins.fr/tree/main',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    //** @type {import('@docusaurus/theme-search-algolia').ThemeConfig} */
    ({

    //   algolia: {
    //     appId: process.env.APP_ID,
    //     apiKey: process.env.API_KEY,
    //     indexName: 'docs.babouins.fr',
    //     contextualSearch: true,
    //     searchParameters: {},
    //     searchPagePath: 'search',
         //... other Algolia params
    //   },
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Babouins',
        logo: {
          alt: 'Babouins - Documentation',
          src: 'img/baboons.svg',
        },
        
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentations & Procédures',
          },
          {
            href: 'https://github.com/BABOUINS-PROJECT/docs.babouins.fr/',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },  
      footer: {
        style: 'dark',
        links: [
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Babouins Project.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;