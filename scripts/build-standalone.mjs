import { readFile, readdir, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { build } from "vite";
import react from "@vitejs/plugin-react";

// A classic-script bundle works on file:// without a module loader or server.
const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const result = await build({
  root: projectRoot,
  configFile: false,
  plugins: [react()],
  publicDir: false,
  define: { "process.env.NODE_ENV": JSON.stringify("production") },
  build: {
    write: false,
    minify: "esbuild",
    cssCodeSplit: false,
    lib: {
      entry: path.join(projectRoot, "src/main.tsx"),
      name: "WhiskyNote",
      formats: ["iife"],
    },
  },
});

const outputs = (Array.isArray(result) ? result : [result]).flatMap(
  (bundle) => bundle.output,
);
let script = outputs
  .filter((output) => output.type === "chunk")
  .map((output) => output.code)
  .join("\n");
const stylesheet = outputs
  .filter(
    (output) => output.type === "asset" && output.fileName.endsWith(".css"),
  )
  .map((output) => String(output.source))
  .join("\n");

// Embed photographs so the standalone page also works when copied by itself.
const imagesPath = path.join(projectRoot, "public/images");
const imageTypes = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};
for (const filename of await readdir(imagesPath)) {
  const mime = imageTypes[path.extname(filename)];
  if (!mime || !script.includes(`/images/${filename}`)) continue;
  const bytes = await readFile(path.join(imagesPath, filename));
  script = script.replaceAll(
    `/images/${filename}`,
    `data:${mime};base64,${bytes.toString("base64")}`,
  );
}

const favicon = await readFile(
  path.join(projectRoot, "public/favicon.svg"),
  "utf8",
);
const html = `<!doctype html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#f8f7f3" />
  <title>WHISKY NOTE — 한 잔의 취향, 당신만의 발견</title>
  <link rel="icon" href="data:image/svg+xml,${encodeURIComponent(favicon)}" />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Noto+Sans+KR:wght@400;450;500;550;600;650;700;750;800&display=swap" rel="stylesheet" />
  <style>${stylesheet.replace(/<\/style/gi, "<\\/style")}</style>
</head>
<body>
  <div id="root"></div>
  <noscript>위스키 노트를 사용하려면 브라우저에서 JavaScript를 켜 주세요.</noscript>
  <script>${script.replace(/<\/script/gi, "<\\/script")}</script>
</body>
</html>
`;

await writeFile(path.join(projectRoot, "preview.html"), html, "utf8");
await mkdir(path.join(projectRoot, "dist"), { recursive: true });
await writeFile(path.join(projectRoot, "dist/preview.html"), html, "utf8");
console.log(
  `Standalone page written: preview.html (${(Buffer.byteLength(html) / 1024 / 1024).toFixed(2)} MB)`,
);
