const botConfig = require("../botConfig.json");
module.exports.run = async (client, message ,args) => {
    try{
        var prefix = botConfig.prefix;
        var respone = "**Bot commands**\r\n\n";
        var general = "**__General__**\r\n";
        var info = "\n**__Info__**\r\n";
        client.commands.forEach(command => {
            switch(command.help.category) {
                case "general":
                    general += `${prefix}${command.help.name} - ${command.help.description}\r\n`;
                    break;
                case "info":
                    info += `${prefix}${command.help.name} - ${command.help.description}\r\n`;
                    break;
            }
        });
        respone += general += info;

        message.author.send(respone).then(() => {
            return message.reply("Alle commands kan je vinden in je prive berichten.");
        }).catch(()=>{
            return message.reply("Je prive berichten zijn uitgeschakeld je hebt dus geen bericht ontvangen.");
        })
    }catch(error){
        message.reply("Something went wrong while performing this command")
    }
}

module.exports.help ={
    name: "help",
    category: "info",
    description: "This command is used to see this menu"
}