# afteractionproject
nonprofit for hunting 

## Architecture

React SPA (Vite + React Router), built as static assets and stored in a private S3 bucket. CloudFront serves the site over HTTPS, reading from S3 via an Origin Access Identity; a custom error response falls back to `index.html` for client-side routes. Route53 hosts DNS for `theafteractionproject.org` and `www`, aliased to the CloudFront distribution. TLS cert is issued and managed via ACM.
