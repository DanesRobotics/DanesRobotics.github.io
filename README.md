# Danes Robotics — FRC Team 11174

Official website for Danes Robotics, FIRST Robotics Competition Team 11174, from Denmark High School in Alpharetta, Georgia.

Live site: [https://danesrobotics.github.io/](https://danesrobotics.github.io/)

This is a static site (HTML, CSS, and JavaScript only). There is no build step. GitHub Pages serves the files from the `main` branch root.

## How to update the site (no coding required)

Ask Cursor to change the site, and point it at `docs/SITE_NOTES.md` plus the right data file:

| What you want to change | File to edit |
| --- | --- |
| Team story, contact, sub-teams, social view count | `data/site.js` |
| Sponsor names or logos | `data/sponsors.js` |
| Sponsorship dollar amounts and benefits | `data/tiers.js` |
| Competitions, awards, calendar | `data/events.js` |
| Photos and captions | `data/media.js` |
| Navigation labels and page order | `js/components.js` (the `NAV_LINKS` list at the top) |
| Colors and fonts | `css/style.css` (`:root` variables at the top) |

Do not type a sponsor total on any page. The site counts sponsors from the list.

Do not name individual students or staff.

## Adding a photo or logo

1. Drop the file into `images/photos/` or `images/sponsors/`.
2. Update the matching `src` or `logo` path in `data/media.js` or `data/sponsors.js`.
3. Use a relative path such as `images/sponsors/novelis.png` (no leading slash).

If an image file is missing, the page still works. A placeholder or initials show instead.

## Opening the site on your computer

Because the site uses relative paths, you can open `index.html` in a browser. If something looks off, a local folder server is more reliable:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Hosting

GitHub Pages must be set to deploy from the `main` branch, folder `/` (root). The empty `.nojekyll` file tells GitHub Pages not to process the site with Jekyll.
