
## Relaciones de la base de datos

![App Screenshot](https://cdn.dribbble.com/userupload/5798863/file/original-76b5df8727762ce05677ca9e21c9574d.jpg?compress=1&resize=600x499)


## Rutas de la API

#### Obtener todos los libros diarios existentes

```http
  GET /v1/api/librodiario/verLibroDiario
```



#### Obtener todos los acientos de un libro diario

```http
  GET /v1/api/librodiario/verAcientos/${id_libro_diario}
```

| Parámetros | Tipo de dato     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `id_libro_diario`| `entero` | **Requerido**. para obtener acientos  |




## Variables de entorno

Estas son las variables de entorno que necesitas en tu archivo .env

`PORT`

`DATABASE`

`USUARIOBDD`

`CONTRASENABDD`

`HOSTBDD`




