# для vercel
FROM node:16-alpine AS client-build

WORKDIR /app
COPY client/package*.json ./client/
RUN cd client && npm install
COPY client ./client
RUN cd client && npm run build

FROM node:14-alpine

WORKDIR /app
COPY server/package*.json ./server/
RUN cd server && npm install
COPY server ./server
COPY --from=client-build /app/client/dist ./client/dist

EXPOSE 3000

CMD ["node", "server/server.js"]
