#!/bin/bash

for dir in */; do
  if [ -d "$dir" ]; then
    cp "$dir/.env.example" "$dir/.env" 2>/dev/null && \
      echo "✅ Copied .env.example -> .env in $dir" || \
      echo "⚠️  Skipped $dir (file not found or error)"
  fi
done
docker compose up -d --build