FROM node:20-alpine AS development
WORKDIR /app
COPY --chown=node:node package*.json ./
RUN npm ci -f
COPY --chown=node:node . .
USER node


FROM node:20-alpine AS build
WORKDIR /app
COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /app/node_modules ./node_modules
COPY --chown=node:node . .
RUN npm run build
RUN npm ci -f --only=production && npm cache clean --force
USER node


FROM node:20-alpine AS production
ENV NODE_ENV production
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist

EXPOSE 3000
CMD [ "node", "dist/http/express.js" ]