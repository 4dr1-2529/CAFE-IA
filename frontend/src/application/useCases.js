// Application - Casos de uso

const usuarios = [
  { id: 1, email: 'admin@cafeai.com', password: 'admin123', nombre: 'Administrador', rol: 'admin' }
]

export function authenticateUser(email, password) {
  return usuarios.find(u => u.email === email && u.password === password)
}
