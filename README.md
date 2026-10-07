# Relcon — Site institucional

Site institucional estático (HTML, CSS e JavaScript puros), responsivo e sem dependências de build.

## Estrutura

```
index.html            Página única com todas as seções
assets/css/style.css  Estilos (cores da marca em :root)
assets/js/main.js     Menu mobile, animações, contadores e formulário
assets/img/logo.svg   Logo provisória (substitua pela oficial)
favicon.svg           Ícone da aba
```

Site da Relcon: soluções para empresas, incluindo meios de pagamento como parceira licenciada Cappta.

Seções: Início, Sobre (missão, visão e valores), Soluções (meios de pagamento Cappta + outras soluções Relcon), Como funciona, Diferenciais, Depoimentos, Contato e rodapé, além de botão flutuante de WhatsApp.

## Visualizar localmente

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```

## O que personalizar

- **Textos**: todos os textos em `index.html` são de exemplo — ajuste com as informações reais da Relcon.
- **Outras soluções Relcon**: substitua os cards "Solução 1–4" na seção `#servicos` pelos produtos próprios.
- **Soluções Cappta**: confira as descrições de POS, TEF, Pix/multiadquirência e conciliação com o portfólio oficial.
- **Cores**: variáveis `--primary`, `--primary-dark` e `--accent` no topo de `style.css`.
- **Logo**: substitua `assets/img/logo.svg` e `favicon.svg`.
- **Contato**: telefone, WhatsApp (`wa.me/55DDDNUMERO`), e-mail, endereço e CNPJ em `index.html`; e-mail do formulário em `CONTACT_EMAIL` no `main.js`.
- **Números do hero**: atributos `data-count` em `index.html`.

## Publicar no GitHub Pages

Em *Settings → Pages*, selecione a branch e a pasta `/ (root)`.
