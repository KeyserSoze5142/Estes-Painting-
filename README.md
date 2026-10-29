# Estes Painting Company of Birmingham — website

Static, dependency-free rebuild of estespainting.com. Plain HTML, one CSS file, one small JS file. No build step is required to host it.

## Deploy to GitHub Pages (preview)

1. Create a new GitHub repository (public or private) and upload the **contents** of this folder to the root of the `main` branch (`index.html` must be at the top level).
2. In the repo, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
4. After a minute the preview is live at `https://<your-username>.github.io/<repo-name>/`.

All links are relative, so the site works at a sub-path like `/repo-name/` and at the root of a custom domain without changes. The `.nojekyll` file tells GitHub Pages to serve the files as-is.

## Going live on estespainting.com

- Add a file named `CNAME` containing `www.estespainting.com` to the repo root, then point the domain's DNS at GitHub Pages (or upload the folder to any static host / the current host via FTP).
- `sitemap.xml`, `robots.txt`, canonical URLs and Open Graph tags already point at `https://www.estespainting.com/`, so nothing needs to change at launch.
- The existing page URLs were kept on purpose (`/residential/services.html`, `/deck/builder.html`, `/painter/hoover-al.html`, etc.), so every link Google and other sites already have keeps working with no redirects.
- Submit `https://www.estespainting.com/sitemap.xml` in Google Search Console after launch.

## Pages

| Page | File |
|---|---|
| Home | `index.html` |
| Residential painting | `residential/services.html` |
| Commercial painting | `commercial/services.html` |
| Carpentry | `carpentry/services.html` |
| Decks | `deck/builder.html` |
| Windows & doors (+ kitchen/bath remodeling) | `window-door/replacement.html` |
| Gallery (filters, before/after, lightbox) | `gallery.html` |
| Free estimate | `estimate.html` |
| City pages | `painter/greystone-al.html`, `homewood-al`, `hoover-al`, `inverness-al`, `mountain-brook-al`, `vestavia-al` |
| HTML site map | `site/map.html` |
| 404 | `404.html` |

## What is built in for SEO / AEO / GEO

- Unique title, meta description, canonical, Open Graph and Twitter tags on every page.
- JSON-LD on every page: `HousePainter`/`LocalBusiness` (address, geo, phone, founder, service area, Hoover department, offer catalog), `WebSite`, `WebPage` with `speakable`, `BreadcrumbList`, `Service` on service pages, `FAQPage` wherever FAQs appear, `ImageGallery` on the gallery.
- Answer-first summary boxes and question-style FAQ headings on each page so AI answer engines and voice assistants can quote the site directly.
- `llms.txt` at the root summarising the business for AI crawlers.
- `sitemap.xml` (with image entries), `robots.txt`, `site.webmanifest`, favicons and an OG share image.
- Geo meta tags, city-specific landing pages, and the Hoover office address embedded with a map.
- Mobile: responsive from 320px up, sticky call / estimate bar, tap-to-call everywhere, lazy-loaded images and gallery thumbnails, YouTube loaded only on click.

## Editing

- Text lives directly in each HTML file.
- Colors, type and layout live in `css/main.css` (brand tokens at the top).
- The estimate form is the existing EmailMeForm embed (`dAeQi7MBz5`), so submissions keep going to the same inbox. Replace the `<iframe>` in `estimate.html` if the form provider changes.
- Fonts load from Google Fonts (Montserrat, the same family the old site used).
