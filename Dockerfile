FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

# Instalar dependencias mínimas
RUN apt-get update && apt-get install -y \
    r-base \
    r-base-dev \
    libcurl4-gnutls-dev \
    libssl-dev \
    libxml2-dev \
    wget \
    && rm -rf /var/lib/apt/lists/*

# Instalar solo paquetes esenciales (sin Cairo)
RUN R -e "options(repos = c(CRAN = 'https://cran.rstudio.com/')); install.packages('shiny', dependencies = FALSE)"
RUN R -e "options(repos = c(CRAN = 'https://cran.rstudio.com/')); install.packages('duckdb')"
RUN R -e "options(repos = c(CRAN = 'https://cran.rstudio.com/')); install.packages('DBI')"
RUN R -e "options(repos = c(CRAN = 'https://cran.rstudio.com/')); install.packages('ggplot2')"
RUN R -e "options(repos = c(CRAN = 'https://cran.rstudio.com/')); install.packages('dplyr')"
RUN R -e "options(repos = c(CRAN = 'https://cran.rstudio.com/')); install.packages('DT')"

# Crear directorios
RUN mkdir -p /srv/shiny-server

# Copiar aplicación
COPY app.R /srv/shiny-server/app.R

# Permisos
RUN chmod -R 755 /srv/shiny-server

# Exponer puerto
EXPOSE 3838

# Ejecutar app
WORKDIR /srv/shiny-server
CMD ["R", "-e", "shiny::runApp('/srv/shiny-server/app.R', host='0.0.0.0', port=3838)"]