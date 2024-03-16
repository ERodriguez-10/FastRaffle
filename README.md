
# Fast Raffle

Proyecto desarrollado por "GameBeacon" para la "CodeQuest 2024" de DevTalles. Fast Raffle, es una aplicación web donde se puede gestionar sorteos. ¡Descubrí, participá y ganá!




## Variables de enterno (.env)

Para levantar el BackEnd, es necesario configurar el archivo .env con las siguientes variables:

`DISCORD_CLIENT_ID`

`DISCORD_CLIENT_SECRET`

`DISCORD_CALLBACK_URL = http://localhost:8080/api/auth/discord/callback`

`DB_USER`

`DB_PASSWORD`

`DB_NAME`

`DB_CLUSTER`

`COOKIE_SECRET`

Colocar el archivo .env en el root del proyeto "back".
## Configuración extra

Es necesario crear un documento en "users" con la siguiente estructura:

{
    username: [user],
    pass: [password],
    admin: true
}

A la hora de logearse, usuario y contraseña deben coincidir con lo guardado en la base de datos.




## Correr localmente

Clonar el proyecto

```bash
  git clone git@github.com:ERodriguez-10/FastRaffle.git
```

Ir al directorio del proyecto

```bash
  cd FastRaffle
```

Ingresar al directorio "front"

```bash
  cd front
```

Instalar dependencias

```bash
  npm install
```

Inicializar el front

```bash
  npm run start
```

Volver al root del proyecto

```bash
  cd ..
```

Ingresar al directorio "back"

```bash
  cd back
```

Instalar dependencias

```bash
  npm install
```

Inicializar el servidor del Backend

```bash
  npm run start
```

- El front se levantará en http://localhost:5173
- El back se levantará en http://localhost:8080
## Stack de Tecnologías

**Client:** React, TailwindCSS, Yup

**Server:** Node, Express

**Database:** MongoDB


## Authors

- [@ERodriguez-10](https://github.com/ERodriguez-10) Full-Stack
- [@MEBotto](https://github.com/MEBotto) Front
- [@MaximianoGramet](https://github.com/MaximianoGramet) Front
- [@Luu0](https://github.com/Luu0) Back
