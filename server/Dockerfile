# ---------- stage 1: build frontend ----------
FROM node:18-alpine AS frontend-builder
WORKDIR /workspace

# install deps for frontend
COPY apps/playground/package*.json apps/playground/
WORKDIR /workspace/apps/playground
RUN npm ci --production=false

# copy rest frontend source and build
COPY apps/playground/ .
RUN npm run build

# ---------- stage 2: build backend ----------
FROM node:18-alpine AS runtime
WORKDIR /app

# copy server package.json and install production deps
COPY server/package*.json ./server/
WORKDIR /app/server
RUN npm ci --production

# copy server source
COPY server/ ./server

# copy built frontend into server/public (adjust path if your server serves different folder)
# frontend build output assumed at /workspace/apps/playground/out or /workspace/apps/playground/dist
COPY --from=frontend-builder /workspace/apps/playground/out ./server/public
# if your frontend uses 'dist' instead of 'out', replace 'out' with 'dist' above

WORKDIR /app/server

ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]
