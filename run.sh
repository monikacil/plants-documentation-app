#!/bin/bash
set -e

IMAGE_NAME="plant-doc"
CONTAINER_NAME="plantdoc-container"

echo "🚀 Loading variables from .env.local..."
if [ ! -f .env.local ]; then
  echo "❌ No .env.local file"
  exit 1
fi

set -a
source .env.local
set +a

echo "🔨 Building..."
docker build \
  --build-arg DATABASE_URL="$DATABASE_URL" \
  --build-arg NEXTAUTH_SECRET="$NEXTAUTH_SECRET" \
  -t "$IMAGE_NAME" .

if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
  echo "🧹 Removing existing container..."
  docker rm -f "$CONTAINER_NAME" >/dev/null 2>&1 || true
fi

echo "🏃‍♀️ Running container..."
docker run -d \
  --rm \
  -p 3000:3000 \
  --env-file .env.local \
  --name "$CONTAINER_NAME" \
  "$IMAGE_NAME"

echo "✅ The container is working! The application is available at: http://localhost:3000"
