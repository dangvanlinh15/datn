docker build -f Dockerfile -t ai .
docker run -it --rm -p 5000:5000 ai