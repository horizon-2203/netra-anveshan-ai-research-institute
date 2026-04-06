FROM node:20.11.0-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_SUPABASE_URL=https://iuiqewnunafevgpulroh.supabase.co
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1aXFld251bmFmZXZncHVscm9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyMzA1OTMsImV4cCI6MjA4OTgwNjU5M30.TUSzN3MNQ1EjcqS2olG1nROTu1hS8SmriIKTpXp_iBM
ARG NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_4m4yTKOOfYAh1slhhaoI1w_uNsAB5YF

ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=$NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
ENV NEXT_TELEMETRY_DISABLED=1
RUN printf '%s\n' \
	"NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL" \
	"NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY" \
	"NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=$NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY" > /app/.env.local
RUN npm run build

FROM base AS runner
WORKDIR /app

ARG NEXT_PUBLIC_SUPABASE_URL=https://iuiqewnunafevgpulroh.supabase.co
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1aXFld251bmFmZXZncHVscm9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyMzA1OTMsImV4cCI6MjA4OTgwNjU5M30.TUSzN3MNQ1EjcqS2olG1nROTu1hS8SmriIKTpXp_iBM
ARG NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_4m4yTKOOfYAh1slhhaoI1w_uNsAB5YF
ARG INTERNAL_API_URL=http://127.0.0.1:3000

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=$NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
ENV INTERNAL_API_URL=$INTERNAL_API_URL

RUN apk add --no-cache python3

COPY --from=builder /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/.env.local ./.env.local
COPY --from=builder --chown=node:node /app/scripts/write_log.py ./scripts/write_log.py
COPY --chown=node:node ./scripts/start-with-logs.sh ./scripts/start-with-logs.sh

RUN chmod +x /app/scripts/start-with-logs.sh /app/scripts/write_log.py
RUN mkdir -p /app/logs/website /app/logs/admin /app/logs/docker /app/uploads \
	&& touch /app/logs/app.log \
	&& touch /app/logs/website/page.json /app/logs/website/about.json /app/logs/website/research.json /app/logs/website/facilities.json /app/logs/website/contact.json /app/logs/website/portal.json \
	&& touch /app/logs/admin/admin.json /app/logs/admin/admindatasets.json /app/logs/admin/adminpublications.json /app/logs/admin/adminrequests.json /app/logs/admin/adminprojects.json /app/logs/admin/adminprofile.json \
	&& touch /app/logs/docker/container.log \
	&& chown -R node:node /app/logs /app/uploads /app/.env.local

USER node

EXPOSE 3000

CMD ["/bin/sh", "/app/scripts/start-with-logs.sh"]
