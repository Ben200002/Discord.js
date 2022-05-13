const discord = require("discord.js");

module.exports.run = async (client, message ,args) => {
    var embed = new discord.MessageEmbed()
    .setTitle("Server info")
    .setDescription("This shows some server info")
    .setColor("GOLD")
    .addFields(
        {name:"Bot name", value:client.user.username},
        {name:"You joined the server on", value: message.member.joinedAt.toString()},
        {name:"Total members", value: message.guild.memberCount.toString()}
    );
    return message.channel.send({embeds: [embed]});
}

module.exports.help ={
    name: "serverInfo",
    category: "info",
    description: "This command is used to see the server info"
}