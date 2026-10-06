# Beans Blossom: Landing Page

A responsive landing page for **Beans Blossom**, a fictional small-batch coffee and tea house. Built for **Task 1 of the AppRo8 Frontend Development Internship** using only HTML, CSS and vanilla JavaScript (no frameworks or libraries).

**Live demo:** https://landing-page-project-blush.vercel.app/

## Features

- **Header and navigation** with logo, Home, About, Services, Testimonials and Contact links
- **Hero section** with headline, subtext and a call-to-action button
- **About section** introducing the brand
- **Services section** with 3 cards (Espresso Blossom, Cappuccino Cloud, Blossom Matcha Latte)
- **Testimonials section** with 3 customer reviews
- **Footer** with address, email, opening hours and social media links (Instagram, Facebook, X, YouTube)
- **Fully responsive** layout for mobile, tablet and desktop
- **Mobile hamburger menu** that opens, closes on link click, and closes with the Esc key
- **Smooth scrolling** between sections, with the current section highlighted in the nav
- **Basic animations**: hero entrance, scroll-reveal for sections and cards, hover effects
- **Open / closed status** in the footer, calculated from the opening hours

## Tech stack

- HTML5 (semantic elements)
- CSS3 (custom properties, Flexbox, Grid, media queries)
- Vanilla JavaScript (IntersectionObserver, ARIA attributes)
- Google Fonts: Newsreader and DM Sans

## Project structure

```
landing-page-project/
├── index.html        # Page markup
├── css/
│   └── style.css     # All styles and responsive breakpoints
├── js/
│   └── script.js     # Menu, scroll animations, active link, open status
├── images/           # Hero and drink photos
└── README.md
```

## Run locally

1. Clone or download this repository.
2. Open the folder in VS Code.
3. Right-click `index.html` and choose **Open with Live Server** (or just double-click `index.html` to open it in a browser).

No build step or dependencies are needed.

## Responsive breakpoints

| Screen | Behaviour |
| --- | --- |
| Above 960px | Full desktop layout, 3-column cards and reviews |
| 960px and below | Single-column hero, stacked cards and reviews |
| 820px and below | Hamburger menu replaces the nav bar |
| 560px and below | Phone layout, full-width button, stacked footer |

## Accessibility

- Semantic landmarks and heading order
- Skip-to-content link and visible keyboard focus styles
- ARIA labels on the hamburger button and social icons
- Animations are disabled for users who prefer reduced motion

## Notes

- Brand, address, reviews and social links are fictional and used for demonstration only.
- Images are used for this learning project only.

## Author

Mubbshra Akram
