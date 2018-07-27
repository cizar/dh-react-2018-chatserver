# Chat Server API

[![Chat Server API](https://img.youtube.com/vi/Ibs5w-1uniU/0.jpg)](https://www.youtube.com/watch?v=Ibs5w-1uniU)

## Para comenzar

Instalar dependencias

```
npm install
``` 

Iniciar el servidor

```
npm start
```

## Endpoints

| URL             | Verbo     | Descripción              |
|-----------------|-----------|--------------------------|
| `/api/messages` | **GET**   | Listado de mensajes      |
| `/api/messages` | **POST**  | Enviar un nuevo mensaje  |
| `/api/members`  | **GET**   | Listado de participantes |
| `/api/members`  | **POST**  | Ingresar al chat         |

### Listado de mensajes

Pedido

```
  GET /api/messages
```

Respuesta

```
[
    {
        "id": "2c4bb0e4-9c04-48de-ab76-9de3fb1f410a",
        "text": "Hola a todos!!!",
        "member": {
            "id": "8dcc9866-c02b-43af-9187-5b53a2d75317",
            "username": "juan"
        }
    },
    {
        "id": "a53099c7-43d7-4844-8f6b-daead23751af",
        "text": "Hola Juan!",
        "member": {
            "id": "b7b76fb3-6c88-46e6-8bbd-ad739f3a57ae",
            "username": "sofia"
        }
    },
]
```

### Enviar un nuevo mensaje

Pedido

```
  POST /api/messages
  {
    "author": "8dcc9866-c02b-43af-9187-5b53a2d75317",
    "text": "Hola a todos!!!"
  }
```

Respuesta

```
{
    "id": "2c4bb0e4-9c04-48de-ab76-9de3fb1f410a",
    "text": "Hola a todos!!!",
    "member": {
        "id": "8dcc9866-c02b-43af-9187-5b53a2d75317",
        "username": "juan"
    }
}
```

### Listado de participantes

Pedido

```
  GET /api/members
```

Respuesta

```
[
  {
    "id": "b7b76fb3-6c88-46e6-8bbd-ad739f3a57ae"
    "username": "sofia"
  },
  {
    "id": "7fb8210f-c77a-44ec-92a4-f57dac39785e"
    "username": "victor"
  }
]
```

### Ingregresar al chat

Pedido

```
  POST /api/members
  {
    "username": "juan"
  }
```

Respuesta

```
{
    "id": "8dcc9866-c02b-43af-9187-5b53a2d75317",
    "username": "juan"
}
```
