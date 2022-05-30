#!/bin/bash

#####################################################################
## Shell script to build Grover Docker image
#####################################################################

export $(cat ../.env | xargs)
set -Eeuo pipefail

script_dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd -P)

usage() {
  cat << EOF # remove the space between << and EOF, this is due to web plugin issue
Usage: $(basename "${BASH_SOURCE[0]}") [-h] [-buildDocker] [-runDocker] [-runApp] [-runDoc] [-packageHelm]


This script helps you to run the application in different forms. below you can get the full list of available options.

Available options:

-h, --help              Print this help and exit
-buildDocker            Build the docker image called "grover:latest"
-runDocker              Build the docker image and run on local machine
-runApp                 Run application with npm in usual way for development
-runDoc                 Generate the code documentation
-packageHelm            makes a helm package from the helm chart.
EOF
  exit
}
##########################################################################################################################################
packageHelm(){
    helm package ../k8s
}
parse_params() {
  # default values of variables set from params
  while :; do
    case "${1-}" in
    -h | --help) usage ;;
    -buildDocker) buildTheImage ;;
    -runDocker) dockerinit ;;
    -runApp) runTheApp ;;
    -runDoc) generateDoc;;
    -packageHelm) packageHelm ;;
    -?*) die "Unknown option: $1" ;;
    *) break ;;
    esac
    shift
  done
  args=("$@")
  return 0
}

DATE=`date +%Y.%m.%d.%H.%M`
echo $DATE
###########################################################################################################################################
runTheApp()
{
cd ..
if [ -d "node_modules" ]
then
echo "packages are installed :)"
else
echo "installing packages..."
npm install
fi
echo "linting..."
npm run lint &&
echo "building"
npm run build
echo "running tests..."
npm run test:ci
echo "starting..."
npm start
}
###########################################################################################################################################
generateDoc(){
echo "generating documentation..."
npm run doc
}
###########################################################################################################################################
buildTheImage(){
cd ..
docker build . -t  ${IMAGE_NAME}:${IMAGE_VERSION}
echo "built docker images and proceeding to delete existing container"
result=$( docker ps -q -f name=${CONTAINER_NAME} )
if [[ $? -eq 0 ]]; then
echo "Container exists"
docker container rm -f ${CONTAINER_NAME}
echo "Deleted the existing docker container"
else
echo "No such container"
fi
}
###########################################################################################################################################
deployImage(){
echo "Deploying the updated container"
docker run -d --name ${CONTAINER_NAME} -p ${LOCAL_PORT}:${NODE_PORT} ${IMAGE_NAME}:${IMAGE_VERSION}
echo "Deploying the container"
}
###########################################################################################################################################
dockerinit(){
# checks if image is available already or not
result=$( sudo docker images -q ${IMAGE_NAME}:${IMAGE_VERSION} )
if [[ -n "$result" ]]; then
echo "image ${IMAGE_NAME}:${IMAGE_VERSION} exists"
docker container rm -f ${CONTAINER_NAME}
echo "Deleted the existing docker container"
else
echo "image ${IMAGE_NAME}:${IMAGE_VERSION} does not exist"
echo "building Image ${IMAGE_NAME}:${IMAGE_VERSION}"
buildTheImage
fi
deployImage
}
###########################################################################################################################################
parse_params "$@"

