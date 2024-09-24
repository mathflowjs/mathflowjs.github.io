import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    base: '/',
    lang: 'en-US',
    title: 'MathFlow',
    description:
        'A lightweight and expressive scripting language designed for mathematical expressions and calculations.',
    head: [['link', { rel: 'icon', href: '/logo.svg' }]],
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: '/logo.svg',
        siteTitle: 'MathFlow',
        search: {
            provider: 'local'
        },
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide/' },
            { text: 'Playground', link: '/playground/' },
            // { text: 'Demo', link: 'https://mathflow.github.io/demo' },
            {
                text: 'About',
                items: [
                    { text: 'Team', link: '/about/team' },
                    { text: 'History', link: '/about/history' },
                    { text: 'Code of Conduct', link: '/about/coc' }
                ]
            }
        ],

        sidebar: [
            {
                text: 'Guide',
                items: [
                    { text: 'Introduction', link: '/guide/' },
                    { text: 'Getting Started', link: '/guide/getting-started' },
                    { text: 'Configuration', link: '/guide/config' }
                ]
            },
            {
                text: 'Syntax',
                items: [
                    { text: 'Basics', link: '/guide/basics' },
                    { text: 'Variables', link: '/guide/variables' },
                    { text: 'Expressions', link: '/guide/expressions' },
                    { text: 'Builtins', link: '/guide/builtin' }
                ]
            },
            {
                text: 'Examples',
                items: [
                    { text: 'Scripts', link: '/guide/scripts' },
                    { text: 'Programs', link: '/guide/programs' }
                ]
            },
            {
                text: 'API Reference',
                link: '/api/'
            }
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/mathflowjs/mathflow' }
        ],

        editLink: {
            text: 'Edit this page on GitHub',
            pattern:
                'https://github.com/mathflowjs/mathflow/edit/master/:path'
        },

        footer: {
            message:
                'Released under the <a href="https://github.com/mathflowjs/mathflow/blob/master/LICENSE.md">MIT License</a>.',
            copyright:
                'Copyright &copy; 2024, <a href="https://github.com/henryhale">Henry Hale</a> - 2024-present MathFlow.'
        }
    },
    markdown: {
        lineNumbers: true
    }
});
