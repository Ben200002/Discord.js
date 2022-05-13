const { Client,Intents, Collection } = require('discord.js');
const botConfig = require("./botConfig.json");
const fs = require("fs");


const client = new Client({intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith(".js"));
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.help.name, command);
    console.log(`File ${command.help.name}.js has been loaded`)
}
client.once("ready", () => {
    console.log(`${client.user.username} is online`)
    client.user.setActivity("Prefix: ! ", {type: "WATCHING"})
});

client.on("guildMemberAdd", member => {
    var role = member.guild.roles.cache.get("969701303708155905");
    if(!role) return;
    member.roles.add(role);
    var channel = member.guild.channels.cache.get("969703753689215016");
    if(!channel) return;
    channel.send(`User ${member} has joined`);
    var channel2 = member.guild.channels.cache.get(botConfig.welcome);
    if(!channel2) return;
    channel2.send(`User ${member} has joined`);
})

client.on("messageCreate", async message => {

    if(message.author.bot) return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    if(!message.content.startsWith(prefix)) return;
    const commandData = client.commands.get(command.slice(prefix.length));

    if(!commandData) return;
    var arguments = messageArray.slice(1);
    try{
        await commandData.run(client, message, arguments);
    }catch(error){
        console.log(error)
        await message.reply("Sorry there was a issue while trying this command");
    }

})

client.login(botConfig.token);