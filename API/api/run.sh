cd API\api
docker run --rm -p 8080:8080 -v "${PWD}/src:/app/src" api-dev