- comando para la creacion de un servicio

```
docker-compose up -d <nombre servicio a inicializar>
```

- Termina la ejecucion de un contenedor

```
# todo
docker-compose down
#or
# por nombre
docker-compose down <nombre servicio>
```

- comando para ejecutar un servicio en la terminal

```
docker-compose exec nameService bash
```

- comando para ver los contenedores que estan activos

```
docker ps
```

- Comando para ver la informacion de un contenedor

```
docker inspect <contenedor>
```

### comando para conectarse a la base de datos por la terminal

- psql -h localhost -d nombreDb -U nameUser

```
#version
version: '3.3'
#servicios
services:
  #nombre servicio
  postgres:
    #nombre image
    image: postgres:13
    #variables de entono
    environment:
      - POSTGRES_DB=my_store_database
      - POSTGRES_USER=k3v1n
      - POSTGRES_PASSWORD=k3v1n
    #puerto en el cual va a correr
    ports:
      - 5432:5432
    # los cotenerdores no tienen un estado por lo que si la ejecucion termina, la informacion no se guarda se elimina es
    # decir no persiste y para ello se define un volumen, este volumne ayudara a guardar estos datos, es decir cuando se
    # levante el servicio le estartimos indicanco al contenedor que guarde los datos en el volumen especificado

    #volumen
    volumes:
      #ruta en el cual se gusrdara los datos, esta ruta varia depende al base de datos para mysql puede ser otra ruta
      - ./src/postgres_data:/var/lib/postgresql/data
      #postgres_data es el volumne interno y esta carpeta debe existir en el proyecto
  #servicio para interfas grafica
  pgadmin:
    image: dpage/pgadmin4
    environment:
      - PGADMIN_DEFAULT_EMAIL=admin@gmail.com
      - PGADMIN_DEFAULT_PASSWORD=root
    ports:
      - 5050:80
```

### Manejando un POOL de conecciones

- cuando el servidor se conecta a la base de datos mediante un `<getConnections>` esto crea una nueva coneccion, entonces si simulamos un entorno de produccion cada vez que un clienete se concete al servicio este creara una nueva coneccion y hacer eso no es muy recomendable, por seo se ve la necesidad de usar un `<pool>`.
- un pool nos permite generar una sola coneccion desede el servidro hacia la base de datos, de esta manera cada vez que exista una coneccion solo se reutilizara la coneccion que ya a sido creada.

### Variables de Ambiente (variables de entorno)

- configurar las variables de entorno es una buena practica, porque de esta manera podremos gestionar de manera mas eficiente, segura, y flexible toda la informacion relevante y sencible bajo la cual puede estar corriendo la applicacion.

### ORM (Object relational mapping)

- un ORM nos permite maniular todos los datos y tambien las colecciones con el paradigma orientada a objetos, es decir podremos ejecutar metodos que nos permitiran manipular rapidamente los datos
- las dos ORM muy famosos en el entorno de node son:
  - [Sequelize](https://sequelize.org/)
  - [TypeORM](https://typeorm.io/)
- cuando se usa un ORM ya no es necesario usar un pool
- En este proyecto se utilizara como ORM `<Sequelize>`, para ello se debe crear un archivo de configuracion en donde se debe instalara el ORM

```
npm install --save sequelize
# o
yarn add sequelize
```

- tambien se debe instalar el controlador de la base de datos que lo este utilizando, en este proyecto se ests utilizando a `<Postgres>`, entonces para instalar el controlador o el driver es:

```
npm install --save pg pg-hstore
# o
yarn add pg pg-hstore
```

- una ves instalado las dependencias debe de crear un archivo de configuracion, este deve tener la estructura:

```
// debe importar a sequelize

// debe tener una URI con como lo que sigue
const URI = `<nombre SGBDR>://${<usuarioBD>}:${<passwordDB>}@${<dbHost>}`:@${<dbPort>}/${<dbName>}

// crea la instanscia de <sequelize> y pasale la uri como parametro
```

- ahora es momento de hablar sobre las consutas con sequelize:
  - 1. importa el archivo de configuracion que creaste
  - 2. al momento de de hacer la consulta debes tomar en cuenta que se retorna un array entre ellos estan dos aspectos muy importantes uno es la `<data>` y `<metadata>`
    - la data contiene los datos de que retorna la consulta desde la base de datos
    - metadata contiene los comandos ejecutados para la consulta , las filas y sus datos de la BD y los campos que tiene la tabal y de cada una de ellas se encuentra detallado el tipo de dato que tienen y algunos aspectos importantes de cada campo d ela tabla

### migraciones

- las migraciones son la forma de hacer seguimiento en los cambios que se hacen en la base de datos y mantener un historia de todos esos cambios
- para hacer las migraciones es necesario crear archivos de configuracion
- iniciaremos con el archivo de configuracion `<.sequelicerc>` que contiene todos las rutas a directorios y archivos que contienen toda la configuracion para administrarla el contenido del archivo es la siguiente

```
// module.exports ={
export default{
    'config':'./db/config/config.js',
    'models-path': './db/models/',
    'migrations-path': './db/migrations/',
    'seeders-path': './db/seeders/',
}
```
- Explicacion de cada linea:
  - `<'config':'./db/config/config.js',>` :  
    - Esta clave "config" hace referencia al archivo de configuración de la base de datos. 
    - La ruta `'./db/config/config.js'` indica la ubicación del archivo config.js que contiene la configuración de la base de datos, como las credenciales de acceso, el host, el puerto, entre otras opciones.

  - `<'models-path': './db/models/'>`: 
    - Esta clave "models-path" indica la ubicación de los modelos de datos definidos para el ORM. 
    - La ruta './db/models/' especifica que los archivos de los modelos se encuentran en la carpeta models dentro del directorio db. En los modelos, se definen las estructuras de las tablas de la base de datos y las relaciones entre ellas.
  - `<'migrations-path': './db/migrations/'>`:
    -  Esta clave "migrations-path" señala la ubicación de los archivos de migración. Las migraciones son scripts que permiten cambiar el esquema de la base de datos a lo largo del tiempo, de manera controlada y reversible. 
    - La ruta './db/migrations/' indica que los archivos de migración se encuentran en la carpeta migrations dentro del directorio db.
  - `<'seeders-path': './db/seeders/',>`:
    -  Esta clave "seeders-path" indica la ubicación de los archivos de "seeders" o semillas. Los seeders son scripts que se utilizan para insertar datos de muestra o iniciales en la base de datos, lo que ayuda a poblarla con datos predefinidos. 
    - La ruta './db/seeders/' señala que los archivos de semillas se encuentran en la carpeta seeders dentro del directorio db.
  
- tambien puedes revisar la [documentacion oficial](https://sequelize.org/docs/v6/other-topics/migrations/) del ORM sequelize que se esta utilizando en el proyecto

- ahora podemos crear los directorios y archivos de configuracion para las migraciones tales como se especificaron en el archivo `.sequelicerc`, puede crearlos manualmente en las rutas especificada, puede ejecutar el siguiente comando en la terminal:
````
npx sequelize-cli init <ruta>
```
- esto creara los directorios:
  - `config`: contiene un archivo de configuracion, dentro se congigura un archivo `config.js`
    - el contenido del archivo debe ser de lo siguiente
      - una `URI` con las credenciales de coneccion a la base de datos
      ````
      protocolo://<usuario>:<contraseña>@<host>:<puerto>/<base_datos>
      ```
      - protocolo: es el protocolo o driver utilizado para la coneccion puede ser `mysql, postgresql, sqlite, etc`
      - usuario: es el usuario que tendra acceso a la base de datos
      - contraceña: es la contraceña del usuario
      - host: es la direccion del servidor de la base de datos puede ser un nombre de domonio o una direccion ip `localhost`
      - puerto: es el puerto en la que el servidor esta a la escucha de las conecciones
      - base_datos: es el nombre de la base de datos

      - `NOTA`: algunos componentes de la `URI` deben ir cifrados o codificados pede usar `encodeURIComponent` de javascript
      - un ejemplo del archivo:
````

import { config } from '../../config/app.config.js'

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

module.exports = {
    development: {
        url: URI,
        dialect: 'postgres'
    },
    production: {
        url: URI,
        dialect: 'postgres'
    }
}

```
  - `models`: contiene todos los modelos para el proyecto
  - `migrations`: contiene todos los archivos de migracion
  - `seeders`: contiene todos los archivos semilla 
- creacion del primier modelo y migracion:
  - para la creacion del primer modelo es solo ejecutar el comando `model:generate`, este comanndo requiere 2 opciones pero no son requeridos:
    - `name`: es el nombre del modelo
    - `atributes`: la lista de atributos del modelo.
- Ejemplo:
````
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
```
- si el comando anterior no funciona prueba con
````
npx sequelize migration:generate --name User
```

- comando para ejecutar todas las misgraciones
```
npx sequelize db:migrate
```

- revertir migraciones
```
npx sequelize db:migrate:undo
```

- eliminar todas las migraciones
```
npx sequelize db:migrate:undo:all
```


- Database Cretentials:
```
name: my_store_database
pass: kRtOSzEIgpzijnTd
```
