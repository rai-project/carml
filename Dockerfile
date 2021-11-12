FROM node:8-alpine as build

WORKDIR /app

COPY package* ./
RUN npm install

ARG REACT_APP_SITE_TITLE
ENV REACT_APP_SITE_TITLE=${REACT_APP_SITE_TITLE}

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

ARG REACT_APP_TRACE_URL
ENV REACT_APP_TRACE_URL=${REACT_APP_TRACE_URL}

ARG REACT_APP_UPLOAD_URL
ENV REACT_APP_UPLOAD_URL=${REACT_APP_UPLOAD_URL}

ARG REACT_APP_VERSION
ENV REACT_APP_VERSION=${REACT_APP_VERSION}

# add app after dependencies have been installed to stop cache busting
COPY ./public ./public
COPY ./src ./src
COPY ./* ./

RUN npm run build

# production web server
FROM nginx:stable
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/sync-to-s3.sh sync-to-s3.sh
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
