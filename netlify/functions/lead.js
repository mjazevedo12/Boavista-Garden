// netlify/functions/lead.js
// Recebe o lead do formulário e reencaminha-o para o Google Apps Script.
//
// Porque existe esta função:
//   Chamar o Apps Script diretamente do browser falha por CORS — o Apps Script
//   responde a um POST com um redirect 302 para googleusercontent.com, e o
//   browser perde a autorização nesse salto. Aqui, no servidor, o redirect é
//   seguido normalmente (não há CORS entre servidores) e devolvemos ao browser
//   o JSON já limpo, com os cabeçalhos certos.
//
// O URL do Apps Script está numa variável de ambiente (APPS_SCRIPT_URL) para
// não ficar exposto no HTML público. Define-a em:
//   Netlify → Site settings → Environment variables → APPS_SCRIPT_URL
//   valor: https://script.google.com/macros/s/AKfycbwkn21uQhVoAU9cdEMUpLwYFv_3GJCpI7s_fdm99mS9TmHx0LTRstWmFmW2WMQqVaai/exec
// (depois de a criar/alterar, faz um novo deploy)

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return resposta(405, { estado: 'erro', motivo: 'metodo_nao_permitido' });
  }

  const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL;
  if (!APPS_SCRIPT_URL) {
    return resposta(500, { estado: 'erro', motivo: 'configuracao_em_falta' });
  }

  const corpo = event.isBase64Encoded
    ? Buffer.from(event.body, 'base64').toString('utf8')
    : event.body;

  try {
    const r = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: corpo,
      redirect: 'follow'   // segue o 302 do Apps Script do lado do servidor
    });

    const texto = await r.text();
    let dados;
    try {
      dados = JSON.parse(texto);
    } catch (err) {
      dados = { estado: 'erro', motivo: 'resposta_invalida_do_script' };
    }
    return resposta(200, dados);

  } catch (err) {
    return resposta(502, { estado: 'erro', motivo: 'falha_ligacao_script' });
  }
};

function resposta(status, objeto) {
  return {
    statusCode: status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    body: JSON.stringify(objeto)
  };
}
