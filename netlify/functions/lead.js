// netlify/functions/lead.js
// Reencaminha o lead do formulário para o Google Apps Script.
// O URL do Apps Script vem SEMPRE da variável de ambiente APPS_SCRIPT_URL
// (Netlify → Site settings → Environment variables) — nunca deve aparecer
// no HTML nem ser commitado no repositório.

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado: 'erro', motivo: 'metodo_nao_permitido' })
    };
  }

  const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL;
  if (!APPS_SCRIPT_URL) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado: 'erro', motivo: 'configuracao_em_falta' })
    };
  }

  const corpo = event.isBase64Encoded
    ? Buffer.from(event.body, 'base64').toString('utf8')
    : event.body;

  try {
    const resposta = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: corpo,
      redirect: 'follow'
    });

    const texto = await resposta.text();
    let dados;
    try {
      dados = JSON.parse(texto);
    } catch (err) {
      dados = { estado: 'erro', motivo: 'resposta_invalida_do_script' };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      body: JSON.stringify(dados)
    };
  } catch (err) {
    return {
      statusCode: 502,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      body: JSON.stringify({ estado: 'erro', motivo: 'falha_ligacao_script' })
    };
  }
};
