import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function createServer() {
    const app = express()
    const resolve = (p) => path.resolve(__dirname, p)

    const vite = await (await import('vite')).createServer({
        server: { middlewareMode: true },
        appType: 'custom',
    })

    app.use(vite.middlewares)

    app.use('*', async (req, res, next) => {
        const url = req.originalUrl

        try {
            let template = fs.readFileSync(resolve('index.html'), 'utf-8')
            template = await vite.transformIndexHtml(url, template)

            const { render } = await vite.ssrLoadModule('/src/entry-server.jsx')

            const appHtml = await render(url)

            const html = template.replace('<!--ssr-outlet-->', appHtml)

            res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
        } catch (e) {
            vite.ssrFixStacktrace(e)
            next(e)
        }
    })

    app.listen(5173, () => {
        console.log('http://localhost:5173')
    })
}

createServer()
