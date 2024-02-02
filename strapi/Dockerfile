FROM node:20-alpine as base
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV PATH /opt/node_modules/.bin:$PATH
RUN corepack enable

FROM base as build
WORKDIR /opt/
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
ENV UPSTREAM_URL "https://mystudentyears.co.uk/strapi"
WORKDIR /opt/app
COPY . .
RUN pnpm run build

# Creating final production image
FROM base
WORKDIR /opt/
COPY --from=build /opt/node_modules ./node_modules
WORKDIR /opt/app
COPY --from=build /opt/app ./
RUN chown -R node:node /opt/app
USER node
EXPOSE 1337
CMD ["pnpm", "run", "start"]
