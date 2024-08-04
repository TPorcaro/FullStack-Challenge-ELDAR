## Descripción de Carpetas y Archivos

### `prisma`
Contiene los archivos de configuración y servicios de Prisma, incluyendo el módulo y servicio de Prisma para interactuar con la base de datos.

### `src`
Contiene el código fuente de la aplicación, organizado en varios módulos.

#### `auth`
Contiene todo lo relacionado con la autenticación, incluyendo controladores, servicios, guardias, y estrategias.

- **auth.controller.ts**: Controlador que maneja las rutas de autenticación.
- **auth.module.ts**: Módulo de autenticación que importa y provee los servicios y controladores necesarios.
- **auth.service.ts**: Servicio que maneja la lógica de autenticación.
- **jwt-auth.guard.ts**: Guardia que protege las rutas usando JWT.
- **jwt.strategy.ts**: Estrategia JWT para la autenticación.
- **role.enum.ts**: Enumeración de roles de usuario.
- **roles.decorator.ts**: Decorador para roles de usuario.
- **roles.guard.ts**: Guardia que verifica los roles de usuario.

#### `dto`
Contiene los Data Transfer Objects (DTOs) utilizados para la validación y transferencia de datos entre el cliente y el servidor.

- **auth.dto.ts**: DTOs relacionados con la autenticación.
- **task-with-owner.dto.ts**: DTOs relacionados con tareas y propietarios.
- **tasks.dto.ts**: DTOs relacionados con tareas.

#### `filters`
Contiene los filtros de excepciones personalizados.

- **http-exception.filter.ts**: Filtro de excepciones HTTP personalizado.

#### `prisma`
Contiene el módulo y servicio de Prisma para interactuar con la base de datos.

- **prisma.module.ts**: Módulo de Prisma.
- **prisma.service.ts**: Servicio de Prisma.

#### `tasks`
Contiene todo lo relacionado con las tareas, incluyendo controladores, servicios y módulos.

- **tasks.controller.ts**: Controlador que maneja las rutas de tareas.
- **tasks.module.ts**: Módulo de tareas.
- **tasks.service.ts**: Servicio que maneja la lógica de las tareas.

#### `users`
Contiene todo lo relacionado con los usuarios, incluyendo controladores, servicios y módulos.

- **users.controller.ts**: Controlador que maneja las rutas de usuarios.
- **users.module.ts**: Módulo de usuarios.
- **users.service.ts**: Servicio que maneja la lógica de los usuarios.