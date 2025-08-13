import { defineConfig } from 'vitepress';

const socialHandle = "@devhenryhale"
const ogUrl = 'https://mathflow.js.org';
const ogImage = `${ogUrl}/og-image.png`;
const desc = 'A lightweight and expressive scripting language designed for mathematical expressions and calculations.'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    base: '/',
    lang: 'en-US',
    title: 'MathFlow',
    description: desc,
    head: [
        ['link', { rel: 'icon', href: '/logo.svg' }],
        ['meta', { name: 'theme-color', content: '#4169e1' }],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:title', content: 'MathFlow' }],
        ['meta', { property: 'og:image', content: ogImage }],
        ['meta', { property: 'og:url', content: ogUrl }],
        ['meta', { property: 'og:description', content: desc }],
        ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
        ['meta', { name: 'twitter:site', content: socialHandle }],
        ['meta', { name: 'twitter:title', content: 'MathFlow' }],
        ['meta', { name: 'twitter:description', content: desc }],
        ['meta', { name: 'twitter:image', content: ogImage }]
    ],
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: '/logo.svg',
        siteTitle: 'MathFlow',

        search: {
            provider: 'local',
            options: {
                detailedView: true,
                miniSearch: {
                    searchOptions: {
                        fuzzy: 0.2,
                        prefix: true,
                        boost: {
                            title: 4,
                            text: 2,
                            titles: 1
                        }
                    }
                }
            }
        },

        outline: {
            label: 'On this page',
            level: [2, 3]
        },
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide/' },
            { text: 'API', link: '/api/' },
            { text: 'Examples', link: '/examples/' },
            { text: 'Playground', link: '/playground/' },
            {
                text: 'v1.0.0',
                items: [
                    {
                        text: 'Changelog',
                        link: 'https://github.com/mathflowjs/mathflow/blob/main/CHANGELOG.md'
                    },
                    {
                        text: 'Contributing',
                        link: 'https://github.com/mathflowjs/mathflow/#contributing'
                    },
                    { text: 'Team', link: '/about' },
                ]
            }
        ],

        sidebar: [
            {
                text: 'Introduction',
                collapsed: false,
                items: [
                    { text: 'What is MathFlow?', link: '/guide/' },
                    { text: 'Getting Started', link: '/guide/getting-started' },
                ]
            },
            {
                text: 'Core Concepts',
                collapsed: false,
                items: [
                    { text: 'Basics', link: '/guide/basics' },
                    { text: 'Variables', link: '/guide/variables' },
                    { text: 'Expressions', link: '/guide/expressions' },
                    { text: 'Built-in Functions', link: '/guide/builtin' }
                ]
            },
            {
                text: 'API Reference',
                collapsed: false,
                items: [
                    { text: 'Context API', link: '/api/' },
                    { text: 'Procedural API', link: '/api/procedural' },
                    { text: 'Error Handling', link: '/api/errors' },
                    { text: 'Rendering', link: '/api/rendering' },
                ]
            },
            {
                text: 'Showcase',
                collapsed: false,
                items: [
                    { text: 'Examples', link: '/examples/' },
                ]
            },
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/mathflowjs/mathflow' }
        ],

        editLink: {
            text: 'Edit this page on GitHub',
            pattern: 'https://github.com/mathflowjs/mathflowjs.github.io/edit/main/docs/:path'
        },

        footer: {
            message: 'Released under the <a href="https://github.com/mathflowjs/mathflow/blob/master/LICENSE.txt">MIT License</a>.',
            copyright: 'Copyright &copy; 2024-present, <a href="https://github.com/henryhale">Henry Hale</a>.'
        }
    },

    markdown: {
        lineNumbers: false,
        theme: {
            light: 'github-light',
            dark: 'github-dark'
        },
    },
});
