# bogdanmaliagin-website

Photography portfolio for Bogdan Maliagin. Run locally with `node server.mjs` and open http://127.0.0.1:8765.

The site is served directly from `dist/client`; no build or npm install is required.

Gallery, hero, and climbing photos use responsive WebP assets. To regenerate them from
the original JPEGs, run `uv run --with pillow python scripts/optimize_photos.py`.
Commit the generated assets along with any source photo changes.

The homepage presents 12 selected photographs with individual descriptions and an
enlarged viewer. Projects groups existing photographs into motorcycle, travel and
portrait collections; the collection data and copy live in `dist/client/site.js`.

The Services page keeps the existing `pricing.html` URL and explains the types of
shoots, inquiry process and factors used for a quote. The site does not state an
unconfirmed home base, travel availability, starting rates or client endorsements.

The photo viewer supports swiping, Previous/Next, the arrow keys, and Escape to
close. Mobile navigation uses a sliding drawer; the content also adapts to desktop.
