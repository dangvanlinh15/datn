docker build -f Dockerfile.dev -t fe-dev .
docker run -it --rm -p 3000:3000 -v "${PWD}:/app" -v /app/node_modules -v /app/.next fe-dev