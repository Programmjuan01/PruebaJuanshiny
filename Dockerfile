FROM rocker/shiny:latest

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    libcurl4-gnutls-dev \
    libssl-dev \
    libxml2-dev \
    && rm -rf /var/lib/apt/lists/*

# Instalar paquetes R necesarios
RUN R -e "install.packages(c( \
    'shiny', \
    'duckdb', \
    'DBI', \
    'ggplot2', \
    'dplyr', \
    'DT' \
), repos='https://cran.rstudio.com/')"

# Crear directorios necesarios
RUN mkdir -p /srv/shiny-server/data /srv/shiny-server/R

# Copiar aplicación
COPY app.R /srv/shiny-server/app.R

# Copiar carpeta R si existe (nota la barra al final)
COPY R/ /srv/shiny-server/R/

# Permisos
RUN chmod -R 755 /srv/shiny-server

# Exponer puerto
EXPOSE 3838

# Ejecutar Shiny Server
CMD ["/usr/bin/shiny-server"]