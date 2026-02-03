FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

# Instalar dependencias base y Cairo
RUN apt-get update && apt-get install -y \
    wget \
    git \
    cmake \
    software-properties-common \
    dirmngr \
    gnupg \
    apt-transport-https \
    ca-certificates \
    pandoc \
    libcairo2-dev \
    libxt-dev \
    libpng-dev \
    libjpeg-dev \
    libtiff-dev \
    && rm -rf /var/lib/apt/lists/*

# Agregar clave y repositorio de R
RUN wget -qO- https://cloud.r-project.org/bin/linux/ubuntu/marutter_pubkey.asc | gpg --dearmor -o /usr/share/keyrings/r-project.gpg && \
    echo "deb [signed-by=/usr/share/keyrings/r-project.gpg] https://cloud.r-project.org/bin/linux/ubuntu jammy-cran40/" | tee -a /etc/apt/sources.list.d/cran.list

# Instalar R y dependencias
RUN apt-get update && apt-get install -y \
    r-base \
    r-base-dev \
    libcurl4-gnutls-dev \
    libssl-dev \
    libxml2-dev \
    && rm -rf /var/lib/apt/lists/*

# Instalar paquetes R necesarios (sin Cairo para evitar problemas)
RUN R -e "install.packages(c('shiny', 'duckdb', 'DBI', 'ggplot2', 'dplyr', 'DT'), repos='https://cran.rstudio.com/', dependencies=TRUE)"

# Crear directorios para Shiny
RUN mkdir -p /srv/shiny-server /var/log/shiny-server

# Copiar aplicación
COPY app.R /srv/shiny-server/app.R

# Permisos
RUN chmod -R 755 /srv/shiny-server

# Exponer puerto
EXPOSE 3838

# Ejecutar la app directamente con R
WORKDIR /srv/shiny-server
CMD ["R", "-e", "shiny::runApp('/srv/shiny-server/app.R', host='0.0.0.0', port=3838)"]