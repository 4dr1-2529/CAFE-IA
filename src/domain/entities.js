// Domain - Entidades del negocio
export class Lote {
  constructor(data) {
    this.id = data.id || null;
    this.codigo = data.codigo || '';
    this.productorId = data.productorId || null;
    this.productor = data.productor || '';
    this.parcela = data.parcela || '';
    this.fecha = data.fecha || new Date().toISOString().split('T')[0];
    this.cantidad = data.cantidad || 0;
    this.humedad = data.humedad || 0;
    this.temperatura = data.temperatura || 0;
    this.altitud = data.altitud || 0;
    this.tipoCafe = data.tipoCafe || 'Arabica';
    this.tipoSecado = data.tipoSecado || 'Natural';
    this.estado = data.estado || 'Produccion';
    this.calidad = data.calidad || null;
    this.puntaje = data.puntaje || null;
    this.createdAt = data.createdAt || new Date().toISOString();
  }

  toJSON() {
    return {
      id: this.id,
      codigo: this.codigo,
      productorId: this.productorId,
      productor: this.productor,
      parcela: this.parcela,
      fecha: this.fecha,
      cantidad: this.cantidad,
      humedad: this.humedad,
      temperatura: this.temperatura,
      altitud: this.altitud,
      tipoCafe: this.tipoCafe,
      tipoSecado: this.tipoSecado,
      estado: this.estado,
      calidad: this.calidad,
      puntaje: this.puntaje,
      createdAt: this.createdAt
    };
  }
}

export class Productor {
  constructor(data) {
    this.id = data.id || null;
    this.nombre = data.nombre || '';
    this.apellido = data.apellido || '';
    this.email = data.email || '';
    this.telefono = data.telefono || '';
    this.parcela = data.parcela || '';
    this.altitud = data.altitud || 0;
    this.estado = data.estado || 'Activo';
    this.createdAt = data.createdAt || new Date().toISOString();
  }

  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      telefono: this.telefono,
      parcela: this.parcela,
      altitud: this.altitud,
      estado: this.estado,
      createdAt: this.createdAt
    };
  }
}

export class EvaluacionCalidad {
  constructor(data) {
    this.id = data.id || null;
    this.loteId = data.loteId || null;
    this.loteCodigo = data.loteCodigo || '';
    this.aroma = data.aroma || 0;
    this.acidez = data.acidez || 0;
    this.cuerpo = data.cuerpo || 0;
    this.sabor = data.sabor || 0;
    this.balance = data.balance || 0;
    this.puntaje = data.puntaje || 0;
    this.defectos = data.defectos || 0;
    this.calificacion = data.calificacion || 'Media';
    this.observaciones = data.observaciones || '';
    this.fecha = data.fecha || new Date().toISOString().split('T')[0];
    this.evaludor = data.evaludor || '';
  }

  calcularCalificacion() {
    const promedio = (this.aroma + this.acidez + this.cuerpo + this.sabor + this.balance) / 5;
    if (promedio >= 80) return 'Alta';
    if (promedio >= 60) return 'Media';
    return 'Baja';
  }

  toJSON() {
    return {
      id: this.id,
      loteId: this.loteId,
      loteCodigo: this.loteCodigo,
      aroma: this.aroma,
      acidez: this.acidez,
      cuerpo: this.cuerpo,
      sabor: this.sabor,
      balance: this.balance,
      puntaje: this.puntaje,
      defectos: this.defectos,
      calificacion: this.calificacion,
      observaciones: this.observaciones,
      fecha: this.fecha,
      evaludor: this.evaludor
    };
  }
}

export class PrediccionIA {
  constructor(data) {
    this.id = data.id || null;
    this.loteId = data.loteId || null;
    this.entrada = data.entrada || {};
    this.calidadEstimada = data.calidadEstimada || 'Media';
    this.probabilidad = data.probabilidad || 0;
    this.factores = data.factores || [];
    this.recomendacion = data.recomendacion || '';
    this.modelo = data.modelo || 'Random Forest Classifier';
    this.fecha = data.fecha || new Date().toISOString();
  }

  toJSON() {
    return {
      id: this.id,
      loteId: this.loteId,
      entrada: this.entrada,
      calidadEstimada: this.calidadEstimada,
      probabilidad: this.probabilidad,
      factores: this.factores,
      recomendacion: this.recomendacion,
      modelo: this.modelo,
      fecha: this.fecha
    };
  }
}