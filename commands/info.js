const discord = require("discord.js");

module.exports.run = async (client, message ,args) => {
    var embed = new discord.MessageEmbed()
    .setTitle("Title")
    .setDescription("Description")
    .setColor("GOLD")
    .addField("Bot naam", client.user.username)
    .setTimestamp()

    return message.channel.send({embeds: [embed]});
}

module.exports.help ={
    name: "info",
    category: "info",
    description: "This command is used to see the bot info"
}