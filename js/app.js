/* FleetControl — mock frontend alineado a tablas.sql. Sin backend. */
(function (global) {
  const DB_KEY = "fleetcontrol_db_v3";
  const SESSION_KEY = "fleetcontrol_session";
  const MODE_KEY = "fleetcontrol_mode";

  const ESTADO_OT = {
    Programada: "programada",
    "En Tránsito": "transito",
    Entregada: "entregado",
    Cerrada: "cerrada",
    Cancelada: "anulada",
  };
  const ESTADO_OT_SQL = {
    programada: "Programada",
    transito: "En Tránsito",
    entregado: "Entregada",
    cerrada: "Cerrada",
    anulada: "Cancelada",
  };
  const DOC_ESTADO = { Pendiente: "pendiente", Cargado: "cargado", Aprobado: "aprobado", Rechazado: "rechazado" };
  const DOC_ESTADO_SQL = { pendiente: "Pendiente", cargado: "Cargado", aprobado: "Aprobado", rechazado: "Rechazado" };
  const TIPO_CODE = { 1: "guia", 2: "pesaje", 3: "eir", 4: "crt", 5: "mic", 6: "manifiesto", 7: "dus" };
  const TIPO_ID = { guia: 1, pesaje: 2, eir: 3, crt: 4, mic: 5, manifiesto: 6, dus: 7 };
  const ROLE_KEY = { Administrador: "admin", Operador: "operaciones", Finanzas: "finanzas", Chofer: "chofer", Cliente: "cliente" };
  const ROLE_SQL = { admin: "Administrador", operaciones: "Operador", finanzas: "Finanzas", chofer: "Chofer", cliente: "Cliente" };

  const SEED = {
    clientes: [
      { id_cliente: 1, rut_tax_id: "76.441.220-3", razon_social: "Forestal San Antonio", contacto_nombre: "Elena Vargas", contacto_telefono: "+56 2 2345 1100", contacto_email: "cliente@forestal.cl", direccion: "Ruta 78 Km 12, San Antonio", activo: true, fecha_creacion: "2026-01-10T09:00:00" },
      { id_cliente: 2, rut_tax_id: "96.812.330-K", razon_social: "Exportadora del Maipo", contacto_nombre: "Diego Pizarro", contacto_telefono: "+56 2 2788 4400", contacto_email: "ops@maipo.cl", direccion: "Camino Lonquén 4500, Buin", activo: true, fecha_creacion: "2026-01-12T09:00:00" },
      { id_cliente: 3, rut_tax_id: "76.123.456-K", razon_social: "Logística Global Chile", contacto_nombre: "Ana Torres", contacto_telefono: "+56 2 2566 9011", contacto_email: "ana@logglobal.cl", direccion: "Av. Americo Vespucio 1501, Santiago", activo: true, fecha_creacion: "2026-02-01T09:00:00" },
      { id_cliente: 4, rut_tax_id: "77.901.112-5", razon_social: "AgroComercial Sur", contacto_nombre: "Claudia Reyes", contacto_telefono: "+56 71 234 8890", contacto_email: "creyes@agrosur.cl", direccion: "Camino a San Clemente 220, Talca", activo: true, fecha_creacion: "2026-02-15T09:00:00" },
      { id_cliente: 5, rut_tax_id: "90.227.000-0", razon_social: "Viña Concha y Toro", contacto_nombre: "Martín Soto", contacto_telefono: "+56 2 2476 5000", contacto_email: "logistica@conchaytoro.cl", direccion: "Nueva Tajamar 481, Las Condes", activo: true, fecha_creacion: "2026-03-01T09:00:00" },
      { id_cliente: 6, rut_tax_id: "76.380.217-5", razon_social: "Puerto Central S.A.", contacto_nombre: "Hugo Palma", contacto_telefono: "+56 35 220 1800", contacto_email: "trafico@puertocentral.cl", direccion: "Av. Ramón Barros Luco, San Antonio", activo: true, fecha_creacion: "2026-03-08T09:00:00" },
    ],
    camiones: [
      { id_camion: 1, patente_placa: "HJ-WP-22", marca: "Volvo", modelo: "FH16", anio: 2022, id_gps_bermann: "4891", fecha_revision_tecnica: "2026-11-18", estado: "En Viaje" },
      { id_camion: 2, patente_placa: "KL-XZ-99", marca: "Scania", modelo: "R450", anio: 2021, id_gps_bermann: "4892", fecha_revision_tecnica: "2026-08-28", estado: "Disponible" },
      { id_camion: 3, patente_placa: "GH-RT-11", marca: "Mercedes-Benz", modelo: "Actros", anio: 2020, id_gps_bermann: "4893", fecha_revision_tecnica: "2026-12-02", estado: "Disponible" },
      { id_camion: 4, patente_placa: "PQ-LM-45", marca: "Kenworth", modelo: "T680", anio: 2023, id_gps_bermann: "4894", fecha_revision_tecnica: "2027-02-14", estado: "En Viaje" },
    ],
    choferes: [
      { id_chofer: 1, rut_tax_id: "12.445.891-2", nombres: "Carlos", apellidos: "Mendoza", telefono: "+56 9 8765 2211", licencia_numero: "A5-221198", licencia_clase: "A5", licencia_vencimiento: "2027-03-15", activo: true },
      { id_chofer: 2, rut_tax_id: "13.220.774-8", nombres: "Pedro", apellidos: "Morales", telefono: "+56 9 6543 1098", licencia_numero: "A5-774201", licencia_clase: "A5", licencia_vencimiento: "2026-09-20", activo: true },
      { id_chofer: 3, rut_tax_id: "11.908.332-1", nombres: "Roberto", apellidos: "Gómez", telefono: "+56 9 7123 4455", licencia_numero: "A5-332019", licencia_clase: "A5", licencia_vencimiento: "2026-06-30", activo: true },
      { id_chofer: 4, rut_tax_id: "14.551.009-6", nombres: "Juan", apellidos: "Pérez", telefono: "+56 9 9988 1122", licencia_numero: "A4-009661", licencia_clase: "A4", licencia_vencimiento: "2027-01-10", activo: true },
    ],
    usuarios: [
      { id_usuario: 1, nombre_usuario: "pnunez", email: "admin@transporte.cl", password_hash: "demo123", rol: "Administrador", id_cliente: null, id_chofer: null, activo: true },
      { id_usuario: 2, nombre_usuario: "msoto", email: "operaciones@transporte.cl", password_hash: "demo123", rol: "Operador", id_cliente: null, id_chofer: null, activo: true },
      { id_usuario: 3, nombre_usuario: "afuentes", email: "finanzas@transporte.cl", password_hash: "demo123", rol: "Finanzas", id_cliente: null, id_chofer: null, activo: true },
      { id_usuario: 4, nombre_usuario: "cmendoza", email: "chofer@transporte.cl", password_hash: "demo123", rol: "Chofer", id_cliente: null, id_chofer: 1, activo: true },
      { id_usuario: 5, nombre_usuario: "evargas", email: "cliente@forestal.cl", password_hash: "demo123", rol: "Cliente", id_cliente: 1, id_chofer: null, activo: true },
    ],
    tipos_documento_carga: [
      { id_tipo_documento: 1, codigo: "GUIA_CLIENTE", nombre: "Guía de Despacho Cliente", requiere_foto_pod: true, obligatorio: true, activo: true },
      { id_tipo_documento: 2, codigo: "TICKET_PESAJE", nombre: "Ticket de Pesaje / Romana", requiere_foto_pod: false, obligatorio: true, activo: true },
      { id_tipo_documento: 3, codigo: "EIR_CONTENEDOR", nombre: "EIR (Equipment Interchange Receipt)", requiere_foto_pod: false, obligatorio: false, activo: true },
      { id_tipo_documento: 4, codigo: "CRT", nombre: "Carta de Porte Internacional (CRT)", requiere_foto_pod: true, obligatorio: false, activo: true },
      { id_tipo_documento: 5, codigo: "MIC_DTA", nombre: "Manifiesto Internacional de Carga (MIC/DTA)", requiere_foto_pod: false, obligatorio: false, activo: true },
      { id_tipo_documento: 6, codigo: "MANIFIESTO_CARGA", nombre: "Manifiesto / Hoja de Ruta Interna", requiere_foto_pod: false, obligatorio: false, activo: true },
      { id_tipo_documento: 7, codigo: "DUS", nombre: "Declaración Única de Salida (DUS)", requiere_foto_pod: false, obligatorio: false, activo: true },
    ],
    ordenes_transporte: [
      { id_orden_transporte: 8, numero_ot: "OT-1048", id_cliente: 1, id_camion: 1, id_chofer: 1, origen: "Planta Rancagua - Galpón 4", destino: "Puerto Valparaíso (Sitio 3)", fecha_programada: "2026-08-13T07:00:00", fecha_inicio: "2026-08-13T07:40:00", fecha_entrega: null, monto_flete_cliente: 1350000, monto_pago_chofer: 820000, monto_viaticos: 45000, estado_ot: "En Tránsito", estado_cobro: "Pendiente", estado_pago_chofer: "Pendiente", observaciones: "Carga forestal prioritaria", fecha_creacion: "2026-08-12T18:00:00" },
      { id_orden_transporte: 7, numero_ot: "OT-1047", id_cliente: 2, id_camion: 2, id_chofer: 2, origen: "Bodega Curicó", destino: "Puerto San Antonio", fecha_programada: "2026-08-12T06:00:00", fecha_inicio: "2026-08-12T06:30:00", fecha_entrega: "2026-08-13T10:15:00", monto_flete_cliente: 1480000, monto_pago_chofer: 910000, monto_viaticos: 45000, estado_ot: "Entregada", estado_cobro: "Pendiente", estado_pago_chofer: "Pendiente", observaciones: "Mantener cadena de frío", fecha_creacion: "2026-08-11T16:00:00" },
      { id_orden_transporte: 6, numero_ot: "OT-1046", id_cliente: 3, id_camion: 3, id_chofer: 3, origen: "Santiago Centro Logístico", destino: "Talcahuano", fecha_programada: "2026-08-10T05:00:00", fecha_inicio: "2026-08-10T05:20:00", fecha_entrega: "2026-08-11T16:40:00", monto_flete_cliente: 1200000, monto_pago_chofer: 750000, monto_viaticos: 45000, estado_ot: "Cerrada", estado_cobro: "Pendiente", estado_pago_chofer: "Pendiente", observaciones: "", fecha_creacion: "2026-08-09T11:00:00" },
      { id_orden_transporte: 5, numero_ot: "OT-1045", id_cliente: 4, id_camion: 4, id_chofer: 4, origen: "Planta Talca", destino: "Puerto San Antonio", fecha_programada: "2026-08-11T07:00:00", fecha_inicio: "2026-08-11T07:15:00", fecha_entrega: "2026-08-13T18:20:00", monto_flete_cliente: 850000, monto_pago_chofer: 520000, monto_viaticos: 45000, estado_ot: "Entregada", estado_cobro: "Pendiente", estado_pago_chofer: "Pendiente", observaciones: "", fecha_creacion: "2026-08-10T14:00:00" },
      { id_orden_transporte: 4, numero_ot: "OT-1044", id_cliente: 5, id_camion: 1, id_chofer: 1, origen: "Viña Los Andes", destino: "Puerto Valparaíso (Sitio 3)", fecha_programada: "2026-08-14T07:00:00", fecha_inicio: null, fecha_entrega: null, monto_flete_cliente: 980000, monto_pago_chofer: 610000, monto_viaticos: 45000, estado_ot: "Programada", estado_cobro: "Pendiente", estado_pago_chofer: "Pendiente", observaciones: "Retiro 07:00", fecha_creacion: "2026-08-13T09:00:00" },
      { id_orden_transporte: 3, numero_ot: "OT-1043", id_cliente: 6, id_camion: 4, id_chofer: 4, origen: "Puerto San Antonio", destino: "Santiago Bodega Norte", fecha_programada: "2026-08-13T08:00:00", fecha_inicio: "2026-08-13T08:25:00", fecha_entrega: null, monto_flete_cliente: 720000, monto_pago_chofer: 440000, monto_viaticos: 35000, estado_ot: "En Tránsito", estado_cobro: "Pendiente", estado_pago_chofer: "Pendiente", observaciones: "Importación", fecha_creacion: "2026-08-12T17:00:00" },
      { id_orden_transporte: 2, numero_ot: "OT-1042", id_cliente: 1, id_camion: 2, id_chofer: 2, origen: "Planta Rancagua - Galpón 4", destino: "Puerto Ventanas", fecha_programada: "2026-08-08T06:00:00", fecha_inicio: "2026-08-08T06:10:00", fecha_entrega: "2026-08-09T12:10:00", monto_flete_cliente: 1100000, monto_pago_chofer: 680000, monto_viaticos: 40000, estado_ot: "Cerrada", estado_cobro: "Facturado", estado_pago_chofer: "Pagado", observaciones: "", fecha_creacion: "2026-08-07T10:00:00" },
      { id_orden_transporte: 1, numero_ot: "OT-1041", id_cliente: 2, id_camion: 3, id_chofer: 3, origen: "Bodega Curicó", destino: "Los Andes", fecha_programada: "2026-08-15T08:00:00", fecha_inicio: null, fecha_entrega: null, monto_flete_cliente: 640000, monto_pago_chofer: 390000, monto_viaticos: 30000, estado_ot: "Cancelada", estado_cobro: "Pendiente", estado_pago_chofer: "Pendiente", observaciones: "Cliente anuló el retiro", fecha_creacion: "2026-08-13T08:00:00" },
    ],
    contenedores: [
      { id_contenedor: 1, id_orden_transporte: 1, numero_contenedor: "TGHU9901123", tipo_contenedor: "Reefer", numero_sello_precinto: "SL-990112", deposito_devolucion: "Depósito San Antonio", fecha_limite_devolucion: "2026-08-22", fecha_devolucion_real: null, estado_devolucion: "En Uso" },
      { id_contenedor: 2, id_orden_transporte: 2, numero_contenedor: "SUDU4410988", tipo_contenedor: "40 HC", numero_sello_precinto: "SL-441098", deposito_devolucion: "Depósito Valparaíso", fecha_limite_devolucion: "2026-08-14", fecha_devolucion_real: "2026-08-13", estado_devolucion: "Devuelto" },
      { id_contenedor: 3, id_orden_transporte: 3, numero_contenedor: "MSCU8871203", tipo_contenedor: "40 HC", numero_sello_precinto: "SL-887120", deposito_devolucion: "Depósito Santiago Norte", fecha_limite_devolucion: "2026-08-20", fecha_devolucion_real: null, estado_devolucion: "En Uso" },
      { id_contenedor: 4, id_orden_transporte: 4, numero_contenedor: "HLCU2201987", tipo_contenedor: "20 Dry", numero_sello_precinto: "SL-220198", deposito_devolucion: "Depósito Valparaíso", fecha_limite_devolucion: "2026-08-21", fecha_devolucion_real: null, estado_devolucion: "En Uso" },
      { id_contenedor: 5, id_orden_transporte: 5, numero_contenedor: "CMAU5512098", tipo_contenedor: "40 HC", numero_sello_precinto: "SL-110290", deposito_devolucion: "Depósito San Antonio", fecha_limite_devolucion: "2026-08-18", fecha_devolucion_real: null, estado_devolucion: "En Uso" },
      { id_contenedor: 6, id_orden_transporte: 6, numero_contenedor: "TGHU3391029", tipo_contenedor: "20 Dry", numero_sello_precinto: "SL-774010", deposito_devolucion: "Depósito Talcahuano", fecha_limite_devolucion: "2026-08-15", fecha_devolucion_real: "2026-08-14", estado_devolucion: "Devuelto" },
      { id_contenedor: 7, id_orden_transporte: 7, numero_contenedor: "MSCU1092834", tipo_contenedor: "Reefer", numero_sello_precinto: "SL-882910", deposito_devolucion: "Depósito San Antonio", fecha_limite_devolucion: "2026-08-16", fecha_devolucion_real: null, estado_devolucion: "Atrasado/Demurrage" },
      { id_contenedor: 8, id_orden_transporte: 8, numero_contenedor: "SUDU7829102", tipo_contenedor: "40 HC", numero_sello_precinto: "SL-441290", deposito_devolucion: "Depósito Valparaíso", fecha_limite_devolucion: "2026-08-18", fecha_devolucion_real: null, estado_devolucion: "En Uso" },
    ],
    documentos_carga: [],
    tracking_gps_ot: [
      { id_tracking: 1, id_orden_transporte: 8, latitud: -33.447, longitud: -71.210, velocidad_kmh: 82, direccion_grados: 270, fecha_hora_gps: "2026-08-13T19:10:00", evento: "En ruta Ruta 68", x: 62, y: 48, location: "Ruta 68 - Km 42 (Hacia Valparaíso)" },
      { id_tracking: 2, id_orden_transporte: 3, latitud: -33.520, longitud: -70.890, velocidad_kmh: 68, direccion_grados: 90, fecha_hora_gps: "2026-08-13T19:05:00", evento: "En ruta Ruta 78", x: 48, y: 40, location: "Ruta 78 - Km 18 (Hacia Santiago)" },
      { id_tracking: 3, id_orden_transporte: 7, latitud: -33.592, longitud: -71.607, velocidad_kmh: 0, direccion_grados: 180, fecha_hora_gps: "2026-08-13T10:20:00", evento: "Detenido en puerto", x: 38, y: 62, location: "Detenido en Puerto San Antonio" },
    ],
    links_tracking_cliente: [
      { id_link: 1, id_orden_transporte: 8, token_acceso: "trk-forestal48", fecha_expiracion: "2026-08-20T23:59:00", activo: true },
      { id_link: 2, id_orden_transporte: 7, token_acceso: "trk-maipo47", fecha_expiracion: "2026-08-20T23:59:00", activo: true },
      { id_link: 3, id_orden_transporte: 6, token_acceso: "trk-global46", fecha_expiracion: "2026-08-18T23:59:00", activo: false },
      { id_link: 4, id_orden_transporte: 5, token_acceso: "trk-agro45", fecha_expiracion: "2026-08-20T23:59:00", activo: true },
      { id_link: 5, id_orden_transporte: 4, token_acceso: "trk-vina44", fecha_expiracion: "2026-08-21T23:59:00", activo: true },
      { id_link: 6, id_orden_transporte: 3, token_acceso: "trk-pcentral43", fecha_expiracion: "2026-08-20T23:59:00", activo: true },
      { id_link: 7, id_orden_transporte: 2, token_acceso: "trk-forestal42", fecha_expiracion: "2026-08-16T23:59:00", activo: false },
      { id_link: 8, id_orden_transporte: 1, token_acceso: "trk-maipo41", fecha_expiracion: "2026-08-16T23:59:00", activo: false },
    ],
    cobros_clientes: [
      { id_cobro: 1, id_orden_transporte: 2, numero_factura_emitida: "F-3391", monto_total: 1100000, monto_pagado: 0, fecha_facturacion: "2026-08-10", fecha_vencimiento: "2026-09-09", estado_pago: "Pendiente", medio_pago: null, comprobante_pago_url: null, fecha_pago_real: null },
    ],
    liquidaciones_choferes: [
      { id_liquidacion: 1, id_chofer: 2, id_orden_transporte: 2, monto_flete_chofer: 680000, monto_viaticos: 40000, descuentos_penalizaciones: 0, monto_neto_pagar: 720000, estado: "Pagado", fecha_pago: "2026-08-11", referencia_pago: "LQ-209" },
    ],
    origins: ["Planta Rancagua - Galpón 4", "Bodega Curicó", "Santiago Centro Logístico", "Viña Los Andes", "Puerto San Antonio", "Planta Talca"],
    destinations: ["Puerto Valparaíso (Sitio 3)", "Puerto San Antonio", "Talcahuano", "Santiago Bodega Norte", "Puerto Ventanas", "Los Andes"],
    depots: ["Depósito San Antonio", "Depósito Valparaíso", "Depósito Santiago Norte", "Depósito Talcahuano"],
    containerTypes: ["20 Dry", "40 Dry", "40 HC", "Reefer", "Otro"],
    next: { ot: 1049, orden: 9, contenedor: 9, documento: 40, tracking: 4, link: 9, cobro: 2, liquidacion: 2, camion: 5, chofer: 5, cliente: 7, usuario: 6, folio: 88292 },
  };

  function seedDocs() {
    const rows = [];
    let id = 1;
    function add(ot, tipo, estado, extra) {
      const row = Object.assign({
        id_documento: id++,
        id_orden_transporte: ot,
        id_tipo_documento: tipo,
        numero_folio_documento: null,
        emisor: null,
        descripcion_contenido: null,
        peso_kg: null,
        cantidad_bultos: null,
        url_archivo_digital: null,
        recibido_por_nombre: null,
        recibido_por_rut: null,
        observaciones_recepcion: null,
        estado: "Pendiente",
        motivo_rechazo: null,
        id_usuario_reviso: null,
        fecha_revision: null,
        id_usuario_subio: null,
        fecha_subida: null,
      }, extra || {}, { id_orden_transporte: ot, id_tipo_documento: tipo, estado: estado });
      rows.push(row);
    }
    [1, 3, 4].forEach(function (ot) {
      [1, 2, 3, 4, 5, 6, 7].forEach(function (t) { add(ot, t, "Pendiente"); });
    });
    [1, 2, 3, 4, 5, 6, 7].forEach(function (t) { add(8, t, t === 2 ? "Cargado" : "Pendiente", t === 2 ? { numero_folio_documento: "P-1048", url_archivo_digital: "ticket_pesaje_1048.jpg", fecha_subida: "2026-08-13T08:10:00", id_usuario_subio: 4 } : {}); });
    add(7, 1, "Cargado", { numero_folio_documento: "88291", url_archivo_digital: "guia_88291.jpg", recibido_por_nombre: "Juan Valdés", fecha_subida: "2026-08-13T19:15:00", id_usuario_subio: 4 });
    add(7, 2, "Cargado", { numero_folio_documento: "P-1047", url_archivo_digital: "pesaje_1047.jpg", fecha_subida: "2026-08-12T14:00:00", id_usuario_subio: 4 });
    [3, 4, 5, 6, 7].forEach(function (t) { add(7, t, "Pendiente"); });
    add(6, 1, "Aprobado", { numero_folio_documento: "77401", url_archivo_digital: "guia_77401.jpg", recibido_por_nombre: "Mario Silva", fecha_subida: "2026-08-11T16:40:00", fecha_revision: "2026-08-11T17:10:00", id_usuario_subio: 4, id_usuario_reviso: 2 });
    add(6, 2, "Aprobado", { numero_folio_documento: "P-1046", url_archivo_digital: "pesaje_1046.jpg", fecha_subida: "2026-08-10T11:20:00", fecha_revision: "2026-08-11T17:10:00", id_usuario_subio: 4, id_usuario_reviso: 2 });
    add(6, 3, "Aprobado", { numero_folio_documento: "EIR-1046", url_archivo_digital: "eir_1046.pdf", fecha_subida: "2026-08-11T17:00:00", fecha_revision: "2026-08-11T17:12:00", id_usuario_subio: 4, id_usuario_reviso: 2 });
    [4, 5, 6, 7].forEach(function (t) { add(6, t, "Pendiente"); });
    add(5, 1, "Cargado", { numero_folio_documento: "11029", url_archivo_digital: "guia_11029.jpg", recibido_por_nombre: "Claudia Reyes", fecha_subida: "2026-08-13T18:30:00", id_usuario_subio: 4 });
    [2, 3, 4, 5, 6, 7].forEach(function (t) { add(5, t, "Pendiente"); });
    add(2, 1, "Aprobado", { numero_folio_documento: "66110", url_archivo_digital: "guia_66110.jpg", recibido_por_nombre: "Ana Torres", fecha_subida: "2026-08-09T12:10:00", fecha_revision: "2026-08-09T13:00:00", id_usuario_subio: 4, id_usuario_reviso: 2 });
    add(2, 2, "Aprobado", { numero_folio_documento: "P-1042", url_archivo_digital: "pesaje_1042.jpg", fecha_subida: "2026-08-08T09:40:00", fecha_revision: "2026-08-09T13:00:00", id_usuario_subio: 4, id_usuario_reviso: 2 });
    add(2, 7, "Aprobado", { numero_folio_documento: "DUS-1042", url_archivo_digital: "dus_1042.pdf", fecha_subida: "2026-08-09T13:00:00", fecha_revision: "2026-08-09T13:20:00", id_usuario_subio: 2, id_usuario_reviso: 2 });
    [3, 4, 5, 6].forEach(function (t) { add(2, t, "Pendiente"); });
    SEED.documentos_carga = rows;
    SEED.next.documento = id;
  }
  seedDocs();

  function clone(v) { return JSON.parse(JSON.stringify(v)); }

  function cid(n) { return "c" + n; }
  function tid(n) { return "t" + n; }
  function did(n) { return "d" + n; }
  function numId(prefixed) { return Number(String(prefixed).replace(/^[a-z]/i, "")); }

  function attachViews(db) {
    db.clients = db.clientes.map(function (c) {
      return { id: cid(c.id_cliente), id_cliente: c.id_cliente, name: c.razon_social, rut: c.rut_tax_id, contact: c.contacto_nombre, phone: c.contacto_telefono, email: c.contacto_email, direccion: c.direccion };
    });
    db.trucks = db.camiones.map(function (t) {
      return { id: tid(t.id_camion), id_camion: t.id_camion, plate: t.patente_placa, brand: t.marca, model: t.modelo, year: t.anio, gpsId: t.id_gps_bermann, revisionExpiry: t.fecha_revision_tecnica, status: t.estado === "Mantenimiento" ? "alerta" : "operativo", estado: t.estado };
    });
    db.drivers = db.choferes.map(function (d) {
      const lastOt = db.ordenes_transporte.filter(function (o) { return o.id_chofer === d.id_chofer && o.estado_ot !== "Cancelada"; }).sort(function (a, b) { return b.id_orden_transporte - a.id_orden_transporte; })[0];
      return { id: did(d.id_chofer), id_chofer: d.id_chofer, name: d.nombres + " " + d.apellidos, rut: d.rut_tax_id, license: d.licencia_clase, licenseExpiry: d.licencia_vencimiento, phone: d.telefono, truckId: lastOt ? tid(lastOt.id_camion) : "" };
    });
    db.ots = db.ordenes_transporte.slice().sort(function (a, b) { return b.id_orden_transporte - a.id_orden_transporte; }).map(function (o) { return hydrateOt(o, db); });
    db.gps = {};
    db.camiones.forEach(function (t) {
      const ot = db.ordenes_transporte.find(function (o) { return o.id_camion === t.id_camion && o.estado_ot === "En Tránsito"; });
      const pts = ot ? db.tracking_gps_ot.filter(function (g) { return g.id_orden_transporte === ot.id_orden_transporte; }) : [];
      const last = pts.sort(function (a, b) { return String(b.fecha_hora_gps).localeCompare(String(a.fecha_hora_gps)); })[0];
      db.gps[tid(t.id_camion)] = last
        ? { x: last.x || 50, y: last.y || 50, speed: last.velocidad_kmh || 0, location: last.location || last.evento || "En ruta", heading: "N" }
        : { x: 50, y: 50, speed: 0, location: "Base / sin señal", heading: "N" };
    });
    db.containerTypes = db.containerTypes || ["20 Dry", "40 Dry", "40 HC", "Reefer", "Otro"];
    return db;
  }

  function buildUsers(db) {
    const names = { 1: "Patricia Núñez", 2: "María Soto", 3: "Andrés Fuentes" };
    return db.usuarios.filter(function (u) { return u.activo; }).map(function (u) {
      let name = names[u.id_usuario] || u.nombre_usuario;
      if (u.id_chofer) {
        const ch = db.choferes.find(function (c) { return c.id_chofer === u.id_chofer; });
        if (ch) name = ch.nombres + " " + ch.apellidos;
      }
      if (u.id_cliente) {
        const cl = db.clientes.find(function (c) { return c.id_cliente === u.id_cliente; });
        if (cl) name = cl.contacto_nombre;
      }
      const role = ROLE_KEY[u.rol];
      const parts = name.split(" ");
      return {
        email: u.email,
        password: u.password_hash,
        name: name,
        role: role,
        initials: ((parts[0] || "U")[0] + (parts[1] || "X")[0]).toUpperCase(),
        label: u.rol,
        home: "pantalla_operaciones.html",
        driverId: u.id_chofer ? did(u.id_chofer) : null,
        clientId: u.id_cliente ? cid(u.id_cliente) : null,
        id_usuario: u.id_usuario,
      };
    });
  }

  var USERS = [];
  var DOC_TYPES = [];

  function refreshCatalogs(db) {
    USERS = buildUsers(db);
    DOC_TYPES = db.tipos_documento_carga.filter(function (t) { return t.activo; }).map(function (t) {
      return { type: TIPO_CODE[t.id_tipo_documento], label: t.nombre, required: !!t.obligatorio, codigo: t.codigo, id_tipo_documento: t.id_tipo_documento, requiere_foto_pod: !!t.requiere_foto_pod };
    });
    if (global.FleetApp) {
      global.FleetApp.USERS = USERS;
      global.FleetApp.DOC_TYPES = DOC_TYPES;
    }
  }

  function load() {
    var data;
    try {
      const raw = localStorage.getItem(DB_KEY);
      if (raw) data = JSON.parse(raw);
    } catch (e) {}
    if (!data || !data.ordenes_transporte) {
      data = clone(SEED);
      localStorage.setItem(DB_KEY, JSON.stringify(persistable(data)));
    }
    attachViews(data);
    refreshCatalogs(data);
    return data;
  }

  function persistable(data) {
    return {
      clientes: data.clientes,
      camiones: data.camiones,
      choferes: data.choferes,
      usuarios: data.usuarios,
      tipos_documento_carga: data.tipos_documento_carga,
      ordenes_transporte: data.ordenes_transporte,
      contenedores: data.contenedores,
      documentos_carga: data.documentos_carga,
      tracking_gps_ot: data.tracking_gps_ot,
      links_tracking_cliente: data.links_tracking_cliente,
      cobros_clientes: data.cobros_clientes,
      liquidaciones_choferes: data.liquidaciones_choferes,
      origins: data.origins,
      destinations: data.destinations,
      depots: data.depots,
      containerTypes: data.containerTypes,
      next: data.next,
    };
  }

  function save(data) {
    try {
      localStorage.setItem(DB_KEY, JSON.stringify(persistable(data)));
    } catch (e) {
      (data.documentos_carga || []).forEach(function (d) { d.preview = ""; });
      try {
        localStorage.setItem(DB_KEY, JSON.stringify(persistable(data)));
        toast("Almacenamiento lleno: se guardó el documento sin previsualización pesada", "warn");
      } catch (e2) {
        toast("No hay espacio en el navegador. Restaura la demo o usa fotos más livianas", "err");
        return;
      }
    }
    attachViews(data);
    refreshCatalogs(data);
  }

  function getSession() {
    try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) || "null"); } catch (e) { return null; }
  }

  function getMode() {
    return sessionStorage.getItem(MODE_KEY) === "mobile" ? "mobile" : "web";
  }

  function setMode(mode) {
    sessionStorage.setItem(MODE_KEY, mode === "mobile" ? "mobile" : "web");
    return getMode();
  }

  function homeFor(user, mode) {
    mode = mode || getMode();
    if (user.role === "chofer") return mode === "mobile" ? "pantalla_chofer.html" : "pantalla_chofer_web.html";
    if (user.role === "cliente") return mode === "mobile" ? "pantalla_cliente_movil.html" : "pantalla_cliente.html";
    return mode === "mobile" ? "pantalla_dashboard_movil.html" : "pantalla_dashboard.html";
  }

  function setSession(user, mode) {
    mode = mode || getMode();
    setMode(mode);
    const home = homeFor(user, mode);
    const safe = { email: user.email, name: user.name, role: user.role, initials: user.initials, label: user.label, home: home, mode: mode, driverId: user.driverId || null, clientId: user.clientId || null, id_usuario: user.id_usuario || null };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(safe));
    return safe;
  }

  function toast(message, type) {
    const existing = document.getElementById("fc-toast");
    if (existing) existing.remove();
    const el = document.createElement("div");
    el.id = "fc-toast";
    const colors = { ok: "bg-emerald-600", err: "bg-red-600", warn: "bg-amber-500", info: "bg-slate-800" };
    el.className = "fixed top-5 right-5 z-[90] text-white text-sm font-medium px-4 py-3 rounded-xl shadow-xl max-w-sm " + (colors[type] || colors.info);
    el.textContent = message;
    document.body.appendChild(el);
    setTimeout(function () { el.remove(); }, 2800);
  }

  function formatCLP(n) { return "$ " + Number(n || 0).toLocaleString("es-CL") + " CLP"; }

  function formatDate(iso) {
    if (!iso) return "—";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleString("es-CL", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  }

  function daysUntil(dateStr) {
    if (!dateStr) return 999;
    const t = new Date(dateStr + "T00:00:00");
    const now = new Date("2026-08-13T00:00:00");
    return Math.round((t - now) / 86400000);
  }

  function statusMeta(status) {
    const map = {
      programada: { label: "Programada", cls: "bg-amber-50 text-amber-700 border-amber-200" },
      transito: { label: "En Tránsito", cls: "bg-blue-50 text-blue-700 border-blue-200", pulse: true },
      entregado: { label: "Entregada", cls: "bg-orange-50 text-orange-700 border-orange-200" },
      cerrada: { label: "Cerrada / Facturable", cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
      anulada: { label: "Cancelada", cls: "bg-slate-100 text-slate-500 border-slate-200" },
    };
    return map[status] || { label: status, cls: "bg-slate-100 text-slate-600 border-slate-200" };
  }

  function docStatusMeta(status) {
    const map = {
      pendiente: { label: "Pendiente", cls: "bg-slate-100 text-slate-500" },
      cargado: { label: "En revisión", cls: "bg-amber-100 text-amber-800" },
      aprobado: { label: "Aprobado", cls: "bg-emerald-100 text-emerald-800" },
      rechazado: { label: "Rechazado", cls: "bg-red-100 text-red-800" },
    };
    return map[status] || { label: status, cls: "bg-slate-100 text-slate-600" };
  }

  function viewDocs(db, idOrden) {
    return db.tipos_documento_carga.filter(function (t) { return t.activo; }).map(function (t) {
      const row = db.documentos_carga.find(function (d) { return d.id_orden_transporte === idOrden && d.id_tipo_documento === t.id_tipo_documento; });
      return {
        type: TIPO_CODE[t.id_tipo_documento],
        label: t.nombre,
        required: !!t.obligatorio,
        status: row ? (DOC_ESTADO[row.estado] || "pendiente") : "pendiente",
        fileName: row && row.url_archivo_digital ? row.url_archivo_digital : "",
        preview: row && row.preview ? row.preview : "",
        uploadedAt: row ? row.fecha_subida || "" : "",
        guia: row ? row.numero_folio_documento || "" : "",
        receiver: row ? row.recibido_por_nombre || "" : "",
        rejectReason: row ? row.motivo_rechazo || "" : "",
        id_documento: row ? row.id_documento : null,
        id_tipo_documento: t.id_tipo_documento,
      };
    });
  }

  function otPodState(ot) {
    const required = (ot.docs || []).filter(function (d) { return d.required; });
    if (!required.length) return "pendiente";
    if (required.every(function (d) { return d.status === "aprobado"; })) return "ok";
    if (required.some(function (d) { return d.status === "rechazado"; })) return "rechazado";
    if (required.some(function (d) { return d.status === "cargado"; })) return "revision";
    if (ot.status === "entregado") return "falta_foto";
    return "pendiente";
  }

  function podMeta(state) {
    const map = {
      pendiente: { label: "Pendiente", html: '<span class="text-xs italic text-slate-400">Pendiente</span>' },
      falta_foto: { label: "Falta Foto", html: '<span class="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200"><i data-lucide="upload-cloud" class="w-3.5 h-3.5"></i> Falta doc.</span>' },
      revision: { label: "En revisión", html: '<span class="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200"><i data-lucide="clock" class="w-3.5 h-3.5"></i> En revisión</span>' },
      ok: { label: "POD OK", html: '<span class="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200"><i data-lucide="check" class="w-3.5 h-3.5"></i> POD OK</span>' },
      rechazado: { label: "Rechazado", html: '<span class="inline-flex items-center gap-1 text-xs font-semibold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200"><i data-lucide="x" class="w-3.5 h-3.5"></i> Rechazado</span>' },
    };
    return map[state] || { label: state, html: state };
  }

  function requiredDocsOk(ot) {
    return (ot.docs || []).filter(function (d) { return d.required; }).every(function (d) { return d.status === "aprobado"; });
  }

  function canInvoice(ot) {
    return ot.status === "cerrada" && requiredDocsOk(ot) && !ot.invoice;
  }

  function findOrden(id, db) {
    db = db || load();
    return db.ordenes_transporte.find(function (o) {
      return o.numero_ot === id || o.id_orden_transporte === id || String(o.id_orden_transporte) === String(id);
    });
  }

  function hydrateOt(ot, db) {
    db = db || load();
    const orden = ot.numero_ot ? ot : findOrden(ot.id || ot, db);
    if (!orden) return ot;
    const client = db.clientes.find(function (c) { return c.id_cliente === orden.id_cliente; }) || {};
    const truck = db.camiones.find(function (t) { return t.id_camion === orden.id_camion; }) || {};
    const driver = db.choferes.find(function (d) { return d.id_chofer === orden.id_chofer; }) || {};
    const cont = db.contenedores.find(function (c) { return c.id_orden_transporte === orden.id_orden_transporte; }) || {};
    const link = db.links_tracking_cliente.find(function (l) { return l.id_orden_transporte === orden.id_orden_transporte; }) || {};
    const cobro = db.cobros_clientes.find(function (c) { return c.id_orden_transporte === orden.id_orden_transporte; });
    const liq = db.liquidaciones_choferes.find(function (l) { return l.id_orden_transporte === orden.id_orden_transporte; });
    const docs = viewDocs(db, orden.id_orden_transporte);
    const status = ESTADO_OT[orden.estado_ot] || "programada";
    const deadline = cont.fecha_limite_devolucion || "";
    const demurrageDays = daysUntil(deadline);
    const view = {
      id: orden.numero_ot,
      id_orden_transporte: orden.id_orden_transporte,
      clientId: cid(orden.id_cliente),
      truckId: tid(orden.id_camion),
      driverId: did(orden.id_chofer),
      origin: orden.origen,
      destination: orden.destino,
      container: cont.numero_contenedor || "—",
      containerType: cont.tipo_contenedor || "",
      seal: cont.numero_sello_precinto || "",
      returnDepot: cont.deposito_devolucion || "",
      returnDeadline: deadline,
      status: status,
      tarifa: orden.monto_flete_cliente,
      costo: orden.monto_pago_chofer,
      viatico: orden.monto_viaticos,
      date: (orden.fecha_programada || "").slice(0, 10),
      notes: orden.observaciones || "",
      trackingToken: link.token_acceso || "",
      invoice: cobro ? cobro.numero_factura_emitida : null,
      invoiceStatus: cobro ? (cobro.estado_pago === "Pagado" ? "pagada" : cobro.numero_factura_emitida ? "emitida" : null) : null,
      driverPaid: !!(liq && (liq.estado === "Pagado" || liq.estado === "Aprobado")),
      liquidation: liq ? liq.referencia_pago : null,
      docs: docs,
      clientName: client.razon_social || "—",
      clientRut: client.rut_tax_id || "",
      clientContact: client.contacto_nombre || "",
      plate: truck.patente_placa || "—",
      truckLabel: truck.patente_placa ? truck.patente_placa + " · " + truck.marca + " " + truck.modelo : "—",
      driverName: driver.nombres ? driver.nombres + " " + driver.apellidos : "—",
      driverPhone: driver.telefono || "",
      driverInitials: driver.nombres ? (driver.nombres[0] + (driver.apellidos || " ")[0]).toUpperCase() : "—",
      gpsId: truck.id_gps_bermann || "",
      margen: (orden.monto_flete_cliente || 0) - (orden.monto_pago_chofer || 0) - (orden.monto_viaticos || 0),
      demurrageRisk: demurrageDays <= 3 && status !== "cerrada" && status !== "anulada",
      demurrageDays: demurrageDays,
    };
    view.pod = otPodState(view);
    return view;
  }

  function findOt(id, db) {
    return findOrden(id, db);
  }

  function currentUserId() {
    const s = getSession();
    if (s && s.id_usuario) return s.id_usuario;
    const db = load();
    const u = db.usuarios.find(function (x) { return s && x.email === s.email; });
    return u ? u.id_usuario : 2;
  }

  function createOt(form) {
    const db = load();
    const idOt = db.next.orden;
    const numero = "OT-" + db.next.ot;
    db.next.orden += 1;
    db.next.ot += 1;
    const orden = {
      id_orden_transporte: idOt,
      numero_ot: numero,
      id_cliente: numId(form.clientId),
      id_camion: numId(form.truckId),
      id_chofer: numId(form.driverId),
      origen: form.origin,
      destino: form.destination,
      fecha_programada: (form.date || "2026-08-13") + "T07:00:00",
      fecha_inicio: null,
      fecha_entrega: null,
      monto_flete_cliente: Number(form.tarifa) || 0,
      monto_pago_chofer: Number(form.costo) || 0,
      monto_viaticos: Number(form.viatico) || 0,
      estado_ot: "Programada",
      estado_cobro: "Pendiente",
      estado_pago_chofer: "Pendiente",
      observaciones: form.notes || "",
      fecha_creacion: new Date().toISOString(),
    };
    db.ordenes_transporte.unshift(orden);
    db.contenedores.push({
      id_contenedor: db.next.contenedor++,
      id_orden_transporte: idOt,
      numero_contenedor: String(form.container || "").toUpperCase(),
      tipo_contenedor: form.containerType || "40 HC",
      numero_sello_precinto: form.seal || "",
      deposito_devolucion: form.returnDepot || "",
      fecha_limite_devolucion: form.returnDeadline || "2026-08-20",
      fecha_devolucion_real: null,
      estado_devolucion: "En Uso",
    });
    db.tipos_documento_carga.forEach(function (t) {
      db.documentos_carga.push({
        id_documento: db.next.documento++,
        id_orden_transporte: idOt,
        id_tipo_documento: t.id_tipo_documento,
        numero_folio_documento: null,
        emisor: null,
        descripcion_contenido: null,
        peso_kg: null,
        cantidad_bultos: null,
        url_archivo_digital: null,
        recibido_por_nombre: null,
        recibido_por_rut: null,
        observaciones_recepcion: null,
        estado: "Pendiente",
        motivo_rechazo: null,
        id_usuario_reviso: null,
        fecha_revision: null,
        id_usuario_subio: null,
        fecha_subida: null,
      });
    });
    db.links_tracking_cliente.push({
      id_link: db.next.link++,
      id_orden_transporte: idOt,
      token_acceso: "trk-" + Math.random().toString(36).slice(2, 10),
      fecha_expiracion: "2026-08-27T23:59:00",
      activo: true,
    });
    const cam = db.camiones.find(function (c) { return c.id_camion === orden.id_camion; });
    if (cam) cam.estado = "Disponible";
    save(db);
    return hydrateOt(orden, db);
  }

  function deactivateTracking(db, idOrden) {
    (db.links_tracking_cliente || []).forEach(function (l) {
      if (l.id_orden_transporte === idOrden) l.activo = false;
    });
  }

  function setOtStatus(id, status) {
    const db = load();
    const orden = findOrden(id, db);
    if (!orden) return { ok: false, error: "OT no encontrada" };
    const view = hydrateOt(orden, db);
    if (status === "anulada") {
      if (orden.estado_cobro === "Facturado" || orden.estado_cobro === "Pagado") return { ok: false, error: "No se puede anular una OT facturada" };
      orden.estado_ot = "Cancelada";
      deactivateTracking(db, orden.id_orden_transporte);
      save(db);
      return { ok: true, ot: hydrateOt(orden, db) };
    }
    if (status === "cerrada" && !requiredDocsOk(view)) {
      return { ok: false, error: "Faltan documentos obligatorios aprobados (Guía POD y Pesaje)" };
    }
    if (status === "entregado") {
      const guia = view.docs.find(function (d) { return d.type === "guia"; });
      if (!guia || (guia.status !== "cargado" && guia.status !== "aprobado")) {
        return { ok: false, error: "Debes cargar la foto de la Guía (POD) antes de confirmar la entrega" };
      }
      orden.fecha_entrega = new Date().toISOString();
    }
    if (status === "transito") {
      orden.fecha_inicio = orden.fecha_inicio || new Date().toISOString();
      const cam = db.camiones.find(function (c) { return c.id_camion === orden.id_camion; });
      if (cam) cam.estado = "En Viaje";
      if (!db.tracking_gps_ot.some(function (g) { return g.id_orden_transporte === orden.id_orden_transporte; })) {
        db.tracking_gps_ot.push({
          id_tracking: db.next.tracking++,
          id_orden_transporte: orden.id_orden_transporte,
          latitud: -33.45,
          longitud: -70.66,
          velocidad_kmh: 40,
          direccion_grados: 180,
          fecha_hora_gps: new Date().toISOString(),
          evento: "Inicio de viaje",
          x: 52,
          y: 50,
          location: "Salida de origen",
        });
      }
    }
    orden.estado_ot = ESTADO_OT_SQL[status] || orden.estado_ot;
    if (status === "cerrada" || status === "anulada") deactivateTracking(db, orden.id_orden_transporte);
    if (status === "cerrada" || status === "entregado" || status === "anulada") {
      const cam = db.camiones.find(function (c) { return c.id_camion === orden.id_camion; });
      if (cam && status !== "transito") cam.estado = "Disponible";
    }
    save(db);
    return { ok: true, ot: hydrateOt(orden, db) };
  }

  function uploadDoc(otId, type, payload) {
    const db = load();
    const orden = findOrden(otId, db);
    if (!orden) return { ok: false, error: "OT no encontrada" };
    const tipoId = TIPO_ID[type];
    if (!tipoId) return { ok: false, error: "Tipo de documento inválido" };
    var doc = db.documentos_carga.find(function (d) { return d.id_orden_transporte === orden.id_orden_transporte && d.id_tipo_documento === tipoId; });
    if (!doc) {
      doc = { id_documento: db.next.documento++, id_orden_transporte: orden.id_orden_transporte, id_tipo_documento: tipoId, estado: "Pendiente" };
      db.documentos_carga.push(doc);
    }
    doc.estado = "Cargado";
    doc.url_archivo_digital = payload.fileName || (type + "_" + orden.numero_ot + ".jpg");
    doc.preview = payload.preview && payload.preview.length > 450000 ? "" : (payload.preview || "");
    doc.fecha_subida = new Date().toISOString();
    doc.id_usuario_subio = currentUserId();
    doc.recibido_por_nombre = payload.receiver || doc.recibido_por_nombre;
    if (type === "guia" && !doc.numero_folio_documento) {
      doc.numero_folio_documento = String(db.next.folio++);
    } else if (!doc.numero_folio_documento) {
      doc.numero_folio_documento = (type.toUpperCase() + "-" + orden.numero_ot.replace("OT-", ""));
    }
    doc.motivo_rechazo = null;
    save(db);
    return { ok: true, ot: hydrateOt(orden, db), doc: doc };
  }

  function reviewDoc(otId, type, approved, reason) {
    const db = load();
    const orden = findOrden(otId, db);
    if (!orden) return { ok: false, error: "OT no encontrada" };
    const tipoId = TIPO_ID[type];
    const doc = db.documentos_carga.find(function (d) { return d.id_orden_transporte === orden.id_orden_transporte && d.id_tipo_documento === tipoId; });
    if (!doc) return { ok: false, error: "Documento no encontrado" };
    if (doc.estado !== "Cargado" && doc.estado !== "Aprobado") return { ok: false, error: "El documento aún no está cargado" };
    doc.fecha_revision = new Date().toISOString();
    doc.id_usuario_reviso = currentUserId();
    if (approved) {
      doc.estado = "Aprobado";
      doc.motivo_rechazo = null;
      const view = hydrateOt(orden, db);
      view.docs.forEach(function (d) {
        if (d.type === type) d.status = "aprobado";
      });
      if (requiredDocsOk(view) && (orden.estado_ot === "Entregada" || orden.estado_ot === "En Tránsito")) {
        orden.estado_ot = "Cerrada";
        deactivateTracking(db, orden.id_orden_transporte);
      }
    } else {
      doc.estado = "Rechazado";
      doc.motivo_rechazo = reason || "Foto ilegible o sin firma/timbre";
    }
    save(db);
    return { ok: true, ot: hydrateOt(orden, db), doc: doc };
  }

  function emitInvoice(otId) {
    const db = load();
    const orden = findOrden(otId, db);
    if (!orden) return { ok: false, error: "OT no encontrada" };
    const view = hydrateOt(orden, db);
    if (!canInvoice(view)) return { ok: false, error: "Bloqueado: la OT debe estar cerrada y con POD/Pesaje aprobados" };
    const nro = "F-" + (3390 + db.next.cobro);
    db.cobros_clientes.push({
      id_cobro: db.next.cobro++,
      id_orden_transporte: orden.id_orden_transporte,
      numero_factura_emitida: nro,
      monto_total: orden.monto_flete_cliente,
      monto_pagado: 0,
      fecha_facturacion: "2026-08-13",
      fecha_vencimiento: "2026-09-12",
      estado_pago: "Pendiente",
      medio_pago: null,
      comprobante_pago_url: null,
      fecha_pago_real: null,
    });
    orden.estado_cobro = "Facturado";
    save(db);
    return { ok: true, ot: hydrateOt(orden, db) };
  }

  function markInvoicePaid(otId) {
    const db = load();
    const orden = findOrden(otId, db);
    if (!orden) return { ok: false, error: "OT no encontrada" };
    const cobro = db.cobros_clientes.find(function (c) { return c.id_orden_transporte === orden.id_orden_transporte; });
    if (!cobro || !cobro.numero_factura_emitida) return { ok: false, error: "No hay factura emitida" };
    cobro.estado_pago = "Pagado";
    cobro.monto_pagado = cobro.monto_total;
    cobro.fecha_pago_real = new Date().toISOString();
    cobro.medio_pago = "Transferencia";
    orden.estado_cobro = "Pagado";
    save(db);
    return { ok: true, ot: hydrateOt(orden, db) };
  }

  function emitLiquidation(otId) {
    const db = load();
    const orden = findOrden(otId, db);
    if (!orden) return { ok: false, error: "OT no encontrada" };
    const view = hydrateOt(orden, db);
    if (!requiredDocsOk(view) || view.status !== "cerrada") return { ok: false, error: "Bloqueado: faltan documentos obligatorios aprobados" };
    if (db.liquidaciones_choferes.some(function (l) { return l.id_orden_transporte === orden.id_orden_transporte; })) {
      return { ok: false, error: "El chofer ya fue liquidado" };
    }
    const ref = "LQ-" + (208 + db.next.liquidacion);
    db.liquidaciones_choferes.push({
      id_liquidacion: db.next.liquidacion++,
      id_chofer: orden.id_chofer,
      id_orden_transporte: orden.id_orden_transporte,
      monto_flete_chofer: orden.monto_pago_chofer,
      monto_viaticos: orden.monto_viaticos,
      descuentos_penalizaciones: 0,
      monto_neto_pagar: orden.monto_pago_chofer + orden.monto_viaticos,
      estado: "Aprobado",
      fecha_pago: "2026-08-13",
      referencia_pago: ref,
    });
    orden.estado_pago_chofer = "Liquidado";
    save(db);
    return { ok: true, ot: hydrateOt(orden, db) };
  }

  function addTruck(form) {
    const db = load();
    const row = {
      id_camion: db.next.camion++,
      patente_placa: String(form.plate || "").toUpperCase(),
      marca: form.brand,
      modelo: form.model,
      anio: Number(form.year) || 2024,
      id_gps_bermann: form.gpsId || String(4800 + db.next.camion),
      fecha_revision_tecnica: form.revisionExpiry,
      estado: "Disponible",
    };
    db.camiones.push(row);
    save(db);
    return row;
  }

  function addDriver(form) {
    const db = load();
    const parts = String(form.name || "").trim().split(" ");
    const row = {
      id_chofer: db.next.chofer++,
      rut_tax_id: form.rut,
      nombres: parts[0] || form.name,
      apellidos: parts.slice(1).join(" ") || "—",
      telefono: form.phone || "",
      licencia_numero: (form.license || "A5") + "-" + String(100000 + db.next.chofer),
      licencia_clase: form.license || "A5",
      licencia_vencimiento: form.licenseExpiry,
      activo: true,
    };
    db.choferes.push(row);
    save(db);
    return row;
  }

  function addClient(form) {
    const db = load();
    const row = {
      id_cliente: db.next.cliente++,
      rut_tax_id: form.rut,
      razon_social: form.name,
      contacto_nombre: form.contact,
      contacto_telefono: form.phone || "",
      contacto_email: form.email || "",
      direccion: form.direccion || "",
      activo: true,
      fecha_creacion: new Date().toISOString(),
    };
    db.clientes.push(row);
    save(db);
    return row;
  }

  function formatCompactCLP(n) {
    n = Number(n || 0);
    const abs = Math.abs(n);
    if (abs >= 1000000) return "$ " + (n / 1000000).toFixed(2).replace(".", ",") + " M";
    if (abs >= 1000) return "$ " + Math.round(n / 1000).toLocaleString("es-CL") + " mil";
    return formatCLP(n);
  }

  function dashboardStats(db) {
    db = db || load();
    const ots = (db.ordenes_transporte || []).map(function (o) { return hydrateOt(o, db); });
    const live = ots.filter(function (o) { return o.status !== "anulada"; });
    function nStatus(st) { return ots.filter(function (o) { return o.status === st; }).length; }
    const ingresos = live.reduce(function (s, o) { return s + (o.tarifa || 0); }, 0);
    const costos = live.reduce(function (s, o) { return s + (o.costo || 0) + (o.viatico || 0); }, 0);
    const margen = ingresos - costos;
    const margenPct = ingresos ? Math.round((margen / ingresos) * 100) : 0;
    const listoFacturar = live.filter(function (o) { return o.status === "cerrada" && !o.invoice; });
    const facturadas = live.filter(function (o) { return !!o.invoice; });
    const cobradas = live.filter(function (o) { return o.invoiceStatus === "pagada"; });
    const porCobrar = listoFacturar.concat(facturadas.filter(function (o) { return o.invoiceStatus !== "pagada"; }))
      .reduce(function (s, o) { return s + (o.tarifa || 0); }, 0);
    const porPagar = live.filter(function (o) { return o.status === "cerrada" && !o.driverPaid; })
      .reduce(function (s, o) { return s + (o.costo || 0) + (o.viatico || 0); }, 0);
    const ciclo = nStatus("cerrada") + nStatus("entregado") + nStatus("anulada");
    const otif = ciclo ? Math.round((nStatus("cerrada") / ciclo) * 100) : 0;
    const podOk = live.filter(function (o) { return o.pod === "ok"; }).length;
    const podRate = live.length ? Math.round((podOk / live.length) * 100) : 0;
    const byClient = {};
    live.forEach(function (o) {
      const k = o.clientName || "—";
      if (!byClient[k]) byClient[k] = { name: k, ots: 0, tarifa: 0, margen: 0 };
      byClient[k].ots += 1;
      byClient[k].tarifa += o.tarifa || 0;
      byClient[k].margen += o.margen || 0;
    });
    const topClientes = Object.keys(byClient).map(function (k) { return byClient[k]; })
      .sort(function (a, b) { return b.tarifa - a.tarifa; });
    const maxCliente = topClientes.reduce(function (m, c) { return Math.max(m, c.tarifa); }, 1);
    const pipeline = [
      { key: "programada", label: "Programada", n: nStatus("programada") },
      { key: "transito", label: "En Tránsito", n: nStatus("transito") },
      { key: "entregado", label: "Entregada", n: nStatus("entregado") },
      { key: "cerrada", label: "Cerrada", n: nStatus("cerrada") },
      { key: "anulada", label: "Cancelada", n: nStatus("anulada") },
    ];
    const maxPipe = pipeline.reduce(function (m, p) { return Math.max(m, p.n); }, 1);
    const licExpired = db.drivers.filter(function (d) { return daysUntil(d.licenseExpiry) < 0; });
    const licSoon = db.drivers.filter(function (d) { const n = daysUntil(d.licenseExpiry); return n >= 0 && n <= 45; });
    const rtSoon = db.trucks.filter(function (t) { return daysUntil(t.revisionExpiry) <= 30; });
    const demurrage = live.filter(function (o) { return o.demurrageRisk; });
    const alerts = [];
    if (nStatus("entregado")) alerts.push({ tone: "warn", icon: "file-warning", title: nStatus("entregado") + " OT con POD pendiente", text: "Entrega confirmada, falta validar Guía y Pesaje.", href: "pantalla_pod.html", hrefM: "pantalla_pod_movil.html" });
    if (listoFacturar.length) alerts.push({ tone: "ok", icon: "receipt", title: listoFacturar.length + " OT listas para facturar", text: "POD OK. Pueden pasar a cobro.", href: "pantalla_liquidaciones.html", hrefM: "pantalla_liquidaciones_movil.html" });
    if (demurrage.length) alerts.push({ tone: "err", icon: "timer", title: demurrage.length + " contenedor(es) en riesgo de demurrage", text: demurrage.map(function (o) { return o.container; }).join(", "), href: "pantalla_operaciones.html", hrefM: "pantalla_operaciones_movil.html" });
    if (licExpired.length) alerts.push({ tone: "err", icon: "id-card", title: "Licencia vencida: " + licExpired.map(function (d) { return d.name; }).join(", "), text: "El chofer no debería salir a ruta.", href: "pantalla_flota.html", hrefM: "pantalla_flota_movil.html" });
    if (licSoon.length) alerts.push({ tone: "warn", icon: "id-card", title: "Licencia por vencer (≤45 días)", text: licSoon.map(function (d) { return d.name; }).join(", "), href: "pantalla_flota.html", hrefM: "pantalla_flota_movil.html" });
    if (rtSoon.length) alerts.push({ tone: "warn", icon: "wrench", title: "Revisión técnica ≤30 días", text: rtSoon.map(function (t) { return t.plate; }).join(", "), href: "pantalla_flota.html", hrefM: "pantalla_flota_movil.html" });
    return {
      total: ots.length,
      live: live.length,
      activos: nStatus("programada") + nStatus("transito") + nStatus("entregado"),
      programada: nStatus("programada"),
      transito: nStatus("transito"),
      entregado: nStatus("entregado"),
      cerrada: nStatus("cerrada"),
      anulada: nStatus("anulada"),
      ingresos: ingresos,
      costos: costos,
      margen: margen,
      margenPct: margenPct,
      porCobrar: porCobrar,
      porPagar: porPagar,
      facturado: facturadas.reduce(function (s, o) { return s + (o.tarifa || 0); }, 0),
      cobrado: cobradas.reduce(function (s, o) { return s + (o.tarifa || 0); }, 0),
      listoFacturar: listoFacturar.length,
      otif: otif,
      podOk: podOk,
      podRate: podRate,
      podRevision: live.filter(function (o) { return o.pod === "revision"; }).length,
      podRechazo: live.filter(function (o) { return o.pod === "rechazado"; }).length,
      enViaje: db.camiones.filter(function (c) { return c.estado === "En Viaje"; }).length,
      disponibles: db.camiones.filter(function (c) { return c.estado === "Disponible"; }).length,
      flota: db.camiones.length,
      choferes: db.choferes.length,
      clientes: db.clientes.length,
      topClientes: topClientes,
      maxCliente: maxCliente,
      pipeline: pipeline,
      maxPipe: maxPipe,
      alerts: alerts,
      demurrage: demurrage.length,
      recent: live.slice(0, 6),
    };
  }

  function refreshGps() {
    const db = load();
    db.ordenes_transporte.filter(function (o) { return o.estado_ot === "En Tránsito"; }).forEach(function (o) {
      var last = db.tracking_gps_ot.filter(function (g) { return g.id_orden_transporte === o.id_orden_transporte; }).sort(function (a, b) { return String(b.fecha_hora_gps).localeCompare(a.fecha_hora_gps); })[0];
      if (!last) return;
      last.velocidad_kmh = Math.max(0, Math.min(95, (last.velocidad_kmh || 40) + Math.round((Math.random() - 0.4) * 18)));
      last.x = Math.max(12, Math.min(88, (last.x || 50) + (Math.random() - 0.5) * 6));
      last.y = Math.max(18, Math.min(82, (last.y || 50) + (Math.random() - 0.5) * 6));
      last.fecha_hora_gps = new Date().toISOString();
      last.evento = "Ping Bermann";
    });
    save(db);
    return db.gps;
  }

  function navItems(role, mode) {
    const session = getSession();
    mode = mode || (session && session.mode) || getMode();
    if (mode === "mobile") {
      if (role === "cliente") return [{ href: "pantalla_cliente_movil.html", icon: "package", label: "Embarques", key: "cli-m" }];
      if (role === "chofer") return [{ href: "pantalla_chofer.html", icon: "truck", label: "Viaje", key: "drv-m" }];
      return [
        { href: "pantalla_dashboard_movil.html", icon: "gauge", label: "Dash", key: "dash-m", roles: ["admin", "operaciones", "finanzas"] },
        { href: "pantalla_operaciones_movil.html", icon: "clipboard-list", label: "OTs", key: "ops-m", roles: ["admin", "operaciones", "finanzas"] },
        { href: "pantalla_gps_movil.html", icon: "map-pin", label: "GPS", key: "gps-m", roles: ["admin", "operaciones"] },
        { href: "pantalla_pod_movil.html", icon: "file-check-2", label: "POD", key: "pod-m", roles: ["admin", "operaciones"] },
        { href: "pantalla_liquidaciones_movil.html", icon: "calculator", label: "Cobros", key: "liq-m", roles: ["admin", "finanzas", "operaciones"] },
        { href: "pantalla_flota_movil.html", icon: "users", label: "Flota", key: "flota-m", roles: ["admin", "operaciones"] },
      ].filter(function (i) { return !i.roles || i.roles.indexOf(role) !== -1; });
    }
    if (role === "cliente") return [{ href: "pantalla_cliente.html", icon: "package-search", label: "Mis embarques", key: "cli" }];
    if (role === "chofer") return [{ href: "pantalla_chofer_web.html", icon: "truck", label: "Mis viajes", key: "drv-w" }];
    return [
      { href: "pantalla_dashboard.html", icon: "gauge", label: "Dashboard analítico", key: "dash", roles: ["admin", "operaciones", "finanzas"] },
      { href: "pantalla_operaciones.html", icon: "clipboard-list", label: "Órdenes de Transporte", key: "ops", roles: ["admin", "operaciones", "finanzas"] },
      { href: "pantalla_gps.html", icon: "map-pin", label: "Monitoreo GPS", key: "gps", roles: ["admin", "operaciones"] },
      { href: "pantalla_pod.html", icon: "file-check-2", label: "Gestión Documental (POD)", key: "pod", roles: ["admin", "operaciones"] },
      { href: "pantalla_liquidaciones.html", icon: "calculator", label: "Liquidaciones & Cobros", key: "liq", roles: ["admin", "finanzas", "operaciones"] },
      { href: "pantalla_flota.html", icon: "users", label: "Flota y Maestros", key: "flota", roles: ["admin", "operaciones"] },
    ].filter(function (i) { return !i.roles || i.roles.indexOf(role) !== -1; });
  }

  function bindSidebarDrawer(aside) {
    let backdrop = document.getElementById("fc-sidebar-backdrop");
    if (!backdrop) {
      backdrop = document.createElement("div");
      backdrop.id = "fc-sidebar-backdrop";
      aside.parentNode.insertBefore(backdrop, aside);
    }
    const header = document.querySelector("main header") || document.querySelector(".fc-header");
    if (header && !document.getElementById("fc-menu-btn")) {
      const btn = document.createElement("button");
      btn.id = "fc-menu-btn";
      btn.type = "button";
      btn.setAttribute("aria-label", "Abrir menú");
      btn.innerHTML = '<i data-lucide="menu" class="w-5 h-5"></i>';
      const first = header.firstElementChild;
      if (first && first.tagName !== "BUTTON") {
        if (first.tagName === "H2" || first.tagName === "H1") {
          const wrap = document.createElement("div");
          wrap.className = "flex items-center gap-3 min-w-0";
          header.insertBefore(wrap, first);
          wrap.appendChild(btn);
          wrap.appendChild(first);
        } else {
          first.classList.add("flex", "items-center", "gap-3");
          first.insertBefore(btn, first.firstChild);
        }
      } else {
        header.insertBefore(btn, header.firstChild);
      }
    }
    function closeNav() {
      aside.classList.remove("is-open");
      backdrop.classList.remove("is-open");
    }
    function toggleNav() {
      const open = aside.classList.toggle("is-open");
      backdrop.classList.toggle("is-open", open);
    }
    const menuBtn = document.getElementById("fc-menu-btn");
    if (menuBtn) menuBtn.onclick = toggleNav;
    const closeBtn = document.getElementById("fc-nav-close");
    if (closeBtn) closeBtn.onclick = closeNav;
    backdrop.onclick = closeNav;
    aside.querySelectorAll("nav a").forEach(function (a) {
      a.addEventListener("click", closeNav);
    });
  }

  function renderSidebar(active) {
    const session = getSession();
    if (!session) return;
    const items = navItems(session.role, "web").map(function (item) {
      const on = item.key === active;
      const cls = on
        ? "flex items-center gap-3 px-3 py-2.5 rounded-xl bg-emerald-400/10 text-emerald-300 font-semibold text-sm ring-1 ring-emerald-400/20"
        : "flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white font-medium text-sm transition";
      return '<a href="' + item.href + '" class="' + cls + '"><i data-lucide="' + item.icon + '" class="w-5 h-5"></i>' + item.label + "</a>";
    }).join("");
    const html =
      '<div><div class="h-16 flex items-center px-6 gap-3 border-b border-white/5">' +
      '<div class="bg-emerald-400 p-2 rounded-xl text-slate-950 font-bold"><i data-lucide="truck" class="w-6 h-6"></i></div>' +
      '<div class="flex-1"><h1 class="font-extrabold text-white leading-none tracking-tight">FleetControl</h1><span class="text-[11px] text-slate-500 font-medium">Sistema de Carga</span></div>' +
      '<button type="button" id="fc-nav-close" class="fc-nav-close" aria-label="Cerrar menú"><i data-lucide="x" class="w-5 h-5"></i></button></div>' +
      '<nav class="p-4 space-y-1.5">' + items + "</nav></div>" +
      '<div class="p-4 border-t border-white/5 space-y-3">' +
      '<div class="flex items-center gap-3"><div class="w-9 h-9 rounded-full bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/20 flex items-center justify-center font-bold text-sm">' +
      session.initials + "</div><div><p class=\"text-sm font-semibold text-white leading-tight\">" + session.name +
      '</p><p class="text-[11px] text-slate-500">' + session.label + " · " + (session.mode === "mobile" ? "Móvil" : "Web") + "</p></div></div>" +
      '<button type="button" id="fc-switch-mode" class="w-full text-xs font-medium text-emerald-300/80 hover:text-white border border-white/10 rounded-xl py-2">Cambiar a ' + (session.mode === "mobile" ? "web" : "móvil") + "</button>" +
      '<button type="button" id="fc-logout" class="w-full text-xs font-medium text-slate-400 hover:text-white border border-white/10 rounded-xl py-2">Cerrar sesión</button></div>';
    const aside = document.getElementById("fc-sidebar");
    if (aside) {
      aside.classList.remove("hidden");
      aside.innerHTML = html;
      bindSidebarDrawer(aside);
      const btn = document.getElementById("fc-logout");
      if (btn) btn.addEventListener("click", logout);
      const sw = document.getElementById("fc-switch-mode");
      if (sw) sw.addEventListener("click", function () { switchMode(session.mode === "mobile" ? "web" : "mobile"); });
      icons();
    }
  }

  function renderMobileChrome(active, title) {
    const session = getSession();
    if (!session) return;
    const vp = document.querySelector('meta[name="viewport"]');
    if (vp && vp.content.indexOf("viewport-fit") === -1) {
      vp.setAttribute("content", vp.content + ", viewport-fit=cover");
    }
    const header = document.getElementById("fc-m-header");
    if (header) {
      header.innerHTML =
        '<div class="flex items-center justify-between px-4 py-3 bg-slate-950 text-white">' +
        '<div><p class="text-[10px] uppercase tracking-wider text-emerald-400 font-bold">FleetControl ' + (session.mode === "mobile" ? "Móvil" : "Web") + '</p><h2 class="font-extrabold text-sm leading-tight">' + (title || "Módulo") + '</h2></div>' +
        '<div class="flex items-center gap-2"><button type="button" id="fc-m-switch" class="text-[10px] border border-white/15 px-2 py-1 rounded-lg text-emerald-300">Web</button>' +
        '<button type="button" id="fc-m-logout" class="text-[10px] border border-white/15 px-2 py-1 rounded-lg">Salir</button></div></div>';
    }
    const nav = document.getElementById("fc-m-nav");
    if (nav) {
      nav.innerHTML = navItems(session.role, "mobile").map(function (item) {
        const on = item.key === active;
        return '<a href="' + item.href + '" class="fc-m-nav-item flex-1 flex flex-col items-center gap-0.5 py-2 ' + (on ? "fc-m-nav-on" : "text-slate-400") + '"><i data-lucide="' + item.icon + '" class="w-5 h-5"></i><span class="text-[9px] font-bold">' + item.label + "</span></a>";
      }).join("");
    }
    const lo = document.getElementById("fc-m-logout");
    if (lo) lo.addEventListener("click", logout);
    const sw = document.getElementById("fc-m-switch");
    if (sw) sw.addEventListener("click", function () { switchMode("web"); });
    icons();
  }

  function switchMode(mode) {
    const session = getSession();
    setMode(mode);
    if (!session) { window.location.href = "index.html"; return; }
    const user = USERS.find(function (u) { return u.email === session.email; }) || buildUsers(load()).find(function (u) { return u.email === session.email; });
    if (!user) { window.location.href = "index.html"; return; }
    const next = setSession(user, mode);
    window.location.href = next.home;
  }

  function requireAuth(roles) {
    const session = getSession();
    if (!session) { window.location.href = "index.html"; return null; }
    if (roles && roles.length && roles.indexOf(session.role) === -1 && session.role !== "admin") {
      toast("No tienes acceso a este módulo", "err");
      window.location.href = session.home;
      return null;
    }
    return session;
  }

  function login(email, password, mode) {
    const db = load();
    const user = buildUsers(db).find(function (u) {
      return u.email.toLowerCase() === String(email).toLowerCase().trim() && u.password === password;
    });
    if (!user) return { ok: false, error: "Correo o contraseña incorrectos" };
    const session = setSession(user, mode || getMode());
    return { ok: true, user: user, session: session };
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    window.location.href = "index.html";
  }

  function resetDemo() {
    try { localStorage.removeItem(DB_KEY); } catch (e) {}
    try { sessionStorage.clear(); } catch (e) {}
    window.location.reload();
  }

  function readFilePreview(file, cb) {
    if (!file) { cb(""); return; }
    if (file.type && file.type.indexOf("image/") === 0) {
      const reader = new FileReader();
      reader.onload = function () {
        const img = new Image();
        img.onload = function () {
          const max = 1280;
          let w = img.width;
          let h = img.height;
          if (w > max || h > max) {
            const scale = Math.min(max / w, max / h);
            w = Math.round(w * scale);
            h = Math.round(h * scale);
          }
          const canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          canvas.getContext("2d").drawImage(img, 0, 0, w, h);
          cb(canvas.toDataURL("image/jpeg", 0.72));
        };
        img.onerror = function () { cb(""); };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
      return;
    }
    if (file.size > 350000) { cb(""); return; }
    const reader = new FileReader();
    reader.onload = function () { cb(reader.result); };
    reader.readAsDataURL(file);
  }

  function downloadCsv(filename, rows) {
    const csv = rows.map(function (r) {
      return r.map(function (cell) {
        return '"' + String(cell == null ? "" : cell).replace(/"/g, '""') + '"';
      }).join(";");
    }).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function openModal(id) { const el = document.getElementById(id); if (el) el.classList.remove("hidden"); }
  function closeModal(id) { const el = document.getElementById(id); if (el) el.classList.add("hidden"); }

  function fillSelect(select, options, placeholder) {
    if (!select) return;
    const current = select.value;
    select.innerHTML = "";
    if (placeholder) {
      const opt = document.createElement("option");
      opt.value = "";
      opt.textContent = placeholder;
      select.appendChild(opt);
    }
    options.forEach(function (o) {
      const opt = document.createElement("option");
      opt.value = o.value;
      opt.textContent = o.label;
      select.appendChild(opt);
    });
    if (current) select.value = current;
  }

  function optionsFrom(list, valueKey, labelFn) {
    return list.map(function (item) {
      if (typeof item === "string") return { value: item, label: item };
      return { value: item[valueKey], label: labelFn ? labelFn(item) : item.name || item.id };
    });
  }

  function trackingUrl(ot) {
    return "pantalla_tracking.html?token=" + encodeURIComponent(ot.trackingToken);
  }

  function copyText(text) {
    if (navigator.clipboard) navigator.clipboard.writeText(text);
    toast("Link copiado", "ok");
  }

  function icons() {
    var api = global.lucide || global.Lucide;
    if (api && typeof api.createIcons === "function") {
      api.createIcons({ attrs: { "stroke-width": 1.75 } });
    }
  }

  function bindModalDismiss() {
    document.querySelectorAll("[data-close]").forEach(function (btn) {
      btn.addEventListener("click", function () { closeModal(btn.getAttribute("data-close")); });
    });
  }

  global.FleetApp = {
    USERS: USERS,
    DOC_TYPES: DOC_TYPES,
    load: load,
    save: save,
    getSession: getSession,
    requireAuth: requireAuth,
    login: login,
    logout: logout,
    getMode: getMode,
    setMode: setMode,
    homeFor: homeFor,
    switchMode: switchMode,
    renderMobileChrome: renderMobileChrome,
    resetDemo: resetDemo,
    toast: toast,
    formatCLP: formatCLP,
    formatCompactCLP: formatCompactCLP,
    formatDate: formatDate,
    dashboardStats: dashboardStats,
    daysUntil: daysUntil,
    statusMeta: statusMeta,
    docStatusMeta: docStatusMeta,
    otPodState: otPodState,
    podMeta: podMeta,
    requiredDocsOk: requiredDocsOk,
    canInvoice: canInvoice,
    hydrateOt: hydrateOt,
    findOt: findOt,
    createOt: createOt,
    setOtStatus: setOtStatus,
    uploadDoc: uploadDoc,
    reviewDoc: reviewDoc,
    emitInvoice: emitInvoice,
    markInvoicePaid: markInvoicePaid,
    emitLiquidation: emitLiquidation,
    addTruck: addTruck,
    addDriver: addDriver,
    addClient: addClient,
    refreshGps: refreshGps,
    renderSidebar: renderSidebar,
    downloadCsv: downloadCsv,
    openModal: openModal,
    closeModal: closeModal,
    fillSelect: fillSelect,
    optionsFrom: optionsFrom,
    readFilePreview: readFilePreview,
    trackingUrl: trackingUrl,
    copyText: copyText,
    icons: icons,
    bindModalDismiss: bindModalDismiss,
  };

  load();
})(window);
