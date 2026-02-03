library(shiny)
library(DBI)
library(duckdb)
library(ggplot2)
library(dplyr)

ui <- fluidPage(
  titlePanel("🚀 Mi App R en Dokploy - Prueba"),
  
  sidebarLayout(
    sidebarPanel(
      h3("Controles"),
      sliderInput("numero", "Selecciona un número:", 
                  min = 1, max = 100, value = 50),
      hr(),
      actionButton("test_db", "Probar DuckDB", class = "btn-primary")
    ),
    
    mainPanel(
      h3("Resultado:"),
      verbatimTextOutput("info"),
      hr(),
      plotOutput("grafico", height = "300px"),
      hr(),
      h4("Test DuckDB:"),
      verbatimTextOutput("db_test")
    )
  )
)

server <- function(input, output, session) {
  
  output$info <- renderPrint({
    cat("Elegiste el número:", input$numero, "\n")
    cat("Versión de R:", R.version.string, "\n")
    cat("Paquetes cargados:\n")
    cat("  - shiny:", packageVersion("shiny"), "\n")
    cat("  - duckdb:", packageVersion("duckdb"), "\n")
    cat("  - ggplot2:", packageVersion("ggplot2"), "\n")
  })
  
  output$grafico <- renderPlot({
    datos <- data.frame(
      x = 1:input$numero,
      y = (1:input$numero)^2
    )
    
    ggplot(datos, aes(x = x, y = y)) +
      geom_line(color = "#E60000", size = 1.5) +
      geom_point(color = "#E60000", size = 3) +
      theme_minimal() +
      labs(title = "Función Cuadrática",
           x = "Valor", y = "Cuadrado") +
      theme(plot.title = element_text(hjust = 0.5, size = 16, face = "bold"))
  })
  
  output$db_test <- renderPrint({
    input$test_db
    
    isolate({
      tryCatch({
        # Conectar a DuckDB
        con <- dbConnect(duckdb::duckdb(), dbdir = "data/test.duckdb")
        
        # Crear tabla de prueba
        dbExecute(con, "CREATE OR REPLACE TABLE prueba AS 
                       SELECT * FROM (VALUES 
                         ('Claro', 100),
                         ('Tigo', 80),
                         ('Movistar', 90)
                       ) AS t(empresa, valor)")
        
        # Consultar
        resultado <- dbGetQuery(con, "SELECT * FROM prueba ORDER BY valor DESC")
        
        # Cerrar conexión
        dbDisconnect(con, shutdown = TRUE)
        
        cat("✅ DuckDB funcionando correctamente!\n\n")
        print(resultado)
        
      }, error = function(e) {
        cat("❌ Error con DuckDB:\n")
        cat(e$message)
      })
    })
  })
}

shinyApp(ui = ui, server = server)