# ---------- stage 1: build frontend ----------
FROM node:18-alpine AS frontend-builder
WORKDIR /workspace

# install deps for frontend
COPY apps/playground/package*.json apps/playground/
WORKDIR /workspace/apps/playground
RUN npm install    

# copy rest frontend source and build
COPY apps/playground/ .
RUN npm run build

# ---------- stage 2: build backend ----------
FROM node:18-alpine AS runtime
WORKDIR /app

# copy server package.json and install deps
COPY server/package*.json ./server/
WORKDIR /app/server
RUN npm install ..omit=dev   

# copy server source
COPY server/ ./server

# copy frontend output
COPY --from=frontend-builder /workspace/apps/playground/out ./server/public

WORKDIR /app/server
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]
