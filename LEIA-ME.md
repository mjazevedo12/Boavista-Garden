# Boavista Garden — site

Esta versão usa **os seus nomes de ficheiro originais**. Não é preciso renomear
nem mover nada.

---

## O que fazer

Copie estes ficheiros para dentro da pasta `Boavista Garden`, ao lado das pastas
de imagens (substitua o `index.html` que já lá tem):

```
Boavista Garden/
├── index.html          ← substituir pelo novo
├── obrigado.html       ← novo
├── cp.svg              ← novo (logótipo Casa da Portela)
├── favicon.svg         ← novo
├── netlify.toml        ← novo
├── robots.txt          ← novo
├── sitemap.xml         ← novo
├── Imagens Exteriores/     (já tem)
├── Imagens Interiores/     (já tem)
├── Imagens Planta/         (já tem)
├── BOAVISTA_GARDEN_BROCHURA_PT&EN.pdf        (já tem)
└── BOAVISTA_GARDEN_TABELA_DE_PRECOS_PT.pdf   (já tem)
```

Depois faça duplo clique no `index.html` para ver o site no browser.

---

## Que fotografia foi para onde

Se alguma ficar no sítio errado, é normal — atribuí-as pelas miniaturas.
**Para trocar, não mexa nas fotografias: mexa no `index.html`** (abra com o
Bloco de Notas, procure o número, troque-o).

### Exteriores

| Ficheiro | Onde aparece |
|---|---|
| Portugues-9  | Localização — vista aérea |
| Portugues-13 | Galeria — terraços |
| **Portugues-17** | **Comparador "Duas Eras", lado esquerdo — tem de ser o PALACETE** |
| Portugues-21 | Arquitetura — coluna da esquerda (fica em formato vertical) |
| **Portugues-23** | **HERO — a primeira imagem do site** |
| Portugues-25 | Galeria — jardim |
| **Portugues-27** | **Comparador "Duas Eras", lado direito — tem de ser o EDIFÍCIO NOVO** |

Não estão a ser usadas: `-11`, `-15`, `-19`. Ficam disponíveis para trocas.

### Interiores

`-30` sala · `-32` cozinha · `-34` suite · `-36` sala de jantar ·
`-38` open space · `-40` quarto · `-462` palacete, vão em arco

Não estão a ser usadas: `-42`, `-44`.

### Plantas

Cada fração tem um botão **"Ver planta"**. Usei as versões **sem `(2)`**.

| Fração | Ficheiro | Fração | Ficheiro |
|---|---|---|---|
| A | BOAVISTADUPLEX_01 | J | BOAVISTA PENTHOUSE_08 |
| B | BOAVISTADUPLEX_02 | K | BOAVISTA PENTHOUSE_09 |
| C | BOAVISTADUPLEX_03 | L | BOAVISTA PENTHOUSE_13 |
| D | BOAVISTADUPLEX_04 | M | BOAVISTA PENTHOUSE_14 |
| E | BOAVISTADUPLEX_05 | H | BOAVISTA_15 |
| F | BOAVISTADUPLEX_06 | I | BOAVISTA_16 |
| G | BOAVISTADUPLEX_07 | N | PALACETE_10 |
|   |                   | O | PALACETE_11 |
|   |                   | P | PALACETE_12 |

Para corrigir: abra o `index.html`, procure por `var PLANTAS` (perto do fim) e
altere a linha da fração em causa. Para usar a versão `(2)`, escreva
`BOAVISTADUPLEX_01%20(2).png` — o `%20` é o espaço.

Os ficheiros `PISO-01`, `PISO-1` e `PISO-02` não estão a ser usados.

---

## Três coisas que podem correr mal

### 1. Converter os PNG para JPEG — a prioridade

O código já aponta para `.png`, por isso funciona já. Mas **PNG é o formato
errado para fotografia**: guarda a imagem sem qualquer perda, o que faz sentido
para logótipos e plantas com linhas, e é péssimo para renders. Um render que em
JPEG ocupa 300 KB pode ocupar 8 MB em PNG — a mesma imagem, indistinguível a
olho.

Com 16 imagens em PNG, a página pode facilmente passar dos 200 MB.

**Converta os exteriores e interiores para JPEG.** Em https://www.iloveimg.com/pt/converter-para-jpg
faz tudo de uma vez. Depois, comprima para 2000 px de largura e menos de 400 KB.

Os nomes dos ficheiros mantêm-se — só muda a extensão. E o site já tem uma rede
de segurança: se o `.png` não existir, tenta `.jpg` automaticamente. Ou seja,
**pode converter sem mexer numa única linha de código**.

**As plantas podem ficar em PNG.** São desenhos com linhas e texto: o PNG
mantém-nas nítidas e nesses casos até costuma ficar mais leve que o JPEG.

### 2. Maiúsculas e minúsculas (o erro mais traiçoeiro)

O Windows trata `Imagens Exteriores` e `imagens exteriores` como a mesma coisa.
**O Netlify não.** Ou seja: o site pode funcionar perfeitamente no seu
computador e aparecer sem imagens depois de publicado.

Confirme que as pastas se chamam exatamente:
`Imagens Exteriores` · `Imagens Interiores` · `Imagens Planta`

Se depois de publicar as imagens não aparecerem, é quase de certeza isto.

### 3. Peso das imagens

Este é o ponto que mais me preocupa. Renders em resolução máxima têm 5 a 15 MB
cada. Com 16 fotografias, a página pesa mais de 100 MB e demora quase um minuto
a abrir num telemóvel com dados móveis — que é como a maioria das pessoas vai
chegar ao site vindo do Instagram.

**Comprima antes de publicar.** Objetivo: 2000 px de largura, menos de 400 KB.
Sendo PNG, o primeiro passo é converter para JPEG (ver ponto 1) — é aí que está
a maior parte do ganho.

- Converter: https://www.iloveimg.com/pt/converter-para-jpg
- Comprimir e redimensionar: https://www.iloveimg.com/pt/comprimir-imagem
- Uma a uma, com mais controlo: https://squoosh.app (MozJPEG, qualidade 75)

Os nomes mantêm-se, por isso não há nada a alterar no código.

**A brochura tem 72 MB.** Comprima também: https://www.ilovepdf.com/pt/comprimir_pdf

---

## Publicar no GitHub e Netlify

**GitHub**
1. Conta em https://github.com → **New repository** → nome `boavista-garden` → **Public** → **Create**.
2. **uploading an existing file** → arraste o *conteúdo* da pasta (o `index.html` fica na raiz) → **Commit changes**.
3. O upload pelo navegador aceita 100 ficheiros de cada vez. Se precisar, faça em duas voltas.

**Netlify**
1. Conta em https://netlify.com → **Log in with GitHub**.
2. **Add new site → Import an existing project → GitHub** → escolha `boavista-garden`.
3. Deixe os campos de build vazios → **Deploy site**.
4. **Site configuration → Change site name** → `boavista-garden`.

**Ativar o formulário — sem isto não recebe contactos**

**Site configuration → Forms → Form notifications → Add notification → Email notification**
→ `mportela@casadaportela.pt` e o seu email.

Faça um envio de teste e confirme que chega. O plano gratuito dá 100 contactos/mês.

**Domínio próprio**

**Domain management → Add a domain** → `boavistagarden.casadaportela.pt`
No DNS de `casadaportela.pt`: `CNAME` · nome `boavistagarden` · valor `<o-seu-site>.netlify.app`

---

## Alterações futuras

No GitHub: abra o ficheiro → lápis → edite → **Commit changes**.
O Netlify republica sozinho em segundos.

Para trocar uma fotografia sem mexer no código, basta substituir o ficheiro
mantendo o nome.
