FROM node:22-bookworm

WORKDIR /app

RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/* \
    echo "=== BUILDING MY CUSTOM IMAGE ==="

CMD ["npm", "run", "dev"]