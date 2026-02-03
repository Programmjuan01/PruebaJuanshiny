FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

# Instalar dependencias base
RUN apt-get update && apt-get install -y \
    wget \
    gdebi-core \
    software-properties-common \
    dirmngr \
    gnupg \
    apt-transport-https \
    ca-certificates \
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

# Descargar e instalar Shiny Server
RUN wget https://download3.rstudio.org/ubuntu-18.04/x86_64/shiny-server-1.5.21.1012-amd64.deb && \
    gdebi -n shiny-server-1.5.21.1012-amd64.deb && \
    rm shiny-server-1.5.21.1012-amd64.deb

# Instalar paquetes R
RUN R -e "install.packages(c('shiny', 'duckdb', 'DBI', 'ggplot2', 'dplyr', 'DT'), repos='https://cran.rstudio.com/', dependencies=TRUE)"

# Crear directorios
RUN mkdir -p /srv/shiny-server/data /srv/shiny-server/R

# Copiar aplicación
COPY app.R /srv/shiny-server/app.R

# Permisos
RUN chmod -R 755 /srv/shiny-server

# Configurar Shiny Server
RUN echo 'run_as shiny;' > /etc/shiny-server/shiny-server.conf && \
    echo 'server {' >> /etc/shiny-server/shiny-server.conf && \
    echo '  listen 3838;' >> /etc/shiny-server/shiny-server.conf && \
    echo '  location / {' >> /etc/shiny-server/shiny-server.conf && \
    echo '    site_dir /srv/shiny-server;' >> /etc/shiny-server/shiny-server.conf && \
    echo '    log_dir /var/log/shiny-server;' >> /etc/shiny-server/shiny-server.conf && \
    echo '    directory_index on;' >> /etc/shiny-server/shiny-server.conf && \
    echo '  }' >> /etc/shiny-server/shiny-server.conf && \
    echo '}' >> /etc/shiny-server/shiny-server.conf

# Exponer puerto
EXPOSE 3838

# Ejecutar Shiny Server
CMD ["/usr/bin/shiny-server"]