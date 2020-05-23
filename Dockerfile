FROM capra314cabra/llvm-cbe:latest AS cbe

FROM kaprino/kaprino:v1.1.0

WORKDIR /app

COPY --from=cbe /usr/local/bin/llvm-cbe /usr/local/bin/llvm-cbe
COPY . /app

RUN apk update \
    && apk upgrade \
    && apk add --no-cache \
        npm \
    && rm -rf /var/cache/apk/* \
    && npm install \
    && npx webpack \
    && mkdir -p /app/tmp

CMD npx ts-node index.ts
