const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const moment = require('moment-timezone');
const colors = require('colors');
const fs = require('fs');

const client = new Client({
    restartOnAuthFail: true,
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    },
    ffmpeg: './ffmpeg.exe',
    authStrategy: new LocalAuth({ clientId: "client" }),
    webVersionCache: {
        type: "remote",
        remotePath:
            "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
    }
});
const config = require('./config/config.json');

client.on('qr', (qr) => {
    console.log(`[${moment().tz(config.timezone).format('HH:mm:ss')}] Scan kode QR berikut : `);
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.clear();
    const consoleText = './config/console.txt';
    fs.readFile(consoleText, 'utf-8', (err, data) => {
        if (err) {
            console.log(`[${moment().tz(config.timezone).format('HH:mm:ss')}] Console Text not found!`.yellow);
            console.log(`[${moment().tz(config.timezone).format('HH:mm:ss')}] ${config.name} is Ready!`.green);
        } else {
            console.log(data.green);
            console.log(`[${moment().tz(config.timezone).format('HH:mm:ss')}] ${config.name} is Ready!`.green);
        }
    });
});

client.on('message', async (message) => {
    const isGroups = message.from.endsWith('@g.us') ? true : false;
    if ((isGroups && config.groups) || !isGroups) {

        // Image to Sticker (Auto && Caption)
        if ((message.type == "image" || message.type == "video" || message.type == "gif") || (message._data.caption == `${config.prefix}sticker`)) {
            client.sendMessage(message.from, "*[⏳]* Ok, Bentar..");
            try {
                const media = await message.downloadMedia();
                client.sendMessage(message.from, media, {
                    sendMediaAsSticker: true,
                    stickerName: config.name, // Sticker Name = Edit in 'config/config.json'
                    stickerAuthor: config.author // Sticker Author = Edit in 'config/config.json'
                }).then(() => {
                    client.sendMessage(message.from, "*[✅]* Tuh, Berhasil!");
                });
            } catch {
                client.sendMessage(message.from, "*[❎]* Gagal, Coba Kirim Lagi!");
            }

            // Image to Sticker (With Reply Image)
        } else if (message.body == `${config.prefix}sticker`) {
            const quotedMsg = await message.getQuotedMessage();
            if (message.hasQuotedMsg && quotedMsg.hasMedia) {
                client.sendMessage(message.from, "*[⏳]* Ok, Bentar..");
                try {
                    const media = await quotedMsg.downloadMedia();
                    client.sendMessage(message.from, media, {
                        sendMediaAsSticker: true,
                        stickerName: config.name, // Sticker Name = Edit in 'config/config.json'
                        stickerAuthor: config.author // Sticker Author = Edit in 'config/config.json'
                    }).then(() => {
                        client.sendMessage(message.from, "*[✅]* Tuh, Berhasil!");
                    });
                } catch {
                    client.sendMessage(message.from, "*[❎]* Gagal, Coba Kirim Lagi!");
                }
            } else {
                client.sendMessage(message.from, "*[❎]* Balas Foto Terlebih Dahulu!");
            }

            // Sticker to Image (Auto)
        } else if (message.type == "sticker") {
            client.sendMessage(message.from, "*[⏳]* Ok, Bentar..");
            try {
                const media = await message.downloadMedia();
                client.sendMessage(message.from, media).then(() => {
                    client.sendMessage(message.from, "*[✅]* Tuh, Berhasil!");
                });
            } catch {
                client.sendMessage(message.from, "*[❎]* Gagal, Coba Kirim Lagi!");
            }

            // Sticker to Image (With Reply Sticker)
        } else if (message.body == `${config.prefix}image`) {
            const quotedMsg = await message.getQuotedMessage();
            if (message.hasQuotedMsg && quotedMsg.hasMedia) {
                client.sendMessage(message.from, "*[⏳]* Ok, Bentar..");
                try {
                    const media = await quotedMsg.downloadMedia();
                    client.sendMessage(message.from, media).then(() => {
                        client.sendMessage(message.from, "*[✅]* Tuh, Berhasil!");
                    });
                } catch {
                    client.sendMessage(message.from, "*[❎]* Gagal, Coba Kirim Lagi!");
                }
            } else {
                client.sendMessage(message.from, "*[❎]* Balas Sticker Terlebih Dahulu!");
            }

            // Claim or change sticker name and sticker author
        } else if (message.body.startsWith(`${config.prefix}change`)) {
            if (message.body.includes('|')) {
                let name = message.body.split('|')[0].replace(message.body.split(' ')[0], '').trim();
                let author = message.body.split('|')[1].trim();
                const quotedMsg = await message.getQuotedMessage();
                if (message.hasQuotedMsg && quotedMsg.hasMedia) {
                    client.sendMessage(message.from, "*[⏳]* Ok, Bentar..");
                    try {
                        const media = await quotedMsg.downloadMedia();
                        client.sendMessage(message.from, media, {
                            sendMediaAsSticker: true,
                            stickerName: name,
                            stickerAuthor: author
                        }).then(() => {
                            client.sendMessage(message.from, "*[✅]* Tuh, Berhasil!");
                        });
                    } catch {
                        client.sendMessage(message.from, "*[❎]* Gagal, Coba Kirim Lagi!");
                    }
                } else {
                    client.sendMessage(message.from, "*[❎]* Balas Sticker Terlebih Dahulu!");
                }
            } else {
                client.sendMessage(message.from, `*[❎]* Run the command :\n*${config.prefix}change <name> | <author>*`);
            }

            // Read chat
        } else {
            client.getChatById(message.id.remote).then(async (chat) => {
                await chat.sendSeen();
            });
        }
    }
});

client.initialize();
