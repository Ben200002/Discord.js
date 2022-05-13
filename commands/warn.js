const fs = require("fs");
const discord = require("discord.js");
const botConfig = require("../botConfig.json");
module.exports.run = async (client, message, args) => {
    if (!message.member.permissions.has("KICK_MEMBERS")) return message.reply(`you do not have the premissions needed for this command`);
    if (!args[0]) return message.reply(`you have to put in a user`);
    if (!args[1]) return message.reply(`you have to put in a reason`);
    var warnUser = message.guild.members.cache.get(message.mentions.users.first().id || message.guild.members.get(args[0]).id);
    var reason = args.slice(1).join(" ");
    if (!warnUser) return message.reply("Sorry i can't find that user");
    if (warnUser.permissions.has("MANAGE_MESSAGES")) return message.reply("Sorry but you can't warn a staff member");
    const warns = JSON.parse(fs.readFileSync('./warnings.json'));
    if (!warns[warnUser.id]) warns[warnUser.id] = {
        warns: 0
    }
    warns[warnUser.id].warns++;

    var embed = new discord.MessageEmbed()
        .setColor("#ff0000")
        .setFooter(message.member.displayName, message.author.displayAvatarURL)
        .setTimestamp()
        .setDescription(`**Warned:** ${warnUser.user.username} (${warnUser.id})
            **Warn by:** ${message.author}
            **Reason: ** ${reason}`)
        .addField("Amount of warnings", warns[warnUser.id].warns.toString());
    const channel = message.member.guild.channels.cache.get(botConfig.warningChannel);
    if (!channel) return console.log("No warning channel found pls enter a channel in the botConfig.json file");
    channel.send({
        embeds: [embed]
    });
    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err);
    })
}

module.exports.help = {
    name: "warn",
    category: "general",
    description: "This command warns people"
}