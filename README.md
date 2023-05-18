
## Screenshots

![App Screenshot](https://github.com/brianmunioz/gestor-de-libros-diarios/blob/master/screenshots/SCREENSHOT%201.jpg)


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




