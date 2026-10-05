// -------------- INSIGHTS — LOCAL ARTICLE DATA --------------
// Source of truth while the studio's Contentful space holds no matching
// entries (see src/lib/insights/index.ts for the architecture note).
// Body blocks are kept verbatim from the authored content model; internal
// links use the prototype's '#/path' form and are normalised at render time.
// Drafts stay in this list with published: false and must never render.

import type { InsightArticleSource } from './types';

export const LOCAL_ARTICLES: InsightArticleSource[] = [
  {
    slug: 'what-affects-the-cost-of-a-website',
    title: 'What affects the cost of a website project',
    seoTitle: 'What affects the cost of a website project — UI Forge Studio',
    metaDescription:
      'Why quotes for the same website can differ by tens of thousands of dollars, and the factors that actually move the price of a website project.',
    excerpt:
      'Why quotes for the same website can differ by tens of thousands of dollars — and the factors that actually move the price.',
    category: 'Websites',
    date: '2026-06-30',
    published: true,
    cta: {
      title: 'Want a number instead of a range?',
      text: 'The enquiry form takes about five minutes. Tell us what you need and what you are working towards, and we will come back with questions and a clear written proposal.',
      label: 'Start a project',
      href: '#/start',
    },
    blocks: [
      {
        t: 'p',
        x: 'Ask three studios to quote the same website and you can receive numbers that differ by a factor of ten. That is not necessarily anyone being dishonest — it usually means they are quoting different things.',
      },
      {
        t: 'p',
        x: 'This article will not give you a price list, because a price list would be a guess. What it can do is show you the factors that genuinely move the cost of a project, so you can read any proposal — ours included — and understand exactly what you are paying for.',
      },
      {
        t: 'h2',
        x: 'Why there is no standard price',
      },
      {
        t: 'p',
        x: "A website is not a product with a barcode; it is a bundle of decisions. How many pages, how bespoke the design, who writes the content, what the site has to do, what it has to connect to, and who looks after it afterwards. Two 'five-page websites' can honestly differ in cost by a factor of five once those decisions are made.",
      },
      {
        t: 'p',
        x: "So when a quote seems surprisingly cheap or surprisingly expensive, the useful question is not 'why that number?' but 'what did they assume?' The rest of this article is a tour of those assumptions.",
      },
      {
        t: 'h2',
        x: 'The factors that move the price',
      },
      {
        t: 'h3',
        x: 'Scope: how many pages, how many layouts',
      },
      {
        t: 'p',
        x: 'Cost tracks design effort more than page count. Ten pages sharing two well-designed templates cost far less than five pages that each need a unique layout. When you brief a project, a rough sitemap helps far more than a page number.',
      },
      {
        t: 'h3',
        x: 'Design complexity',
      },
      {
        t: 'p',
        x: 'A refined but conventional design costs less than one with custom illustration, animation and bespoke interactions on every screen. Neither is wrong — a distinctive design is an investment in standing out — but it is a genuine cost driver, and worth deciding consciously rather than by accident.',
      },
      {
        t: 'h3',
        x: 'Content: the quiet schedule-killer',
      },
      {
        t: 'p',
        x: 'Who writes the words and supplies the photography? Content produced on your side lowers the cost but is the most common cause of delay we see. Content produced professionally raises the cost and usually raises the quality. The expensive option is deciding late.',
      },
      {
        t: 'h3',
        x: 'Functionality',
      },
      {
        t: 'p',
        x: "The steepest cost curve of all. A contact form is trivial; bookings, payments, member logins, portals and dashboards are software development, and they are built, tested and secured accordingly. Every 'could it also…' is a fair question to ask — just know that functionality, more than anything else, is what turns a website into an application.",
      },
      {
        t: 'h3',
        x: 'Integrations',
      },
      {
        t: 'p',
        x: "Connecting the website to your CRM, booking platform, accounting software or inventory system varies from an afternoon of work to a sub-project in its own right, depending mostly on the quality of the other system's interface. List your systems early; surprises here are expensive.",
      },
      {
        t: 'h3',
        x: 'E-commerce',
      },
      {
        t: 'p',
        x: 'Online stores add product data, payment and shipping configuration, tax rules and a checkout that has to feel trustworthy under pressure. The range is wide: a focused Shopify store is a very different project from a custom storefront with thousands of products.',
      },
      {
        t: 'h2',
        x: 'Ongoing costs after launch',
      },
      {
        t: 'p',
        x: 'A website also carries running costs: hosting, domain renewal, any platform or plugin licences, and maintenance. These are modest compared with the build, but they are real, and a proposal that never mentions them is incomplete. Who owns those accounts matters as much as what they cost — [Website ownership and hosting explained](#/insights/website-ownership-and-hosting-explained) covers who should hold what.',
      },
      {
        t: 'h2',
        x: 'How to get a quote you can trust',
      },
      {
        t: 'ul',
        x: [
          'Share your goals and budget range honestly — a good studio designs to it, or tells you it is not feasible, rather than quietly cutting quality.',
          'Provide a rough sitemap and a list of must-have functionality.',
          'Say who is producing the content, and be realistic about it.',
          'List every system the site must connect to.',
          'Ask what is excluded, and what the ongoing costs will be.',
        ],
      },
      {
        t: 'p',
        x: 'A proposal built on those answers can be specific. One built without them is a guess with a margin added — and the margin is yours to pay.',
      },
      {
        t: 'callout',
        title: 'How we quote',
        x: 'After a discovery conversation, UI Forge Studio provides a written proposal covering the recommended approach, scope, timeline and investment — with the assumptions spelled out, so you can compare it fairly against any other quote. The [process page](#/process) shows where that step fits.',
      },
    ],
  },
  {
    slug: 'website-ownership-and-hosting-explained',
    title: 'Website ownership and hosting explained',
    seoTitle: 'Website ownership and hosting explained — UI Forge Studio',
    metaDescription:
      'Domains, hosting, code, content and accounts: who should own each part of your website, and the questions to ask any provider before you sign.',
    excerpt:
      'Domains, hosting, code and content — who should own what, and the questions to ask before you sign anything.',
    category: 'Ownership and support',
    date: '2026-06-09',
    published: true,
    cta: {
      title: 'Want the ownership conversation up front?',
      text: 'Every UI Forge Studio proposal spells out ownership, hosting and handover before work begins. Tell us about your project and see for yourself.',
      label: 'Start a project',
      href: '#/start',
    },
    blocks: [
      {
        t: 'p',
        x: 'Most business owners discover what they do and do not own at the worst possible moment: when a developer disappears, an agency relationship ends, or an invoice arrives for something they thought was already theirs.',
      },
      {
        t: 'p',
        x: 'None of this is complicated once it is laid out. This article walks through the five things that make up a website, who should hold each one, and the questions worth asking any provider — including us.',
      },
      {
        t: 'quote',
        x: 'If your website vanished tomorrow, whose name is on everything needed to bring it back?',
      },
      {
        t: 'h2',
        x: 'Your domain name',
      },
      {
        t: 'p',
        x: 'The domain is your address on the internet — yourbusiness.com.au — and it is the single most important thing to own outright. If someone else registers it in their name, they control it, whatever the goodwill between you.',
      },
      {
        t: 'p',
        x: "The domain should be registered in your business's name, in a registrar account you control, with the renewal billed to your card. A developer or agency can be given access to manage its settings, but access is not the same as ownership.",
      },
      {
        t: 'h2',
        x: 'Hosting',
      },
      {
        t: 'p',
        x: 'Hosting is the computer your website runs on, rented monthly or yearly. Unlike your domain, there are two legitimate ways to arrange it:',
      },
      {
        t: 'ul',
        x: [
          '**You hold the hosting account.** You pay the provider directly and grant your developer access. Maximum independence, slightly more administration.',
          '**Your developer manages hosting for you.** Simpler day to day, and perfectly reasonable — provided the arrangement is documented and there is a clear handover process if you part ways.',
        ],
      },
      {
        t: 'p',
        x: 'Neither is wrong. What matters is that the arrangement is deliberate, written down and reversible. Managed hosting is only a problem when it quietly becomes a form of lock-in.',
      },
      {
        t: 'h2',
        x: 'The website itself',
      },
      {
        t: 'p',
        x: 'The design and code of your website is intellectual property, and your contract should say plainly what happens to it. The healthy arrangement for most projects: once the project is paid for, you have the right to use, modify and move the work.',
      },
      {
        t: 'p',
        x: 'Platform websites add a wrinkle: a Webflow site lives inside Webflow, a Shopify theme belongs to your Shopify account, and WordPress themes may carry their own licences. A good provider will explain exactly which parts of your build are portable before the project starts, not after it ends. If you are still choosing a platform, [our comparison of custom, WordPress and Webflow builds](#/insights/custom-website-wordpress-or-webflow) covers this from the other direction.',
      },
      {
        t: 'h2',
        x: 'Your content and data',
      },
      {
        t: 'p',
        x: "Text, photography, customer enquiries, order history, analytics — these are business records, and they are unambiguously yours. Two practical checks: analytics and search accounts should be created under a business-owned login (with your developer added as a user, not the owner), and you should know how to export your data — enquiries, orders, content — without asking anyone's permission.",
      },
      {
        t: 'h2',
        x: 'Accounts and access',
      },
      {
        t: 'p',
        x: 'Websites accumulate accounts: registrar, hosting, content management, analytics, email services, payment providers. The pattern that keeps you safe is simple — accounts that represent the business belong to the business, and the people who work on your website are granted access with their own logins.',
      },
      {
        t: 'p',
        x: 'Keep a simple, current list of every account, who owns it and who has access. It takes twenty minutes and turns a potential crisis into an administrative task.',
      },
      {
        t: 'h2',
        x: 'Questions to ask any provider',
      },
      {
        t: 'ul',
        x: [
          'In whose name will the domain be registered?',
          'Who holds the hosting account, and what does handover look like if we stop working together?',
          'Once the project is paid for, what can I do with the design and code?',
          'Which parts of this build are portable, and which are tied to a platform?',
          'Will analytics and search accounts be created under our business login?',
        ],
      },
      {
        t: 'p',
        x: 'A trustworthy provider will answer all five without flinching. Our own answers are on the [about page](#/about): your assets stay yours, care plans are optional, and there is always a clear way to take everything in-house.',
      },
    ],
  },
  {
    slug: 'custom-website-wordpress-or-webflow',
    title: 'Choosing between a custom website, WordPress and Webflow',
    seoTitle: 'Custom website, WordPress or Webflow: how to choose — UI Forge Studio',
    metaDescription:
      'The honest differences between a custom build, WordPress and Webflow — editing, flexibility, performance and running costs — and how to decide which fits your business.',
    excerpt:
      'The honest differences between the three most common ways to build a business website — and how to work out which one fits.',
    category: 'Websites',
    date: '2026-05-19',
    published: true,
    cta: {
      title: 'Get a recommendation instead of a sales pitch',
      text: 'Tell us what your business does and what you want to achieve. We will recommend a platform and approach, and explain the reasoning in plain language — even when the answer is not a custom build.',
      label: 'Start a project',
      href: '#/start',
    },
    blocks: [
      {
        t: 'p',
        x: 'Choosing a platform is usually the first technical decision a business owner runs into, and it tends to arrive dressed in jargon. Underneath the jargon it is a business decision: how your website will be built, how you will edit it, what it will cost to run, and how far it can grow before it needs replacing.',
      },
      {
        t: 'p',
        x: 'This guide explains the three approaches we recommend most often — WordPress, Webflow and a custom build — without pretending one of them is right for everyone.',
      },
      {
        t: 'h2',
        x: 'What you are actually choosing',
      },
      {
        t: 'p',
        x: 'All three can produce a professional website. Where they differ is in everything around the website:',
      },
      {
        t: 'ul',
        x: [
          '**Editing workflow** — who updates content, how often, and how comfortable they are doing it.',
          '**Flexibility** — how far the design and functionality can stretch before the platform pushes back.',
          '**Running costs and ownership** — licences, hosting, maintenance, and which parts of the build are portable. ([Website ownership and hosting explained](#/insights/website-ownership-and-hosting-explained) covers this in detail.)',
        ],
      },
      {
        t: 'p',
        x: 'Hold those three in mind and the comparison below becomes much easier to apply to your own situation.',
      },
      {
        t: 'h2',
        x: 'WordPress: familiar and content-friendly',
      },
      {
        t: 'p',
        x: 'WordPress powers a large share of the web for a reason. Its editing experience is familiar to many teams, it handles frequent publishing well, and its ecosystem of themes and plugins means most common features already exist in some form.',
      },
      {
        t: 'p',
        x: 'The trade-offs come from the same ecosystem. Plugins need updating, and a site assembled from many of them can become slow, fragile or insecure without regular maintenance. Quality also varies enormously between WordPress builds: a well-crafted custom theme behaves very differently from a page-builder site straining under twenty plugins.',
      },
      {
        t: 'p',
        x: 'WordPress tends to suit content-heavy websites — businesses that publish regularly, run a serious blog or manage a lot of pages — where the editing workflow matters more than squeezing out every last drop of performance.',
      },
      {
        t: 'h2',
        x: 'Webflow: polished marketing sites with visual editing',
      },
      {
        t: 'p',
        x: 'Webflow sits between a template platform and a custom build. Design work happens visually, with fine control over layout and interaction, and the result is hosted on fast, managed infrastructure with very little maintenance burden.',
      },
      {
        t: 'p',
        x: "Its limits show up at the edges: complex functionality, large content structures and anything application-like strain against what the platform allows. Monthly hosting is a permanent cost, and your site lives inside Webflow's ecosystem rather than on infrastructure you choose.",
      },
      {
        t: 'p',
        x: 'Webflow tends to suit marketing-led businesses that want a polished, design-forward site the team can edit visually, without heavy functionality behind it.',
      },
      {
        t: 'h2',
        x: 'A custom build: the most room to grow',
      },
      {
        t: 'p',
        x: "A custom website — for us, usually built with Next.js — is shaped from the ground up around your business rather than assembled from a platform's parts. Nothing about the design, structure or functionality is dictated by a template, and performance and search visibility can be engineered rather than hoped for.",
      },
      {
        t: 'p',
        x: 'The honest trade-offs: the initial investment is higher, and structural changes go through a developer rather than a drag-and-drop editor. Day-to-day content editing is still yours — a modern custom build pairs with a content management system chosen to fit your workflow.',
      },
      {
        t: 'p',
        x: 'A custom build tends to suit businesses that treat the website as a growth asset: it needs to be fast, rank well, look like no one else and keep absorbing new functionality for years.',
      },
      {
        t: 'h2',
        x: 'The three side by side',
      },
      {
        t: 'table',
        headers: ['', 'WordPress', 'Webflow', 'Custom build'],
        rows: [
          [
            'Best suited to',
            'Content-heavy sites with regular publishing',
            'Design-led marketing sites',
            'Growth-focused sites and anything bespoke',
          ],
          [
            'Content editing',
            'Familiar CMS editor',
            'Visual editor',
            'CMS chosen for your workflow',
          ],
          [
            'Design flexibility',
            'Depends on the theme',
            'High, within platform limits',
            'Unlimited',
          ],
          ['Performance', 'Varies with build quality', 'Good', 'Engineered to be fast'],
          [
            'Maintenance',
            'Regular updates required',
            'Minimal, handled by the platform',
            'Low, agreed with your developer',
          ],
        ],
      },
      {
        t: 'callout',
        title: 'A note on switching costs',
        x: 'Moving platforms later is possible but never free — content, design and search rankings all need careful migration. Choose with your three-to-five-year plans in mind, not just the site you need this month.',
      },
      {
        t: 'h2',
        x: 'How to decide',
      },
      {
        t: 'p',
        x: 'You do not need to become a platform expert. Answer these in plain language and the right direction usually reveals itself:',
      },
      {
        t: 'ul',
        x: [
          'Who will edit the site, and how often?',
          'Is the website mostly communicating, or does it need to do things — bookings, portals, accounts?',
          'How important are speed and search rankings to how you win customers?',
          'What is the realistic budget, initial and ongoing? ([What affects the cost of a website project](#/insights/what-affects-the-cost-of-a-website) breaks this down.)',
          'Where do you want the business to be in three years, and will the site need to grow with it?',
        ],
      },
      {
        t: 'p',
        x: 'If two platforms both fit, the one that is cheaper to run usually wins. If none of them obviously fits, that is useful information too — it means the decision needs a conversation, not more reading.',
      },
    ],
  },
  {
    slug: 'how-to-brief-a-web-designer',
    title: 'How to brief a web designer (so the quote is accurate)',
    seoTitle: 'How to brief a web designer — UI Forge Studio',
    metaDescription:
      'What to include in a website brief so the proposals you receive are specific, comparable and accurate.',
    excerpt:
      'The handful of things every website brief should cover, and why they make the quotes you receive more accurate.',
    category: 'Websites',
    date: '2026-07-20',
    published: false,
    blocks: [
      {
        t: 'p',
        x: 'A good brief is not a specification document. It is a clear account of your business, your customers and what needs to change — written in your own words.',
      },
      {
        t: 'p',
        x: 'This draft is in progress.',
      },
    ],
  },
];
