import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Dyvix UI',
  description: 'Beautiful by default, customizable by design.',
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Introduction', link: 'guide/introduction' },
      { text: 'Quickstart', link: 'guide/quickstart' }
    ],
    logo: '/logo.png',
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: 'guide/introduction' },
          { text: 'Quickstart', link: 'guide/quickstart' },
          { text: 'Animations', link: 'guide/animations' }
        ]
      },
      {
        text: 'Components',
        items: [
          {
            text: 'Modal',
            collapsed: true,
            items: [
              { text: 'Overview', link: 'components/modal/modal' },
              { text: 'Animations', link: 'guide/animations' },
              { text: 'Validations', link: 'components/modal/validation' },
              { text: 'Presets', link: 'components/modal/presets' }
            ]
          },
          { text: 'Select', link: 'components/select/select' },
          { text: 'Toast', link: 'components/toast/toast' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/younisdev/dyvix-ui/' }
    ]
  }
});
