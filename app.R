library(shiny)

ui <- fluidPage(
  titlePanel("Prueba Dokploy - Claro"),
  sidebarLayout(
    sidebarPanel(
      h3("Panel lateral")
    ),
    mainPanel(
      h2("¡Aplicación funcionando!"),
      p("Esta es una prueba básica de Shiny en Dokploy")
    )
  )
)

server <- function(input, output, session) {
  # Lógica del servidor
}

shinyApp(ui = ui, server = server)