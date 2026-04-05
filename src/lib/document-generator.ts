// ============================================
// ORBBI — Generador de documentos empresariales
// Genera HTML profesional e imprimible
// ============================================

export type DocType = 'reporte' | 'contrato' | 'cotizacion' | 'analisis'

interface DocumentParams {
  type: DocType
  title: string
  empresa: string
  content: string
  agente: string
  fecha: string
}

// ============================================
// ESTILOS BASE COMPARTIDOS
// ============================================
const BASE_STYLES = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'Source Serif 4', Georgia, serif;
      color: #141413;
      background: #faf9f5;
      line-height: 1.7;
      font-size: 14px;
    }

    .document {
      max-width: 800px;
      margin: 0 auto;
      padding: 48px 56px;
      background: #ffffff;
      min-height: 100vh;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #141413;
      padding-bottom: 20px;
      margin-bottom: 32px;
    }

    .logo {
      font-size: 24px;
      font-weight: 700;
      color: #141413;
      letter-spacing: -0.5px;
    }

    .header-info {
      text-align: right;
      font-size: 12px;
      color: #555;
      line-height: 1.6;
    }

    .doc-title {
      font-size: 22px;
      font-weight: 700;
      color: #141413;
      margin-bottom: 8px;
    }

    .doc-subtitle {
      font-size: 13px;
      color: #666;
      margin-bottom: 32px;
    }

    .section {
      margin-bottom: 28px;
    }

    .section-title {
      font-size: 15px;
      font-weight: 700;
      color: #141413;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 1px solid #ddd;
      padding-bottom: 6px;
      margin-bottom: 14px;
    }

    .content {
      white-space: pre-wrap;
      line-height: 1.8;
    }

    .footer {
      margin-top: 48px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
      font-size: 11px;
      color: #999;
      text-align: center;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 16px 0;
    }

    th, td {
      padding: 10px 14px;
      text-align: left;
      border-bottom: 1px solid #eee;
      font-size: 13px;
    }

    th {
      background: #f5f4f0;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 11px;
      letter-spacing: 0.5px;
    }

    .signatures {
      display: flex;
      justify-content: space-between;
      margin-top: 64px;
      gap: 48px;
    }

    .signature-block {
      flex: 1;
      text-align: center;
    }

    .signature-line {
      border-top: 1px solid #141413;
      margin-top: 80px;
      padding-top: 8px;
      font-size: 12px;
      color: #555;
    }

    .metric-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin: 16px 0;
    }

    .metric-card {
      background: #f5f4f0;
      padding: 16px;
      border-radius: 6px;
      text-align: center;
    }

    .metric-value {
      font-size: 20px;
      font-weight: 700;
      color: #141413;
    }

    .metric-label {
      font-size: 11px;
      color: #666;
      margin-top: 4px;
    }

    .action-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 10px 0;
      border-bottom: 1px solid #f0efe8;
    }

    .action-number {
      background: #141413;
      color: #faf9f5;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 600;
      flex-shrink: 0;
      margin-top: 2px;
    }

    @media print {
      body { background: white; }
      .document { padding: 24px; max-width: none; box-shadow: none; }
    }
  </style>
`

// ============================================
// HEADER + FOOTER COMPARTIDOS
// ============================================
function buildHeader(params: DocumentParams, tipoLabel: string): string {
  return `
    <div class="header">
      <div>
        <div class="logo">Orbbi</div>
        <div style="font-size: 11px; color: #888; margin-top: 2px;">${tipoLabel}</div>
      </div>
      <div class="header-info">
        <div><strong>${params.empresa}</strong></div>
        <div>${params.fecha}</div>
        <div>Generado por: ${params.agente}</div>
      </div>
    </div>
  `
}

function buildFooter(): string {
  return `
    <div class="footer">
      Documento generado por Orbbi — orbbilatam.com<br>
      Este documento es informativo y no constituye asesoría profesional vinculante.
    </div>
  `
}

// ============================================
// TEMPLATES POR TIPO DE DOCUMENTO
// ============================================

function templateReporte(params: DocumentParams): string {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${params.title} — ${params.empresa}</title>
      ${BASE_STYLES}
    </head>
    <body>
      <div class="document">
        ${buildHeader(params, 'Reporte')}

        <h1 class="doc-title">${params.title}</h1>
        <p class="doc-subtitle">Reporte generado para ${params.empresa} el ${params.fecha}</p>

        <div class="section">
          <h2 class="section-title">Resumen ejecutivo</h2>
          <div class="content">${params.content}</div>
        </div>

        <div class="section">
          <h2 class="section-title">Recomendaciones</h2>
          <p style="color: #666; font-size: 13px;">
            Las recomendaciones específicas se encuentran dentro del contenido del reporte.
            Consulta con tu agente Orbbi para profundizar en cualquier punto.
          </p>
        </div>

        ${buildFooter()}
      </div>
    </body>
    </html>
  `
}

function templateContrato(params: DocumentParams): string {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${params.title} — ${params.empresa}</title>
      ${BASE_STYLES}
    </head>
    <body>
      <div class="document">
        ${buildHeader(params, 'Contrato')}

        <h1 class="doc-title">${params.title}</h1>
        <p class="doc-subtitle">Documento contractual — ${params.empresa}</p>

        <div class="section">
          <h2 class="section-title">Partes</h2>
          <p><strong>Parte A:</strong> ${params.empresa}</p>
          <p><strong>Parte B:</strong> [Por definir]</p>
          <p style="font-size: 12px; color: #888; margin-top: 8px;">Fecha de elaboración: ${params.fecha}</p>
        </div>

        <div class="section">
          <h2 class="section-title">Cláusulas</h2>
          <div class="content">${params.content}</div>
        </div>

        <div class="section">
          <h2 class="section-title">Firmas</h2>
          <div class="signatures">
            <div class="signature-block">
              <div class="signature-line">
                Parte A — ${params.empresa}<br>
                Representante legal
              </div>
            </div>
            <div class="signature-block">
              <div class="signature-line">
                Parte B<br>
                Representante legal
              </div>
            </div>
          </div>
        </div>

        ${buildFooter()}
      </div>
    </body>
    </html>
  `
}

function templateCotizacion(params: DocumentParams): string {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${params.title} — ${params.empresa}</title>
      ${BASE_STYLES}
    </head>
    <body>
      <div class="document">
        ${buildHeader(params, 'Cotización')}

        <h1 class="doc-title">${params.title}</h1>
        <p class="doc-subtitle">Propuesta comercial de ${params.empresa} — Válida por 30 días desde ${params.fecha}</p>

        <div class="section">
          <h2 class="section-title">Detalle de la propuesta</h2>
          <div class="content">${params.content}</div>
        </div>

        <div class="section">
          <h2 class="section-title">Términos y condiciones</h2>
          <ul style="list-style: none; padding: 0;">
            <li style="padding: 6px 0; border-bottom: 1px solid #f0efe8;">• Vigencia: 30 días calendario desde la fecha de emisión</li>
            <li style="padding: 6px 0; border-bottom: 1px solid #f0efe8;">• Precios sujetos a cambio sin previo aviso después de la vigencia</li>
            <li style="padding: 6px 0; border-bottom: 1px solid #f0efe8;">• Impuestos no incluidos salvo que se indique lo contrario</li>
          </ul>
        </div>

        <div style="margin-top: 40px; padding: 20px; background: #f5f4f0; border-radius: 6px;">
          <p style="font-size: 13px; font-weight: 600;">Para aceptar esta cotización:</p>
          <p style="font-size: 12px; color: #666; margin-top: 4px;">
            Firma y devuelve este documento, o responde por escrito confirmando tu aceptación.
          </p>
          <div style="margin-top: 32px; border-top: 1px solid #ccc; padding-top: 8px; font-size: 12px; color: #888;">
            Firma de aceptación: _______________________ Fecha: _______
          </div>
        </div>

        ${buildFooter()}
      </div>
    </body>
    </html>
  `
}

function templateAnalisis(params: DocumentParams): string {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${params.title} — ${params.empresa}</title>
      ${BASE_STYLES}
    </head>
    <body>
      <div class="document">
        ${buildHeader(params, 'Análisis')}

        <h1 class="doc-title">${params.title}</h1>
        <p class="doc-subtitle">Análisis preparado para ${params.empresa} — ${params.fecha}</p>

        <div class="section">
          <h2 class="section-title">Hallazgos principales</h2>
          <div class="content">${params.content}</div>
        </div>

        <div class="section">
          <h2 class="section-title">Próximos pasos</h2>
          <p style="color: #666; font-size: 13px;">
            Revisa los hallazgos con tu equipo y consulta con tu agente Orbbi para definir
            un plan de acción con prioridades y plazos concretos.
          </p>
        </div>

        ${buildFooter()}
      </div>
    </body>
    </html>
  `
}

// ============================================
// FUNCIÓN PRINCIPAL
// ============================================

export function generateDocument(params: DocumentParams): string {
  const builders: Record<DocType, (p: DocumentParams) => string> = {
    reporte: templateReporte,
    contrato: templateContrato,
    cotizacion: templateCotizacion,
    analisis: templateAnalisis,
  }

  return builders[params.type](params)
}
