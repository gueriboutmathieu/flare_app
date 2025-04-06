# Meri

Your loyal companion, helping you stay organized and remember what truly matters.

Meri is a little web app with only 1 button.
You can say two kinds of sentences to it:

- `statement`: Meri will remember it, example: `I need to buy some eggs at the store today.`
- `question`: Meri will search for a statement that best answers your question, example: `What do I need to buy to the store today ?`

In order to use it, you need to self-host the [server](https://github.com/gueriboutmathieu/meri_server.git).

## Setup

Install dependencies:

```bash
pnpm install
```

## Run locally

You need to create a `.env` file with these values:

```
NUXT_PUBLIC_OPENAI_API_KEY=<your-openai-api-key>
NUXT_PUBLIC_OPENAI_STT_MODEL=<openai-stt-model>
NUXT_PUBLIC_OPENAI_TTS_MODEL=<openai-tts-model>
```

Start the development server on `http://localhost:3000`:

```shell
pnpm dev
```

## License

This project is licensed under the GNU General Public License v3.0 (GPL v3).
You are free to use, modify, and distribute this software, as long as any distributed version is also licensed under GPLv3.
This software is provided "as is", without warranty of any kind.
See the [LICENSE](LICENSE) file for more details.
