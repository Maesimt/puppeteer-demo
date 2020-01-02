import puppeteer from 'puppeteer';
import Elements from './elements';
import waitForOneVisible from './waitForOneVisible';
import {GridSpots} from './grid';

const isVisible = async (page: any, selector: string) => {
  return await page.evaluate((input: string) => {
    const e = document.querySelector(input);
    if (!e)
      return false;
    const style = window.getComputedStyle(e);
    return style && style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
  }, selector);
};

const SetupNotCompletedError = new Error('You must run setup before using the player\'s method');

class Player {
  private browser: puppeteer.Browser;
  private page: puppeteer.Page;
  private readonly number: number;
  public readonly name: string;

  private constructor(number: number, name: string, browser: puppeteer.Browser, page: puppeteer.Page) {
    this.number = number;
    this.name = name;
    this.browser = browser;
    this.page = page;
  }
  
  static async create(name: string, number: number): Promise<Player> {
    const browser = await puppeteer.launch({headless: false, defaultViewport: null, slowMo: 200});
    const pages = await browser.pages();
    const page = pages[0];
    await page.goto('https://papergames.io/en/tic-tac-toe');
    
    return new Player(number, name, browser, page);;
  }

  click = async (target: Elements) => {
    await this.page.waitFor(target);
    await this.page.click(target);
  }

  type = async (text: string) => {
    await this.page.keyboard.type(text);
  }

  waitForNavigation = async () => {
    await this.page.waitForNavigation();
  }

  getTextFromInput = async (target: Elements): Promise<string> => {
    const node = await this.page.$(target);
    if (!node) {
      throw new Error(`Test scenario could not find a '${target}'.`);
    }
    return (await (await node.getProperty('value')).jsonValue() as string);
  }

  waitForAtLeastOne = async (target: Elements) => {
    await waitForOneVisible(this.page, target);
  }

  isVisible = async (target: Elements) => {
    return isVisible(this.page, target);
  }

  play = async (target: GridSpots) => {
    await this.page.click(target);
    await this.page.waitFor(1500);
  }

  navigatesTo = async (url: string) => {
    await this.page.goto(url);
  }

  getTextFromDiv = async (target: Elements): Promise<string>  => {
    const node = await this.page.$(target);
    if (!node) {
      throw new Error(`Test scenario could not find a '${target}'.`);
    }
    return (await (await node.getProperty('innerText')).jsonValue() as string);
  }

  getScore = async (): Promise<number> => {
    return parseInt(
      await this.getTextFromDiv(
        this.number === 1 ? Elements.playerOneScore : Elements.playerTwoScore
      ), 10);
  }

  close = async () => {
    await this.browser.close();
  }
}

export default Player;