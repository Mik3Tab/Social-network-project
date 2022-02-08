--Proyecto red social--

POSTS:
[x] Endpoint para crear un post( tiene que estar autenticado)

[x] Endpoint para actualizar un post ( tiene que estar autenticado)

[x] Endpoint para eliminar un post( tiene que estar autenticado)

[x] Endpoint para traer todos los posts junto a los usuarios que hicieron ese post y junto a los comentarios del post

[x] Endpoint para buscar post por nombre

[x] Endpoint para buscar post por id

[x] Implementa validación a la hora de crear un post para que se rellene todos los campos(salvo la imagen, que no sea requerida) y si no se hace que devuelva un mensaje

[x] Paginación de 10 en 10
[] Likes:
        [] Endpoint para dar un like a un post
        [] Endpoint para quitar like a un post

USUARIOS

[x] Endpoint para registrar un usuario utilizando bcrypt

[] Implementa el correo de confirmación para el registro

[x] Endpoint para login(utilizando bcrypt +JWT)

[] Validación en el login:

[x] Si no has confirmado tu correo no puedes conectarte

[] Endpoint que nos traiga la información del usuario conectado

[x] Endpoint para el logout

[x] Implementa validación a la hora de crear un usuario para que se rellene todos los campos y si no se hace que devuelva un mensaje

COMMENTS

[] Endpoint para crear un comentario en un determinado post