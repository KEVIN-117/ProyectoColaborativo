# **ORM (Object Relational Mapping)**

- un `ORM` es un puente que nos permite conectar nuetra applicacion con la base de datos con el lenguaje de programcion que se esta trtabajando en el proyecto, es decir tengo un proyecto echo en con `express` y `javascript`, la base de datos es `MySql` con sql. El orm me ayudara a conectarme a la db no con sql sino con `javascript`.

- lo que lo hace a un orm especial es que este se encarga de mapear objetos con el modelo relacional. 
[Ejemplo Visual](src/db/Diagrama sin título-Página-6.jpg)
- en la imegan de observa se observa una representacion de la base de datos que tiene tablas y cada tabla tiene campos y filas, tambien se puede observar el paradigma [POO](https://es.wikipedia.org/wiki/Programaci%C3%B3n_orientada_a_objetos#:~:text=La%20POO%20es%20un%20paradigma,emulan%20su%20comportamiento%20o%20actividad.) que tiene clases y cada clase tiene objetos, atributos y metodos.

- entonces lo que hace el ORM es mapear es decir emparejar tablas con objetos, el orm convierte una tabla en una clase, las filas se combierten en objetos y los campos se combierten en atributos o propiedades, de esta manera el ORM se encarga de crear y estructura toda la base de datos de la applicacion
