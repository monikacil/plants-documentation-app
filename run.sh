#!/bin/bash

# shellcheck disable=SC2046
export $(grep -v '^#' .env.local | xargs)

docker build \
  --build-arg DATABASE_URL \
  --build-arg NEXTAUTH_SECRET \
  -t plant-doc .

docker run -p 3000:3000 \
  --env-file .env.local \
  --name plantdoc-container \
  plant-doc
