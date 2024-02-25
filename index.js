const { Client, IntentsBitField } = require("discord.js");
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

let listaNomes = [
  "wellytotoso",
  "A L V O R A D A",
  "Carol Luanett",
  "Hatsu",
  "Shødai",
  "Soul Eater#RxSup",
  "aline",
  "Panama7",
  "I Love Sinon",
  "Persephone",
  "tetsu",
  "kiyotaka",
  "CNPJ HENRIQUE",
  "pitzin",
  "duduzn",
  "CNPJ KOREANOH",
  "Geiso#2311",
  "mart1nni",
  "k0da",
  "CNPJ LUXANNA#lol",
  "Te amo Sup",
  "bomel",
  "Seeyun",
  "uNyc",
  "Teteu",
  "femboyzinho",
  "yuumi fofinha",
  "Jujupiter",
  "samyyy",
  "Surprise NG",
  "DWG Deft",
  "Geisa#1306",
  "KAWAIKAMI",
  "KATAK",
  "KtorZ",
  "Jeanne",
  "BARONESA",
  "anticristo",
  "don",
  "Pizzaylo",
];
let listaReservas = [];

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (message) => {
    if (message.content.toLowerCase().startsWith("!meta")) {
      const username = message.content.toLowerCase().substring(6);

    if (listaNomes.includes(username)) {
      let indiceUsuario = listaNomes.indexOf(username) + 1;

      message.channel
        .send(
          `${message.author} já foi adicionado à lista de **melhores** antes. Seu número é o **${indiceUsuario}**.`
        )
        .then((botMessage) => {
          setTimeout(() => {
            botMessage.delete();
          }, 5000);
        });
      message.delete();
    } else if (listaReservas.includes(username)) {
      let indiceUsuario = listaReservas.indexOf(username) + 1;

      message.channel
        .send(
          `${message.author} já foi adicionado(a) à lista de **reservas** antes. Seu número é o **${indiceUsuario}**.`
        )
        .then((botMessage) => {
          setTimeout(() => {
            botMessage.delete();
          }, 5000);
        });
      message.delete();
    } else if (listaNomes.length < 40) {
      listaNomes.push(username);
      let indiceUsuario = listaNomes.indexOf(username) + 1;

      message.channel
        .send(
          `${message.author} foi adicionado(a) à lista de **melhores** com o número **${indiceUsuario}**.`
        )
        .then((botMessage) => {
          setTimeout(() => {
            botMessage.delete();
          }, 5000);
        });
      message.delete();
    } else if (listaReservas.length < 20) {
      listaReservas.push(username);
      let indiceUsuario = listaReservas.indexOf(username) + 1;

      message.channel
        .send(
          `${message.author} foi adicionado(a) à lista de **reservas** com o número **${indiceUsuario}**.`
        )
        .then((botMessage) => {
          setTimeout(() => {
            botMessage.delete();
          }, 5000);
        });
      message.delete();
    } else {
      message.channel
        .send(`Desculpe, a lista principal e a lista de reservas estão cheias.`)
        .then((botMessage) => {
          setTimeout(() => {
            botMessage.delete();
          }, 5000);
        });
      message.delete();
    }
  }

  if (message.content.toLowerCase() === "!melhores") {
    message.delete();
    if (listaNomes.length > 0) {
      let listaNumerada = listaNomes.map(
        (nome, index) => `${index + 1}. ${nome}`
      );
      message.channel.send(
        `**Lista dos Melhores:**\n${listaNumerada.join("\n")}`
      );
    } else {
      message.channel.send("A lista está vazia.").then((botMessage) => {
        setTimeout(() => {
          botMessage.delete();
        }, 5000);
      });
    }
  }

  if (message.content.toLowerCase() === "!reservas") {
    if (listaReservas.length > 0) {
      let reservas = listaReservas.map(
        (nome, index) => `${index + 1}. ${nome}`
      );
      message.channel.send(`**Lista dos Reservas:**\n${reservas.join("\n")}`);
    } else {
      message.channel
        .send("A lista de reservas está vazia.")
        .then((botMessage) => {
          setTimeout(() => {
            botMessage.delete();
          }, 5000);
        });
      message.delete();
    }
  }

  if (message.content.toLowerCase() === "!reset") {
    if (message.member.permissions.has("KICK_MEMBERS")) {
      listaNomes = [];
      listaReservas = [];
      message.channel
        .send("As listas foram redefinida com sucesso.")
        .then((botMessage) => {
          setTimeout(() => {
            botMessage.delete();
          }, 5000);
        });
      message.delete();
    } else {
      message
        .reply("Você não manda em nada aqui seu nerd.")
        .then((botMessage) => {
          setTimeout(() => {
            botMessage.delete();
          }, 5000);
        });
      message.delete();
    }
  }

  if (message.content.toLowerCase() === "!sorteio") {
    if (message.member.permissions.has("KICK_MEMBERS")) {
      function embaralharIndex(arrayLength) {
        const indexes = Array.from({ length: arrayLength }, (_, i) => i);
        for (let i = indexes.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
        }
        return indexes;
      }

      const embaralhados = embaralharIndex(listaNomes.length);

      function divideEmGrupos(array, tamanhoGrupo) {
        const grupos = [];
        for (let i = 0; i < array.length; i += tamanhoGrupo) {
          grupos.push(array.slice(i, i + tamanhoGrupo));
        }
        return grupos;
      }

      const gruposDeIndices = divideEmGrupos(embaralhados, 5);
      const times = gruposDeIndices.map((grupo) =>
        grupo.map((index) => listaNomes[index])
      );
      times.forEach((grupo, index) => {
        message.channel.send(`**Time ${index + 1}:**\n${grupo.join("\n")}`);
      });
    } else {
      message.channel
        .send("Você não tem permissão para usar este comando.")
        .then((botMessage) => {
          setTimeout(() => {
            botMessage.delete();
          }, 5000);
        });
    }
  }

  if (message.content.toLowerCase() === "!limpar") {
    if (message.member.permissions.has("MANAGE_MESSAGES")) {
      async function limparChat() {
        try {
          const messages = await message.channel.bulkDelete(100);
          const botMessage = await message.channel.send(
            `O chat foi limpo. Esta mensagem será removida em breve.`
          );
          setTimeout(() => {
            botMessage.delete();
          }, 5000);
        } catch (error) {
          console.error("Ocorreu um erro ao limpar o chat:", error);
        }
      }

      limparChat();
    } else {
      message.channel
        .send("Você não tem permissão para limpar o chat.")
        .then((botMessage) => {
          setTimeout(() => {
            botMessage.delete();
          }, 5000);
        })
        .catch((error) =>
          console.error("Ocorreu um erro ao enviar a mensagem:", error)
        );
    }
  }
});

client.login(
  "ODA1NzM3MjU2MjMyODEyNTQ2.G1Jn7G.R7Z56b1tz11VUllgfjlrP39Vr5bIkAyXLFnV14"
);
