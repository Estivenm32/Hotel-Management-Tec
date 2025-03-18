# Prueba Tecnica
															

# Descripción 

Este proyecto se realiza con el fin de dar solución a la necesidad de un software para una empresa de hoteleria 
que permita almacenar y gestionar el inventario los hoteles en el sistemas.


Este Proyecto se realizó con el fin de cumplir el siguiente requerimiento: Evaluar  habilidades y conocimientos

Requerimieto: 

un sistema que permita ingresar los hoteles con los que cuenta la compañía,
además de los nombres básicos del hotel, se deben ingresar los datos tributarios básicos.
Adicional a eso el gerente hotelero requiere que a los hoteles con los que cuenta la compañía,
se les pueda asignar los tipos de habitación (Estándar, Junior y Suite). Este sistema debe validar
que únicamente se pueda asignar las acomodaciones según el tipo:
- Si el tipo de habitación es Estándar: la acomodación debe ser Sencilla o Doble.
- Si el tipo de habitación es Junior: la acomodación debe ser Triple o Cuádruple
- Si el tipo de habitación es Suite: la acomodación debe ser Sencilla, Doble o Triple

# Requisitos previos


>Tener instalada una versión de PHP en mi caso tengo la versión (8.2.12)
>Tener instalada una versión de Node js en mi caso tengo la versión (22.11.0)
>Tener instalada una versión de Postgresql en mi caso tengo la ultima versión


# Pasos para ejecutar el proyecto 

>Descargar el proyecto "Hotel-Management-Tec"
>Dentro del proyecto se encuenta una carpeta llamada "DB" donde se encuenta la base de datos del proyecto, la base de datos 
debe ser ejecutada de forma local en el gestor de Postgresql "pgAdmin"
>Abrir el proyecto "Hotel-Management-Tec" en un editor de código de su preferencia, puede utilizar Visual Studio Code. 
>En la carpeta hoteles-backend abrir el archivo .env y verificar que la conexión de la base de datos Postgresql sean las mismas que las credenciales configuradas en tu Postgresql:

	Ejmeplo:
	
	DB_CONNECTION=pgsql
	DB_HOST=127.0.0.1
	DB_PORT=5432
	DB_DATABASE=hotelManagement
	
	Esta parte sera diferente conforme a tu configuración: 
	
	DB_USERNAME=postgres
	DB_PASSWORD=54321
  
>En la terminal del Visual Studio Code o en CMD(Si lo ejecutas en cmd debe ser como Administrador), ubicarse en la carpeta  "hoteles-backend"  Y ejecutar el comando "php artisan serve y debe mostrar:

	INFO  Server running on [http://127.0.0.1:8000].
	Press Ctrl+C to stop the server

	
	Nota: en caso de que no se realice la conexión de forma correcta, debe verificar que las credenciales del archvibo .env esten correctas.
	
>En una nueva terminal de Visual Studio Code o en CMD(Si lo ejecutas en cmd debe ser como Administrador) ubicarse en la carpeta "hoteles-frontend"  Y ejecutar el comando "npm run dev" el proyecto se debe ver en
http://localhost:5173/ o en el puerto local que le indique.

# Tecnologias:

>React
>Javascript
>PHP
>Laravel
>Postgresql
>Tailwind


La aplicación es totalmente RESTFULL

# Créditos

Estiven Mampira
