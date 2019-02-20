# Issues Tracker

Dada la URL de cualquier repositorio de Github, lista las cuestiones que se han realizado en él. 


## Comentarios

El proyecto está generado con Angular CLI bajo la versión 7.3.2.

Como base de estilo se ha utilizado la librería Bootstrap 4.

Se ha decidido decidido añadir la librería de iconos fontawesome para darle algo más de estilo visual y para ahorrar el espacio que ocuparía el texto.

Para acceder a los datos de Github se ha utilizado el API v3 ya que es de uso público y no requiere registros adicionales. Es importante indicar que tiene un funcionamiento peculiar conocido en la obtención del número total de cuestiones y no devuelve el total sino el número de `cuestiones abiertas`. Aún así es se ha decidido que es suficiente para la elaboración del este ejercicio.


## Ejecutar la aplicación 

Para correr la aplicación hay que acceder con la consola a la carpeta del proyecto e introducir el comando `ng serve`. Una vez cargado ve a la URL donde el proyecto será lanzado `http://localhost:4200/`. Para que se abra automáticamente en el navegador introducir el comando `ng serve --open`.

## Funcionamiento

En el campo de texto se introduce la URL completa de un repositorio cualquiera de Github y luego pulsar el `símbolo de la lupa`. El formato de URL utilizado será `https://github.com/{nombre-usuario}/{nombre-repositorio}`. Si el repositorio es válido cargará unos datos básicos de dicho repositorio y una lista de las cuestiones realizadas paginadas en grupos de 24 ordenadas de más nuevas a más antiguas.

En caso de que la carga del repositorio falle o que la URL del repositorio no sea válida, indicará un mensaje de error explicando brevemente lo ocurrido.

## Ejecutar tests unitarios

Para ejecutar los tests unitarios se aplicará el comando `ng test`.


## FAQ

# No me funciona el comando ng en MacOS

Si de inicio no reconoce la consola el comando `ng`, Ejecutar el siguiente comando para añadirlo a la sesión:

`alias ng="/usr/local/lib/node_modules/node/lib/node_modules/@angular/cli/bin/ng"`
