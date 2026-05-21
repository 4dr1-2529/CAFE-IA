export function validateProductorBody(body = {}) {
  const nombres = body.nombres || body.nombre || ''
  const apellidos = body.apellidos || body.apellido || ''
  const correo = body.correo || body.email || ''
  const errors = []
  if (!String(nombres).trim()) errors.push('nombres es obligatorio')
  if (!String(apellidos).trim()) errors.push('apellidos es obligatorio')
  if (!String(body.dni || '').trim()) errors.push('dni es obligatorio')
  if (!String(correo).trim()) errors.push('correo es obligatorio')
  return errors
}
