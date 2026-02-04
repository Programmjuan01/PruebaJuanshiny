FROM rocker/shiny:latest

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    libcurl4-openssl-dev \
    libssl-dev \
    libxml2-dev \
    libmariadb-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Instalar paquetes R
RUN R -e "install.packages(c('shiny', 'ggplot2', 'dplyr'), repos='https://cran.rstudio.com/')"

# Copiar aplicación
WORKDIR /srv/shiny-server
COPY app.R .

# Exponer puerto
EXPOSE 3838

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s \
  CMD curl -f http://localhost:3838/ || exit 1

# Ejecutar aplicación
CMD ["R", "-e", "shiny::runApp('/srv/shiny-server/app.R', host='0.0.0.0', port=3838)"]