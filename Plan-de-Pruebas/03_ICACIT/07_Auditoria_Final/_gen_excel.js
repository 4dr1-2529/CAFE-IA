const ExcelJS = require('../../../backend/node_modules/exceljs');
const path = require('path');
const dir = path.join(__dirname, 'Evidencias');

const dashboard = [
  ['Calidad General', 77, 'Bueno', 'Amarillo', 'FURPS+ global consolidado'],
  ['Arquitectura', 88, 'Bueno', 'Verde', 'Hexagonal; 45 componentes'],
  ['Frontend', 78, 'Bueno', 'Amarillo', '15 páginas React; Cypress 13/13'],
  ['Backend', 82, 'Bueno', 'Amarillo', 'Express hexagonal; 18/18 tests'],
  ['Base de Datos', 80, 'Bueno', 'Amarillo', '39 tablas; 43 FK'],
  ['Seguridad', 76, 'Bueno', 'Amarillo', 'OWASP A01-A10; A06 55%'],
  ['QA', 75, 'Bueno', 'Amarillo', '31 casos; Sonar 0% cov'],
  ['DevOps', 72, 'Regular-Bueno', 'Amarillo', 'CI parcial; deploy 90%'],
  ['Pruebas', 75, 'Bueno', 'Amarillo', 'Cypress fuera CI'],
  ['Documentación', 88, 'Bueno', 'Verde', '>884 archivos corpus'],
  ['ICACIT', 82, 'Bueno', 'Amarillo', '7 competencias; 6 cumplen'],
  ['Madurez', 3, 'Definido', 'Amarillo', 'Nivel 3 CMMI-like'],
  ['Preparación Producción', 82, 'Apta con deuda', 'Amarillo', 'Railway+Vercel HTTP 200'],
];

const indicadores = [
  ['Cumplimiento FURPS+', 77, 'FURPS/08'],
  ['Cumplimiento OWASP', 76, 'FURPS/08'],
  ['Cumplimiento ICACIT', 82, 'ICACIT/04'],
  ['Cumplimiento Reporte Calidad', 89.2, 'Reporte §12'],
  ['Cobertura Documental', 88, 'ICACIT/03'],
  ['Cobertura Técnica', 82, 'ICACIT/02'],
  ['Cobertura Funcional', 81, 'II/13; 48/59'],
  ['Cobertura Arquitectónica', 88, 'FURPS; II/07'],
  ['Cobertura QA', 75, 'FURPS QA'],
  ['Cobertura DevOps', 72, 'FURPS/08'],
  ['Cobertura Seguridad', 76, 'OWASP'],
  ['Cobertura Evidencias', 83, 'ICACIT/03; 38/44 EV'],
  ['Cobertura Pruebas', 75, 'Cypress+JMeter'],
  ['Nivel General Proyecto', 82, 'ICACIT promedio'],
  ['Nivel Madurez', 3, 'Nivel 3 Definido'],
  ['Preparación Producción', 82, 'ICACIT/04'],
];

const hallazgos = [
  ['CON-001','LoteService sin TX SQL','Integridad','Crítico','P1','Pendiente','BEGIN/COMMIT/ROLLBACK'],
  ['CON-002','Health expone dbHost','Seguridad/A05','Alto','P1','Pendiente','Sanitizar health'],
  ['CON-003','CORS *.vercel.app','Seguridad/A05','Alto','P1','Pendiente','CORS whitelist'],
  ['CON-004','Permisos BD sin enforcement','Seguridad/A01','Alto','P1','Pendiente','Middleware RBAC'],
  ['CON-005','CVE form-data HIGH','Seguridad/A06','Alto','P1','Pendiente','npm audit fix'],
  ['CON-006','Cypress fuera CI','QA/DevOps','Alto','P1','Pendiente','Job Cypress CI'],
  ['CON-007','Backups no documentados','Ops/R','Alto','P1','Pendiente','Política Railway'],
  ['CON-008','CVE frontend (6)','Seguridad/A06','Medio','P2','Pendiente','Actualizar deps'],
  ['CON-009','JWT localStorage','Seguridad/A02','Medio','P2','Pendiente','Cookies httpOnly'],
  ['CON-010','Rol en registro','Seguridad/A07','Medio','P2','Pendiente','Forzar rol cliente'],
  ['CON-011','Sin /auth/refresh','Seguridad/A07','Medio','P2','Pendiente','Endpoint refresh'],
  ['CON-012','CI audit no bloqueante','DevOps/A08','Medio','P2','Pendiente','Gate audit'],
  ['CON-013','Contraseña min 6','Seguridad/A07','Medio','P2','Pendiente','Política ≥12'],
  ['CON-014','JMeter solo health','Performance','Medio','P2','Pendiente','APIs JWT'],
  ['CON-015','Chunk Recharts 411KB','Performance','Medio','P3','Pendiente','Lazy load'],
  ['CON-016','Lotes sin PUT/DELETE','Funcionalidad','Medio','P3','Pendiente','Soft-delete'],
  ['CON-017','ML desacoplado','Funcionalidad','Medio','P3','Pendiente','Integrar/documentar'],
  ['CON-018','Sin axe a11y','Usabilidad','Medio','P3','Pendiente','axe-core CI'],
  ['CON-019','Sonar 0% cov','Supportability','Medio','P3','Pendiente','c8+lcov'],
  ['CON-020','SKIP_INTEGRATION CI','DevOps/A08','Medio','P3','Pendiente','MySQL CI'],
  ['CON-021','Sin recovery pwd','Seguridad/A07','Bajo','P4','Pendiente','forgot-password'],
  ['CON-022','Sin APM/SIEM','Seguridad/A09','Bajo','P4','Pendiente','Alertas Railway'],
  ['CON-023','Fincas sin API/UI','Funcionalidad','Bajo','P4','Pendiente','CRUD fincas'],
  ['CON-024','Evidencias CY/SQ viejas','QA/Docs','Bajo','P4','Pendiente','Re-ejecutar'],
];

const checklist = [
  ['EVAL-01','Ingeniería Inversa 13 fases completada','II/13','Cumple'],
  ['EVAL-02','FURPS+ evaluación 8 fases','FURPS/08','Cumple 77%'],
  ['EVAL-03','OWASP Top 10 evaluado','FURPS/08','Cumple 76%'],
  ['EVAL-04','Reporte Calidad documentado','Reporte §12','Cumple 89.2%'],
  ['EVAL-05','ICACIT 7 competencias evaluadas','ICACIT/04','Cumple 82%'],
  ['EVAL-06','Evidencias consolidadas','ICACIT/03','83% cobertura'],
  ['EVAL-07','Métricas calculadas','ICACIT/05','32 indicadores'],
  ['EVAL-08','Plan mejora continua','ICACIT/06','24 acciones PDCA'],
  ['EVAL-09','Hallazgos críticos resueltos','CON-001','Pendiente'],
  ['EVAL-10','Hallazgos altos resueltos','CON-002-007','Pendiente'],
  ['EVAL-11','Remediación global','FURPS/08','0%'],
  ['EVAL-12','Capturas UI sustentación','EV capturas','Pendiente'],
  ['EVAL-13','Cypress en CI','CON-006','Pendiente'],
  ['EVAL-14','Sonar cobertura >0%','CON-019','Pendiente'],
  ['EVAL-15','ICACIT meta 85%','ICACIT/04','82% actual'],
];

async function main() {
  const wb1 = new ExcelJS.Workbook();
  const ws1 = wb1.addWorksheet('Dashboard');
  ws1.columns = [
    { header: 'Indicador', key: 'ind', width: 22 },
    { header: '%', key: 'pct', width: 8 },
    { header: 'Estado', key: 'est', width: 16 },
    { header: 'Semáforo', key: 'sem', width: 10 },
    { header: 'Interpretación', key: 'int', width: 35 },
  ];
  ws1.getRow(1).font = { bold: true };
  dashboard.forEach(r => ws1.addRow({ ind: r[0], pct: r[1], est: r[2], sem: r[3], int: r[4] }));

  const wb2 = new ExcelJS.Workbook();
  const ws2 = wb2.addWorksheet('Indicadores');
  ws2.columns = [
    { header: 'Indicador', key: 'ind', width: 28 },
    { header: 'Valor', key: 'val', width: 10 },
    { header: 'Fuente', key: 'src', width: 22 },
  ];
  ws2.getRow(1).font = { bold: true };
  indicadores.forEach(r => ws2.addRow({ ind: r[0], val: r[1], src: r[2] }));

  const wb3 = new ExcelJS.Workbook();
  const ws3 = wb3.addWorksheet('Checklist');
  ws3.columns = [
    { header: 'ID', key: 'id', width: 10 },
    { header: 'Ítem', key: 'item', width: 40 },
    { header: 'Referencia', key: 'ref', width: 18 },
    { header: 'Estado', key: 'est', width: 16 },
  ];
  ws3.getRow(1).font = { bold: true };
  checklist.forEach(r => ws3.addRow({ id: r[0], item: r[1], ref: r[2], est: r[3] }));

  const wb4 = new ExcelJS.Workbook();
  const ws4 = wb4.addWorksheet('Consolidada');
  ws4.columns = [
    { header: 'Marco', key: 'marco', width: 14 },
    { header: 'Área', key: 'area', width: 20 },
    { header: 'Resultado %', key: 'res', width: 12 },
    { header: 'Fuente', key: 'src', width: 22 },
  ];
  ws4.getRow(1).font = { bold: true };
  [
    ['FURPS+','Functionality',83,'FURPS/08'],
    ['FURPS+','Usability',78,'FURPS/08'],
    ['FURPS+','Reliability',78,'FURPS/08'],
    ['FURPS+','Performance',70,'FURPS/08'],
    ['FURPS+','Supportability',74,'FURPS/08'],
    ['FURPS+','Global',77,'FURPS/08'],
    ['OWASP','Global',76,'FURPS/08'],
    ['OWASP','A06 Components',55,'FURPS/08'],
    ['ICACIT','CT-01',82,'ICACIT/04'],
    ['ICACIT','CT-02',83,'ICACIT/04'],
    ['ICACIT','CT-03',78,'ICACIT/04'],
    ['ICACIT','CT-04',88,'ICACIT/04'],
    ['ICACIT','CE-01',88,'ICACIT/04'],
    ['ICACIT','CE-02',82,'ICACIT/04'],
    ['ICACIT','CE-03',74,'ICACIT/04'],
    ['ICACIT','Promedio',82,'ICACIT/04'],
    ['II','Funcional',88,'II/13'],
    ['II','Arquitectónica',88,'II/07'],
    ['Reporte','Cumplimiento',89.2,'Reporte §12'],
    ['Técnico','Despliegue',90,'ICACIT/04'],
    ['Técnico','Backend',82,'ICACIT/04'],
    ['Técnico','Frontend',78,'ICACIT/04'],
    ['Técnico','Base Datos',80,'ICACIT/04'],
  ].forEach(r => ws4.addRow({ marco: r[0], area: r[1], res: r[2], src: r[3] }));

  const wb5 = new ExcelJS.Workbook();
  const ws5 = wb5.addWorksheet('Hallazgos');
  ws5.columns = [
    { header: 'ID', key: 'id', width: 10 },
    { header: 'Problema', key: 'prob', width: 28 },
    { header: 'Área', key: 'area', width: 16 },
    { header: 'Severidad', key: 'sev', width: 10 },
    { header: 'Prioridad', key: 'pri', width: 8 },
    { header: 'Estado', key: 'est', width: 10 },
    { header: 'Acción', key: 'acc', width: 24 },
  ];
  ws5.getRow(1).font = { bold: true };
  hallazgos.forEach(r => ws5.addRow({ id: r[0], prob: r[1], area: r[2], sev: r[3], pri: r[4], est: r[5], acc: r[6] }));

  await wb1.xlsx.writeFile(path.join(dir, 'Dashboard_Final.xlsx'));
  await wb2.xlsx.writeFile(path.join(dir, 'Indicadores_Finales.xlsx'));
  await wb3.xlsx.writeFile(path.join(dir, 'Checklist_Final.xlsx'));
  await wb4.xlsx.writeFile(path.join(dir, 'Matriz_Consolidada.xlsx'));
  await wb5.xlsx.writeFile(path.join(dir, 'Matriz_Hallazgos_Final.xlsx'));
  console.log('OK');
}

main().catch(e => { console.error(e); process.exit(1); });
