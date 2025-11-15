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

# ---------- stage 2: run server ----------
FROM node:18-alpine AS runtime
WORKDIR /app/server

# install server deps
COPY server/package*.json ./
RUN npm install --omit=dev

# copy server source
COPY server/ .

# copy frontend output
COPY --from=frontend-builder /workspace/apps/playground/.next ./public


ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]
