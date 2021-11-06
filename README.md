# webserver-multiple-domains

A simple static webserver that supports multiple domains, so you don't have to set up a webserver for each domain you own.

## Setup

### Through Docker

Run this to download the image and create the container: `docker run -d --env PORT=8000 -p 8000:8000 -v ./content:/webserver/content --name webserver-multiple-domains promisesolutions/webserver-multiple-domains:latest`
* `-d`: run in the background
* `--env PORT=8000`: set the port to 8000
* `-p 8000:8000`: expose the port to the host, replace 8000 with the port you set as the environment variable
* `-v ./content:/webserver/content`: mount the content folder to the container. it will auto-create a content-folder if it doesn't exist
* `--name webserver-multiple-domains`: name the container whatever you'd like

### Through source

* Clone this repo
* Run `npm install`
* Make a new file called `.env` and put `PORT=8000` (or whatever port you want)
* Run `npm start`

# Request workflow

- 200 `/content/<domain>/<path>`
- 200 `/content/_common/<path>`
- 404 `/content/<domain>/404.html`
- 404 `/content/_common/404.html`
- 404 plain

tl;dr: it will try the domain folder first, if it doesn't exist then it will try the common folder. if it doesn't exist then it will try the domain folder's 404.html, if it doesn't exist then it will try the common folder's 404.html, if it doesn't exist then it will just return a plain 404.

## Notes

- `<path>` by default is `index.html`, so if you want to respond to `https://example.com/` then have a file at `/content/example.com/index.html`
- if a file is, for example, `redirect: http://google.com` then it will redirect to google.com.