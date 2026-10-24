import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const sitesDir = path.join(rootDir, 'sites');
const outputDist = path.join(rootDir, 'dist');

console.log('🚀 [Build Monorepo] Iniciando pipeline de compilação multi-sites...\n');

// 1. Build do Portal Hub (Raiz)
console.log('📦 1/2 Compilando Portal Hub (Showcase raiz)...');
execSync('npm run build:hub', { stdio: 'inherit', cwd: rootDir });

// 2. Garantir arquivo .nojekyll para o GitHub Pages
fs.writeFileSync(path.join(outputDist, '.nojekyll'), '', 'utf8');

// 3. Compilar e integrar cada subsite presente em sites/
console.log('\n📦 2/2 Compilando subsites em /sites...');
if (fs.existsSync(sitesDir)) {
  const entries = fs.readdirSync(sitesDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const sitePath = path.join(sitesDir, entry.name);
      const pkgPath = path.join(sitePath, 'package.json');

      if (fs.existsSync(pkgPath)) {
        console.log(`\n➡️  Construindo modelo: [${entry.name}]...`);
        try {
          execSync('npm run build', { stdio: 'inherit', cwd: sitePath });

          const subDist = path.join(sitePath, 'dist');
          const destDist = path.join(outputDist, entry.name);

          if (fs.existsSync(subDist)) {
            console.log(`📂 Copiando artefatos de [${entry.name}] para dist/${entry.name}...`);
            fs.cpSync(subDist, destDist, { recursive: true });
            console.log(`✅ [${entry.name}] integrado com sucesso!`);
          } else {
            console.warn(`⚠️  dist não encontrado para [${entry.name}] em ${subDist}`);
          }
        } catch (err) {
          console.error(`❌ Erro ao compilar [${entry.name}]:`, err.message);
          process.exit(1);
        }
      } else {
        console.log(`ℹ️  [${entry.name}] é uma pasta placeholder (sem package.json), ignorando build.`);
      }
    }
  }
}

console.log('\n🎉 [Build Concluído] Todos os modelos foram compilados e agrupados em dist/ com sucesso!');