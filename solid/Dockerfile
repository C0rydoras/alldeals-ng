FROM oven/bun:latest as build

WORKDIR /solid
COPY . .
RUN bun install --frozen-lockfile

RUN bun run build
EXPOSE 4200

FROM nginx:alpine
COPY --from=build /solid/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

