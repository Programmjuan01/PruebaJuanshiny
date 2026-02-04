# syntax=docker/dockerfile:1
FROM --platform=$BUILDPLATFORM rocker/r-base:latest

# Instalar Shiny y dependencias
RUN apt-get update && apt-get install -y \
    libcurl4-openssl-dev \
    libssl-dev \
    libxml2-dev \
    curl \
    && R -e "install.packages(c('shiny', 'dplyr', 'ggplot2'), repos='https://cran.rstudio.com/')" \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY app.R .

EXPOSE 3838

HEALTHCHECK --interval=30s --timeout=10s \
  CMD curl -f http://localhost:3838/ || exit 1

CMD ["R", "-e", "shiny::runApp('/app/app.R', host='0.0.0.0', port=3838)"]