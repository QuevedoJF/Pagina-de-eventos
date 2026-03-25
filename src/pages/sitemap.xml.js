// Archivo: src/pages/sitemap.xml.js
import sql from "../lib/db.js";

export async function GET() {
  // 1. Traemos todos los IDs de tus proyectos desde NeonDB
  const proyectos = await sql`SELECT id FROM proyectos`;

  // 2. Creamos un bloque de texto (XML) para cada proyecto que exista
  const urlsProyectos = proyectos
    .map(
      (p) => `
    <url>
      <loc>https://pagina-de-eventos-one.vercel.app/proyecto/${p.id}</loc>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>
  `,
    )
    .join("");

  // 3. Juntamos las páginas principales con las páginas de tus proyectos
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://pagina-de-eventos-one.vercel.app/</loc>
      <changefreq>weekly</changefreq>
      <priority>1.0</priority>
    </url>
    <url>
      <loc>https://pagina-de-eventos-one.vercel.app/proyectos</loc>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>https://pagina-de-eventos-one.vercel.app/servicios</loc>
      <priority>0.8</priority>
    </url>
    ${urlsProyectos}
  </urlset>`;

  // 4. Se lo entregamos a Google como un archivo XML válido
  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
