//command created by LMS5413 (Comando criado por LMS5413)
//If possible leave the credits to help me! (Se possivel deixe os creditos para me ajudar!
//Do not reposition this code if you will not suffer the consequences (Não reposte esse codigo se nao sofrerá as consequencias)
client.on('raw' , async dados => {
  if (dados.t !== "MESSAGE_REACTION_ADD" && dados.t !== "MESSAGE_REACTION_REMOVE") return
  if (dados.d.message_id != "message_id") return

  if (dados.t === "MESSAGE_REACTION_ADD") {
    if (dados.d.emoji.id === "emoji_Id") { //if you use unicode emoji change id to name

      let guild = client.guilds.cache.get(dados.d.guild_id)
      const everyone = guild.id
      const channel = guild.channels.cache.get(dados.d.channel_id)
      const member = guild.members.cache.get(dados.d.user_id);
      if (guild.channels.cache.find(({name}) => name == 'support-' + member.id)) return;
      channel.messages.fetch(dados.d.message_id).then(m => m.reactions.resolve('emoji_name or emoji_id').users.remove(member.id)) //if the person reacts he will remove the reaction
      guild.channels.create(`support-${member.id}`, { //we are creating a channel where the ticket goes

        type: "text",
        permissionOverwrites: [
          {
            id: everyone,
            deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
          },
          {
            id: member,
            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
          },
        ]

      })
    }
  }
}) //end of code :)