# afteractionproject
nonprofit for hunting 

## Architecture

React SPA (Vite + React Router), built as static assets and stored in a private S3 bucket. CloudFront serves the site over HTTPS, reading from S3 via an Origin Access Identity; a custom error response falls back to `index.html` for client-side routes. Route53 hosts DNS for `theafteractionproject.org` and `www`, aliased to the CloudFront distribution. TLS cert is issued and managed via ACM.

## TODO

- [ ] Gallery photos (`src/assets/gallery/{ireland,argentina,new-zealand}/`) were dropped in via macOS Photos.app drag-and-drop, which exports cached preview derivatives, not the original files (some as small as 480x360). Re-export via Photos.app's File > Export > Export Unmodified Original(s)... to get real resolution, then swap the files in.
- [ ] Convert gallery photos to WebP once real originals are in place (e.g. `sips -s format webp original.heic --out photo.webp`) for smaller file sizes at equivalent quality. No code changes needed — the gallery's data module already discovers `.webp` files alongside `.jpg`/`.jpeg`/`.png`.
