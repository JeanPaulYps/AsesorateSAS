# AsesorateSAS
Proyecto de ingeniería de requisitos, de un software para asesorías académicas

## Arquitectura

**Vistas:** 
 - HTML
 - CSS
 - Javascript
 
**Controlador**
 - Python 3 Django
 
**Codificación**
 - PEP8 Estandar
 
**Base de datos**
  - MySQL
  - **Usuario**: admin-admin
  - **Nombre base de datos**:asesorate_sas
 

**Vistas:** 
 - HTML
 - CSS
 - Javascript
 
**Controlador**
 - Python 3 Django
 
 
**Codificación**
 - PEP8 Estandar
 
**Base de datos**
- PostgreSQL
  - **Dirección**: asesoratesas.postgres.database.azure.com
  - **Usuario**: asesorate@asesoratesas
  - **Contraseña**: t^g\d4HEX
  - **Nombre base de datos**:asesorate_sas

 **Notas adicionales**
 En django se manejan los modelos, los serializadores y los viewer
 los modelos son las tablas que qdaran en la bd asi que a los que 
 les toca crear tabals en la base de datos tienen q crear los modelos
 y luego mandar el comando python manage.py migrate, los serialziadores
 son para empaquetar eso en documentos json y las vistas son para 
 la parte de un crud basico. Instalar xampp-windows-x64-7.3.6-2-VC15-installer
 tienen que crear un usuario admin con password admin, y una base de datos 
 asesorate_sas para que les funcione django, que ya esta configurado con esos
 datos. 
 
 **Estructura base de datos**
 - Las bases de datos empezaran por mayuscula y en plural, ejemplo:Estudiantes
 - Los atributos son en minuscula y como digan los criterios, ejemplo: estudiante tiene nombre, entonces en Estudiantes hay un atributo; nombre
