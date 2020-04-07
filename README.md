# Awesome Project Build with TypeORM

Pasos para que funcione:
1. Instalar MSYQL.
2. Crear una base de datos llamada 'asistencia'.
3. Crear un rol de usuario.
4. Crear un usuario.

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command
# ApiAsistencia

**
Esta api corre en el puerto 50000.

El enpoint 'api/login' sirve para realizar el proceso de logueo y asignar el token al usuario ejm: http://localhost:50000/api/login. Se utiliza metodo POST

El token esta configurado para que expire en 1hs.

Ejemplo de Token convertido a json 
{
  usuarioId: 1,
  nombreUsuario: 'u1',
  rol: 'Admin',
  iat: 1586227943,
  exp: 1586231543
}
Devuelve usuarioId, nombreDeUsuario, Rol, creacion y expiracion







