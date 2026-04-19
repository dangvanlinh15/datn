cd WEB
docker run --rm -p 3001:3000 -v "${PWD}:/app" -v /app/node_modules web-dev