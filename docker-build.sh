docker buildx build . -t vitesse:latest
docker run --rm -it -p 8080:80 vitesse:latest