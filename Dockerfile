# Usar imagen base de R con Shiny
FROM rocker/shiny:latest

# Instalar dependencias del sistema si las necesitas
RUN apt-get update && apt-get install -y \
    libcurl4-openssl-dev \
    libssl-dev \
    libxml2-dev \
    libmariadb-dev \
    && rm -rf /var/lib/apt/lists/*

# Crear directorio de trabajo
WORKDIR /srv/shiny-server

# Copiar el archivo de dependencias (si usas renv)
# COPY renv.lock .

# Instalar paquetes R necesarios
RUN R -e "install.packages(c('shiny', 'ggplot2', 'dplyr', 'DBI', 'RMySQL'), repos='https://cran.rstudio.com/')"

# Copiar la aplicación
COPY app.R .
# O si usas formato separado:
# COPY ui.R server.R ./

# Copiar archivos adicionales si los tienes
# COPY data/ ./data/

# Exponer el puerto
EXPOSE 3838

# Comando para ejecutar la aplicación
CMD ["R", "-e", "shiny::runApp('/srv/shiny-server', host='0.0.0.0', port=3838)"]
