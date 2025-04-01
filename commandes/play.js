if (!downloadData || !downloadData.success) {
      return repondre('Failed to retrieve download URL from all sources. Please try again later.');
    }

    const downloadUrl = downloadData.result.download_url;
    const videoDetails = downloadData.result;

    // Prepare the message payload with external ad details
    const messagePayloads = [
      {
      caption: `\n*𝚻𝐘𝐋𝚯𝚪 𝚳𝐃 𝚩𝚯𝚻 AUDIOS*\n
╭┈┈┈⊷
┊ *Made:* in KENYA 
┊ *Quality:* High
┊ *Powered:* by 𝚻𝐘𝐋𝚯𝚪
╰┈┈┈┈┈┈┈┈┈┈┈┈┈⊷
🌐 *Bot Repo:* https://github.com/spartankix/spartan

> regards popkid`,
        video: { url: downloadUrl },
        mimetype: 'video/mp4',
        contextInfo: {
          externalAdReply: {
            title: conf.BOT,
            body: videoDetails.title,
            mediaType: 1,
            sourceUrl: conf.GURL,
            thumbnailUrl: firstVideo.thumbnail,
            renderLargerThumbnail: false,
            showAdAttribution: true,
          },
        },
      },
      {
      caption: `\n*POPKID XTECH AUDIOS*\n
╭┈┈┈⊷
┊ *Made:* in KENYA
┊ *Quality:* High
┊ *Powered:* by 𝚻𝐘𝐋𝚯𝚪
╰┈┈┈┈┈┈┈┈┈┈┈┈┈⊷
🌐 *Bot Repo:* https://github.com/spartankix/spartan

> regards tylor`,
        document: { url: downloadUrl },
        mimetype: 'video/mp4',
        contextInfo: {
          externalAdReply: {
            title: conf.BOT,
            body: videoDetails.title,
            mediaType: 1,
            sourceUrl: conf.GURL,
            thumbnailUrl: firstVideo.thumbnail,
            renderLargerThumbnail: false,
            showAdAttribution: true,
          },
        },
      }
    ];

    // Send the download link to the user
    for (const messagePayload of messagePayloads) {
      await zk.sendMessage(dest, messagePayload, { quoted: ms });
    }

  } catch (error) {
    console.error('Error during download process:', error);
    return repondre(`Download failed due to an error: ${error.message || error}`);
  }
});


// Command to upload image, video, or audio file
zokou({
  'nomCom': 'turl',       // Command to trigger the function
  'categorie': "download", // Command category
  'reaction': '👨🏿‍💻'    // Reaction to use on command
}, async (groupId, client, context) => {
  const { msgRepondu, repondre } = context;

  // If no message (image/video/audio) is mentioned, prompt user
  if (!msgRepondu) {
    return repondre("Please mention an image, video, or audio.");
  }

  let mediaPath;

  // Check if the message contains a video
  if (msgRepondu.videoMessage) {
    mediaPath = await client.downloadAndSaveMediaMessage(msgRepondu.videoMessage);
  }
 else if (msgRepondu.gifMessage) {
    mediaPath = await client.downloadAndSaveMediaMessage(msgRepondu.gifMessage);
  }
 else if (msgRepondu.stickerMessage) {
    mediaPath = await client.downloadAndSaveMediaMessage(msgRepondu.stickerMessage);
  }
else if (msgRepondu.documentMessage) {
    mediaPath = await client.downloadAndSaveMediaMessage(msgRepondu.documentMessage);
  }
  // Check if the message contains an image
  else if (msgRepondu.imageMessage) {
    mediaPath = await client.downloadAndSaveMediaMessage(msgRepondu.imageMessage);
  }
  // Check if the message contains an audio file
  else if (msgRepondu.audioMessage) {
    mediaPath = await client.downloadAndSaveMediaMessage(msgRepondu.audioMessage);
  } else {
    // If no media (image, video, or audio) is found, prompt user
    return repondre("Please mention an image, video, or audio.");
  }

  try {
    // Upload the media to Catbox and get the URL
    const fileUrl = await uploadToCatbox(mediaPath);

    // Delete the local media file after upload
    fs.unlinkSync(mediaPath);

    // Respond with the URL of the uploaded file
    repondre(fileUrl);
  } catch (error) {
    console.error("Error while creating your URL:", error);
    repondre("Oops, there was an error.");
  }
});
