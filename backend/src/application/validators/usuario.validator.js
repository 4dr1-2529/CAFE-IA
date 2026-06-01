import { ROLES } from '../../shared/RoleHelper.js'

const ROLES_PERMITIDOS = new Set([ROLES.ADMIN, ROLES.CLIENTE])

export function validateCreateUsuario(body = {}) {
  const errors = []
  if (!body.nombres?.trim()) errors.push('nombre es obligatorio')
  if (!body.email?.trim()) errors.push('email es obligatorio')
  if (!body.password || String(body.password).length < 6) errors.push('contraseña debe tener al menos 6 caracteres')
  if (body.rol && !ROLES_PERMITIDOS.has(body.rol)) errors.push('rol debe ser admin o cliente')
  if (!body.rol) errors.push('rol es obligatorio')
  if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(body.email))) errors.push('email no válido')
  if (body.telefono && !/^\d+$/.test(String(body.telefono).replaceAll(/\s/g, ''))) {
    errors.push('teléfono solo debe contener números')
  }
  return errors
}

export function validateUpdateUsuario(body = {}) {
  const errors = []
  if (body.nombres !== undefined && !String(body.nombres).trim()) errors.push('nombre no puede estar vacío')
  if (body.email !== undefined && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(body.email))) errors.push('email no válido')
  if (body.rol && !ROLES_PERMITIDOS.has(body.rol)) errors.push('rol debe ser admin o cliente')
  if (body.telefono && !/^\d+$/.test(String(body.telefono).replaceAll(/\s/g, ''))) {
    errors.push('teléfono solo debe contener números')
  }
  return errors
}

export function validateResetPassword(body = {}) {
  const errors = []
  if (!body.password || String(body.password).length < 6) errors.push('contraseña debe tener al menos 6 caracteres')
  return errors
}

export function validatePatchEstado(body = {}) {
  const errors = []
  if (body.activo === undefined && body.estado === undefined) {
    errors.push('Debe indicar activo (true/false) o estado (ACTIVO/INACTIVO)')
  }
  return errors
}

export function validatePatchRol(body = {}) {
  const errors = []
  if (!body.rol) errors.push('rol es obligatorio')
  else if (!ROLES_PERMITIDOS.has(body.rol)) errors.push('rol debe ser admin o cliente')
  return errors
}
