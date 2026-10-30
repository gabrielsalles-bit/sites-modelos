# Guia de Contribuição

## Primeiros passos
1. Aceite o convite de colaborador (e-mail ou aba *Invitations* do repositório).
2. Clone e instale:
   ```bash
   git clone https://github.com/<dono>/sites-modelos.git
   cd sites-modelos
   npm install
   ```
3. Rode o site em que vai trabalhar (veja os comandos no [README](README.md)).

## Fluxo de trabalho
- **Nunca** faça commit direto na `main`. Ela publica automaticamente no GitHub Pages.
- Crie uma branch a partir da `main`:
  `git checkout -b feat/auto-nome-curto` (ou `fix/...`, `docs/...`).
- Faça commits pequenos, no padrão `tipo(escopo): descrição`
  (ex.: `feat(luxury-dealership): adiciona galeria 360`).
- Abra um Pull Request para a `main`. O CI roda `npm run build`; só faça merge com ele verde.
- Antes de começar, rode `git pull` na `main` para evitar conflitos.

## Regras do monorepo
- Cada site é independente dentro de `sites/`; não importe código de um site em outro.
- O `base` do Vite e os links `/sites-modelos/...` dependem do nome do repositório. Não o renomeie sem atualizar esses caminhos.
- Não versione `node_modules`, `dist`, `.env` nem `midia_temp`.
- Imagens e vídeos: otimize antes de subir.
