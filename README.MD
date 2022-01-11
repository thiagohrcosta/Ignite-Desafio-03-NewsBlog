![MainImg](https://res.cloudinary.com/dloadb2bx/image/upload/v1635994845/0ff8ac80-8026-11eb-8ed1-e8b77764fbcd_el3ft3.png)

## CAPÍTULO 03 - DESAFIO 01

Este repositório é composto pelo **desafio 01** do **capítulo 03**, da especialização em **ReactJS** ministrado pela **[ROCKETSEAT](https://www.rocketseat.com.br/)** em seu curso **IGNITE PRO**.

**Tecnologias utilizadas:** <br>![enter image description here](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![ ](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![enter image description here](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)


**Outras tecnologias utilizadas:**
- [Prismic](https://prismic.io/)

### Desafio:
Neste desafio foi exigido o desenvolvimento de um blog totalmente do zero utilizando como base o modelo do Fimga. A ideia seria criar um CMS de forma que o frontend se conectasse com a API do Prismic e devolvesse o conteúdo adicionado no CMS. Assim foi desenvolvido:

![Img](https://res.cloudinary.com/dloadb2bx/image/upload/v1641942983/eat_dxogtn.png)


- Index
	- Lista de todas as publicações adicionadas no CMS;
	- Cada publicação deve indicar o autor e a data em que foi publicado;
	- Foi adicionada paginação de forma que caso existam mais itens do que o limite fixado aparecerá "Carregar mais".

- Show
	- Cada publicação é acessada por sua página própria mediante o SLUG que funciona como um ID único;
	- Cada publicação deve indicar a data em que foi publicada, nome do autor e calcular o tempo médio de leitura;
	- É necessário ainda, retornar todo o conteúdo da publicação.

![enter image description here](https://res.cloudinary.com/dloadb2bx/image/upload/v1641943495/eat2_oupfka.png)

## Conexão com o Prismic

    services > prismic.ts

    import Prismic from  '@prismicio/client';
    import { DefaultClient } from  '@prismicio/client/types/client';

    export  function  getPrismicClient(req?:  unknown):  DefaultClient {
    const prismic = Prismic.client(process.env.PRISMIC_API_ENDPOINT, { req, accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    });
    return prismic;
    }

  ## Nota final
  ![enter image description here](https://res.cloudinary.com/dloadb2bx/image/upload/v1641944065/avaliacao_erhasa.png)

## Como rodar a aplicação?

Para rodar a aplicação baixe ou clone este repositório. Em seguida instale a pasta node_modules com o comando  `yarn install`. Ao final inicie a aplicação com  `yarn dev`  que será iniciada na porta  `localhost:3000`. Será necessário também adicionar as variáveis locais e suas respectivas chaves de sua conta no Prismic para puxar os conteúdos que lá estiverem adicionados.
