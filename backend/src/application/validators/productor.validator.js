export function validateProductorBody(body = {}) {
  const nombres = body.nombres || body.nombre || ''
  const apellidos = body.apellidos || body.apellido || ''
  const correo = body.correo || body.email || ''
  const errors = []
  if (!String(nombres).trim()) errors.push('nombres es obligatorio')
  if (!String(apellidos).trim()) errors.push('apellidos es obligatorio')
  if (!String(body.dni || '').trim()) errors.push('dni es obligatorio')
  if (!String(correo).trim()) errors.push('correo es obligatorio')
  if (correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(correo).trim())) errors.push('correo debe tener formato válido')
  if (body.telefono && !/^\d+$/.test(String(body.telefono).trim())) errors.push('telefono solo debe contener números')
  if (body.altitud != null && body.altitud !== '' && Number.isNaN(Number(body.altitud))) errors.push('altitud debe ser numérica')
  return errors
}
