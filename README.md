# Setup

Install Docker and Docker Compose.

### Build base image

docker build -t <name>/<name>:latest .

### Set base image

edit first line of src/Dockerfile and change "jordandenison/unz:latest" to whatever you used for "<name>/<name>:latest"

### Run

docker-compose up
