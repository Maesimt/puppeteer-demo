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
  page: puppeteer.Page | null = null;
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  setup = async () => {
    const browser = await puppeteer.launch({headless: false, defaultViewport: null, slowMo: 200});
    const pages = await browser.pages();
    this.page = pages[0];
    await this.page.goto('https://papergames.io/en/tic-tac-toe');
  }

  click = async (target: Elements) => {
    if (!this.page) {
      throw SetupNotCompletedError;
    }
    await this.page.click(target);
  }

  type = async (text: string) => {
    if (!this.page) {
      throw SetupNotCompletedError;
    }
    await this.page.keyboard.type(text);
  }

  waitForNavigation = async () => {
    if (!this.page) {
      throw SetupNotCompletedError;
    }
    await this.page?.waitForNavigation();
  }

  getTextFromInput = async (target: Elements): Promise<string> => {
    if (!this.page) {
      throw SetupNotCompletedError;
    }
    const nodePublicUrl = await this.page.$(target);
    if (!nodePublicUrl) {
      throw new Error(`Test scenario could not find a '${target}'.`);
    }
    return (await (await nodePublicUrl.getProperty('value')).jsonValue() as string);
  }

  waitForAtLeastOne = async (target: Elements) => {
    await waitForOneVisible(this.page, target);
  }

  isVisible = async (target: Elements) => {
    return isVisible(this.page, target);
  }

  play = async (target: GridSpots) => {
    if (!this.page) {
      throw SetupNotCompletedError;
    }
    await this.page.click(target);
    await this.page.waitFor(1500);
  }

  navigatesTo = async (url: string) => {
    if (!this.page) {
      throw SetupNotCompletedError;
    }
    await this.page.goto(url);
  }
}

export default Player;