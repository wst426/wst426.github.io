import fs from "fs";
import path from "path";
import { promisify } from "util";
import { exec } from "child_process";
import { marked } from "marked";

const md_dir = path.resolve(__dirname, "posts");
const html_dir = path.resolve(__dirname, "src", "html");
const css_dir = path.resolve(__dirname, "src", "css");
const docs_dir = path.resolve(__dirname, "docs");
const execute = promisify(exec);
const post = (name: string, md: string) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name}</title>
</head>
<body>
    ${md}
</body>
</html>
`;

const process_html = async () => {
    const filenames = fs.readdirSync(md_dir);
    for (const filename of filenames) {
        const buf = await fs.promises.readFile(path.resolve(md_dir, filename));
        const md = await marked.parse(buf.toString(), { async: true });
        await fs.promises.writeFile(
            path.resolve(docs_dir, filename.replace(".md", ".html")),
            post(filename.split('.').slice(0, -1).reduce((pre, cur) => pre + cur), md)
        );
    }
    await fs.promises.copyFile(path.resolve(html_dir, "index.html"), path.resolve(docs_dir, "index.html"));
}

const process_js = async () => {
    await execute("yarn rollup --config rollup.config.js");
}

const process_css = async () => {
    const filenames = fs.readdirSync(css_dir);
    for (const filename of filenames) {
        await fs.promises.copyFile(path.resolve(css_dir, filename), path.resolve(docs_dir, filename));
    }
}

const main = async () => {
    console.log("Start build...");
    await process_html();
    await process_css();
    await process_js();
}

main()