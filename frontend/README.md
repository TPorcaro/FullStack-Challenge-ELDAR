## Descripción de Carpetas y Archivos

### `components`
Contiene componentes reutilizables que pueden ser utilizados en diferentes partes de la aplicación.

- **Button.js**: Componente de botón reutilizable.
- **ConfirmDeleteModal.js**: Modal de confirmación para la eliminación de elementos.
- **CustomModal.js**: Modal personalizado para diversas funcionalidades.
- **InitialRedirect.js**: Componente que maneja la redirección inicial basado en el estado de autenticación.
- **Input.js**: Componente de input reutilizable.
- **Loading.js**: Componente de carga que muestra un indicador de carga.
- **Navbar.js**: Barra de navegación que muestra enlaces de navegación y estado del usuario.
- **NewTaskModal.js**: Modal para la creación de nuevas tareas.
- **NewUserModal.js**: Modal para la creación de nuevos usuarios.
- **Notification.js**: Componente para mostrar notificaciones al usuario.
- **PrivateRoute.js**: Componente para proteger rutas que requieren autenticación.
- **ProtectedRoute.js**: Componente para proteger rutas basadas en roles de usuario.
- **PublicRoute.js**: Componente para rutas públicas accesibles sin autenticación.
- **Select.js**: Componente de select reutilizable.
- **TaskTable.js**: Tabla que muestra la lista de tareas.
- **UpdateTaskModal.js**: Modal para la actualización de tareas existentes.
- **UpdateUserModal.js**: Modal para la actualización de usuarios existentes.
- **UserTable.js**: Tabla que muestra la lista de usuarios.

### `pages`
Contiene las páginas principales de la aplicación.

- **Admin.js**: Página de administración accesible solo para administradores.
- **Login.js**: Página de inicio de sesión para los usuarios.
- **Register.js**: Página de registro para nuevos usuarios.
- **Tasks.js**: Página que muestra las tareas del usuario.

### `services`
Contiene servicios que interactúan con la API backend.

- **authService.js**: Servicio que maneja las solicitudes de autenticación (login, logout, registro).
- **taskService.js**: Servicio que maneja las solicitudes relacionadas con las tareas (crear, obtener, actualizar, eliminar).
- **userService.js**: Servicio que maneja las solicitudes relacionadas con los usuarios (crear, obtener, actualizar, eliminar).