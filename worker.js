// pyraxisagency.com en Cloudflare: sirve los archivos del sitio y manda www al dominio principal.
export default {
  async fetch(pedido, env) {
    const url = new URL(pedido.url);
    if (url.hostname === "www.pyraxisagency.com") {
      url.hostname = "pyraxisagency.com";
      return Response.redirect(url.toString(), 308);
    }
    return env.ASSETS.fetch(pedido);
  },
};
