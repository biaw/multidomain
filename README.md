[![Test build](https://img.shields.io/github/workflow/status/biaw/multidomain/Build%20and%20publish)](https://github.com/biaw/multidomain/actions/workflows/build-and-publish.yml)
[![Linting](https://img.shields.io/github/workflow/status/biaw/multidomain/Linting?label=quality)](https://github.com/biaw/multidomain/actions/workflows/linting.yml)
[![Analysis and Scans](https://img.shields.io/github/workflow/status/biaw/multidomain/Analysis%20and%20Scans?label=scan)](https://github.com/biaw/multidomain/actions/workflows/analysis-and-scans.yml)
[![Testing](https://img.shields.io/github/workflow/status/biaw/multidomain/Testing?label=tests)](https://github.com/biaw/multidomain/actions/workflows/testing.yml)
[![DeepScan grade](https://deepscan.io/api/teams/16173/projects/19526/branches/509262/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=16173&pid=19526&bid=509262)
[![express version](https://img.shields.io/github/package-json/dependency-version/biaw/multidomain/express)](https://www.npmjs.com/package/express)
[![GitHub Issues](https://img.shields.io/github/issues-raw/biaw/multidomain.svg)](https://github.com/biaw/multidomain/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr-raw/biaw/multidomain.svg)](https://github.com/biaw/multidomain/pulls)

# multipool

A simple static webserver that supports multiple domains, so you don't have to set up a webserver for each domain you own.

## Setup

### Setting up using Docker

With Docker, you don't even need to download anything. Fill in the environment variables and you should be able to run the commands below. See the [`example.env`](https://github.com/biaw/multidomain/blob/master/example.env)-file for more information on what to fill these values with.

Having a log volume is optional, it's mostly for development and debugging. A "content" volume is required though.

#### Linux

```cmd
docker run --name multidomain \
  -p 80:80 \
  -v /multidomain/content:/app/content \
  -v /multidomain/logs:/app/logs \
  promisesolutions/multidomain:latest
```

#### Windows

```cmd
docker run --name multidomain ^
  -p 80:80 ^
  -v "C:\multidomain\database":/app/database ^
  -v "C:\multidomain\logs":/app/logs ^
  promisesolutions/multidomain:latest
```

# Request workflow

- 200 `/content/<domain>/<path>`
- 200 `/content/_common/<path>`
- 404 `/content/<domain>/404.html`
- 404 `/content/_common/404.html`
- 404 status without content

tl;dr: It will try the domain folder first. If it doesn't exist then it will try the common folder. If it doesn't exist then it will try the domain folder's 404.html. If it doesn't exist then it will try the common folder's 404.html. If it doesn't exist then it will just return a plain 404 status without any content.

## Notes

- `<path>` by default is `index.html`, so if you want to respond to `https://example.com/` then have a file at `/content/example.com/index.html`
- if a file is, for example, `redirect: http://google.com` then it will redirect to google.com.