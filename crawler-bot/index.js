import puppeteer from "puppeteer"
import dotenv from "dotenv"
import OpenAI from "openai"

dotenv.config();

(
   async () => {
    const browser = await puppeteer.launch({headless:false})
    const page = await browser.newPage();
    await page.goto("https://www.google.com", {waitUntil: "domcontentloaded"});
    const links = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('a')).map(link => ({
            text: link.innerText.trim(),
            href: link.href
        })).filter(link => link.text.length > 0);  // Remove empty links
    });
    console.log(links);
   }
)();