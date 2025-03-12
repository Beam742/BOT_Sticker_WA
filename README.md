# StickerWhatsAppBOT

<p align="center">

<svg
xmlns="http://www.w3.org/2000/svg"
width="24"
height="24"
viewBox="0 0 24 24"
fill="none"
stroke="#000000"
stroke-width="2"
stroke-linecap="round"
stroke-linejoin="round"

>   <rect x="3" y="11" width="18" height="10" rx="2" />
>   <circle cx="12" cy="5" r="2" />
>   <path d="M12 7v4" />
>   <line x1="8" y1="16" x2="8" y2="16" />
>   <line x1="16" y1="16" x2="16" y2="16" />
> </svg>

## Description

This is a simple WhatsApp bot that converts images, videos, and GIFs into stickers. The bot can be used in both group and personal chats. The bot is built using the `whatsapp-web.js` library and can be run on any platform that supports Node.js.

## Features

- Convert images, videos, and GIFs into stickers.

- Can be used in both group and personal chats.

## Installation

To install the bot, follow these steps:

1. Clone the repository: `git clone https://github.com/Beam742/BOT_Sticker_WA.git`

2. Install the dependencies: `npm install`

3. Run the bot: `npm start`

## Usage

To use the bot, simply send an image, video, or GIF to the bot and it will convert it into a sticker. You can also use the following commands:

- `!sticker` - Convert the image, video, or GIF into a sticker.

## Configuration

The bot can be configured using the `config.json` file. The following options are available:

- `name` - The name of the bot.

- `author` - The author of the bot.

- `prefix` - The prefix for the bot commands.

- `timezone` - The timezone for the bot.

- `groups` - Whether the bot can be used in groups.

## ⚙️ Configuration

Edit `config.json` to customize your bot:

```json
{
  "name": "StickerBOT",
  "author": "Your Name",
  "prefix": "!",
  "timezone": "Asia/Jakarta",
  "groups": true
}
```

| Option   | Description                          |
| -------- | ------------------------------------ |
| name     | Bot's name (appears on stickers)     |
| author   | Creator's name (appears on stickers) |
| prefix   | Command prefix (e.g., !sticker)      |
| timezone | Bot's timezone                       |
| groups   | Enable/disable group functionality   |

## 🔧 Troubleshooting

### Common Issues:

1. **FFmpeg errors**

   - Ensure ffmpeg is properly installed
   - Check path configuration in your OS

2. **Authentication Issues**

   - Check `.wwebjs_auth/` folder permissions
   - For Linux: `chmod -R 755 .wwebjs_auth/`

3. **Session Issues**
   - Don't delete `.wwebjs_auth/` folder
   - Ensure proper read/write permissions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Made with ❤️ by Beam742
