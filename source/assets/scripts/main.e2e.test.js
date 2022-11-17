import {strict as assert} from "node:assert";
import {describe, it, beforeEach, afterEach} from "mocha";
import puppeteer from "puppeteer-core";
import { exit } from "node:process";

describe("test App end to end", async () => {

	let browser;
	let page;

	before(async () => {
		browser = await puppeteer.launch();
		page = await browser.newPage();
		try{
			await page.goto("http://localhost:8080", {timeout: 1000});
		}
		catch (error) {
			console.log("❌ failed to connect to localhost webserver on port 8080");
			exit(1);
		}
	});

	it("page should have correct title", async () => {
		assert.strictEqual(await page.title(), "Food Journal");
	});

	it("test create review functinality", async () => {
		
	});

	it("test read review functinality", async () => {
		
	});

	it("test update review functinality", async () => {
		
	});

	it("test delete review functinality", async () => {
		
	});

	after(async () => {
		await page.close();
		await browser.close();
	});
});