// import { REST, Routes } from 'discord.js';
const {REST, Routes} = require('discord.js');

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
];

const rest = new REST({ version: '10' }).setToken("MTI3NTcxMjAwNjU0MzkwMDY4NA.GkqF1f.Ry1fZRE1CMJVLGzJJA4ZOGSJcrwomlTI1THebM");

(async () => {
try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands("1275712006543900684"), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}
})();