import { describe, expect, test } from "vitest";

import { findNews, formatNewsDate, latestNews, news, searchNews } from "./newsData";

describe("newsData", () => {
  test("slugs únicos y aptos para URL", () => {
    const slugs = news.map((item) => item.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9-]+$/);
  });

  test("latestNews ordena por fecha descendente y limita", () => {
    const latest = latestNews(3);
    expect(latest).toHaveLength(3);
    expect(latest[0].date >= latest[1].date).toBe(true);
    expect(latest[1].date >= latest[2].date).toBe(true);
  });

  test("findNews devuelve null si no existe", () => {
    expect(findNews("acto-de-grado")?.title).toMatch(/Acto de grado/);
    expect(findNews("no-existe")).toBeNull();
  });

  test("searchNews ignora mayúsculas y busca en categoría", () => {
    expect(searchNews(news, "PASANTÍAS").map((n) => n.slug)).toContain("jornada-de-pasantias");
    expect(searchNews(news, "pastoral")).toHaveLength(1);
    expect(searchNews(news, "  ")).toHaveLength(news.length);
  });

  test("formatNewsDate en español", () => {
    expect(formatNewsDate("2026-02-02")).toMatch(/2 de febrero de 2026/);
  });
});
