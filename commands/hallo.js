module.exports.run = async (client, message ,args) => {
    return message.channel.send("Hallo")
}

module.exports.help ={
    name: "hallo",
    category: "general",
    description: "This command says Hallo"
}