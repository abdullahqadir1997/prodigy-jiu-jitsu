# Prodigy Jiu-Jitsu Website Build

**Site:** prodigyjiujitsu.com
**Stack:** HTML5 / CSS3 / Vanilla JS (GSAP for animations)
**Pages:** 7 total

## Site Architecture

```
/               → Home
/about          → About
/adult-jiu-jitsu → Adult Jiu-Jitsu Program
/kids-jiu-jitsu  → Kids Jiu-Jitsu Program
/muay-thai       → Muay Thai Program
/schedule        → Schedule
/contact         → Contact / Lead Form
```

## Navigation Structure

```
Home | About | Programs (dropdown) | Schedule | Contact | [Free Class →]
Programs dropdown:
  - Adult Jiu-Jitsu (/adult-jiu-jitsu)
  - Kids Jiu-Jitsu (/kids-jiu-jitsu)
  - Muay Thai (/muay-thai)
```

## Prompt Files (in /prompts/)

| File | Page |
|------|------|
| 00-global-design-system.md | Global styles, fonts, colors, animations |
| 01-home.md | Home page |
| 02-about.md | About page |
| 03-schedule.md | Schedule page (full class data included) |
| 04-contact.md | Contact / Lead Form page |
| 05-adult-jiu-jitsu.md | Adult Jiu-Jitsu program page |
| 06-kids-jiu-jitsu.md | Kids Jiu-Jitsu program page |
| 07-muay-thai.md | Adult Muay Thai program page |

## Build Order

1. Start with `00-global-design-system.md` — establishes all shared tokens
2. Build `01-home.md` first — sets the visual benchmark
3. Build remaining pages referencing the global design system

## Key Brand Tokens (quick reference)

- Background: `#0A0A0A`
- Surface: `#111111`
- Accent: Crimson `#C0392B` or Electric Blue `#0066FF`
- Text Primary: `#FFFFFF`
- Text Secondary: `#AAAAAA`
- Heading Font: Barlow Condensed / Bebas Neue
- Body Font: Inter / DM Sans
- Animation easing: `cubic-bezier(0.16, 1, 0.3, 1)`
