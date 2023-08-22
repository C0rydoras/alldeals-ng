FROM node:20-slim as build

ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /solid
COPY package.json pnpm-lock.yaml .
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build
EXPOSE 4200

FROM nginx:alpine
COPY --from=build /solid/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

