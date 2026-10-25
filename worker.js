// pyraxisagency.com en Cloudflare: sirve los archivos del sitio, manda www al dominio principal
// y agrega cabeceras de seguridad a cada respuesta.

// Qué puede cargar la web. Los scripts y estilos van dentro del HTML, por eso 'unsafe-inline';
// aun así se bloquea cualquier script de otro dominio, que otra web la meta en un iframe y los plugins.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https:",
  "media-src 'self' https:",
  // Onyx recibe el formulario; FormSubmit es el respaldo; Cloudflare mide las visitas.
  "connect-src 'self' https://onyx.pyraxisagency.com https://formsubmit.co https://cloudflareinsights.com",
  "frame-src 'self'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const SEGURIDAD = {
  "Content-Security-Policy": CSP,
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  "Cross-Origin-Opener-Policy": "same-origin",
};

export default {
  async fetch(pedido, env) {
    const url = new URL(pedido.url);
    if (url.hostname === "www.pyraxisagency.com") {
      url.hostname = "pyraxisagency.com";
      return Response.redirect(url.toString(), 308);
    }
    const r = await env.ASSETS.fetch(pedido);
    const respuesta = new Response(r.body, r);
    for (const [k, v] of Object.entries(SEGURIDAD)) respuesta.headers.set(k, v);
    if (url.pathname === "/llms.txt") respuesta.headers.set("Content-Type", "text/plain; charset=utf-8");
    return respuesta;
  },
};
