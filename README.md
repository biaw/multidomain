# webserver-multiple-domains

A simple webserver that supports multiple domains, so you don't have to set up a webserver for each domain you own.

## Request workflow

- `/content/<domain>/<path>`
- `/content/_common/<path>`
- `/content/<domain>/404.html`
- `/content/_common/404.html`
- 404 status code

## Notes

- `<path>` by default is `index.html`, so if you want to respond to `https://example.com/` then have a file at `/content/example.com/index.html`
- if a file is, for example, `redirect: http://google.com` then it will redirect to google.com. 