FROM arm64v8/ubuntu:22.04

# Evitar prompts interactivos
ENV DEBIAN_FRONTEND=noninteractive

# Instalar R y dependencias del sistema
RUN apt-get update && apt-get install -y \
    r-base \
    r-base-dev \
    libcurl4-openssl-dev \
    libssl-dev \
    libxml2-dev \
    libfontconfig1-dev \
    libharfbuzz-dev \
    libfribidi-dev \
    libfreetype6-dev \
    libpng-dev \
    libtiff5-dev \
    libjpeg-dev \
    curl \
    wget \
    && rm -rf /var/lib/apt/lists/*

# Configurar repositorio CRAN
RUN echo 'options(repos = c(CRAN = "https://cran.rstudio.com/"))' >> /etc/R/Rprofile.site

# Instalar paquetes R uno por uno (más estable)
RUN R -e "install.packages('shiny')"
RUN R -e "install.packages('dplyr')"
RUN R -e "install.packages('ggplot2')"

# Crear directorio de trabajo
WORKDIR /app

# Copiar aplicación
COPY app.R .

# Exponer puerto
EXPOSE 3838

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s \
  CMD curl -f http://localhost:3838/ || exit 1

# Ejecutar aplicación
CMD ["R", "-e", "shiny::runApp('/app/app.R', host='0.0.0.0', port=3838)"]