import puppeteer from 'puppeteer';
import Grid from './engine/cells';
import waitForOneVisible from './engine/waitForOneVisible';

const delay = async (time: number) => {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time * 1000)
  });
};

const isVisible = async (page: any, selector: string) => {
  return await page.evaluate((input: string) => {
    const e = document.querySelector(input);
    if (!e)
      return false;
    const style = window.getComputedStyle(e);
    return style && style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
  }, selector);
};

const run = async () => {
  const browser = await puppeteer.launch({headless: false, defaultViewport: null, slowMo: 200});
  const pages = await browser.pages();
  const page = pages[0];
  await page.goto('https://papergames.io/en/tic-tac-toe');

  // Cliquer dans un input, obtenir le focus puis ecrire dedans.
  await page.click('#username');
  await page.keyboard.type('IA-Demo-1');

  // Cliquer sur un bouton qui navigue. (Link/a)
  await page.click('.fa.fa-user');
  await page.waitForNavigation();

  // Extraire le texte d'un div pour le secret code. (div text = innerText)
  const nodeSecretCode = await page.$('.secret-code > div > strong');
  if (!nodeSecretCode) {
    throw new Error('Test scenario could not find a "Secret Code Node".');
  }
  const secretCode = (await (await nodeSecretCode.getProperty('innerText')).jsonValue());
  
  // Extraire le texte d'un div pour obtenir l'adresse public. (input text = value)
  const nodePublicUrl = await page.$('.public-link > input');
  if (!nodePublicUrl) {
    throw new Error('Test scenario could not find a "Public Url Node".');
  }
  const publicUrl = (await (await nodePublicUrl.getProperty('value')).jsonValue() as string);
  //Debugging purpose.... activate or not logging.

  // Demarrer un autre client. 
  const browser2 = await puppeteer.launch({headless: false, defaultViewport: null, slowMo: 50});
  const pages2 = await browser2.pages();
  const page2 = pages2[0];
  await page2.goto(publicUrl);

  // Cliquer dans un input, obtenir le focus puis ecrire dedans.
  await page2.click('#username');
  await page2.keyboard.type('IA-Demo-2');

  // Cliquer sur un bouton play qui navigue sur la page pour jouer.
  await page2.click('.btn.btn-success.join-button');

  // Wait for a triangle showing who is first player to be displayed.
  await waitForOneVisible(page, '.player > user > div.triangle');

  // Determine who is first. who has a triangle on his plate.
  let startingPlayer;
  let otherPlayer;

  const isPlayer1TriangleVisibile = await isVisible(page, '.player-one > user > div.triangle');

  if (isPlayer1TriangleVisibile) {
    startingPlayer = page;
    otherPlayer = page2;
  } else {
    startingPlayer = page2;
    otherPlayer = page;
  }

  // Define the game options. (Class);
  const grid = new Grid();

  // Start playing !!! --- Loop
  await startingPlayer.click(grid.random());
  await delay(3);
  // check if end game detected...

  await otherPlayer.click(grid.random());
  await delay(3);
  // check if end game detected...

  await startingPlayer.click(grid.random());
  await delay(3);
  // check if end game detected...

  await otherPlayer.click(grid.random());
  await delay(3);
  // check if end game detected...

  await startingPlayer.click(grid.random());
  await delay(3);
  // check if end game detected...

  await otherPlayer.click(grid.random());
  await delay(3);
  // check if end game detected...

  await startingPlayer.click(grid.random());
  await delay(3);
  // check if end game detected...

  await otherPlayer.click(grid.random());
  await delay(3);
  // check if end game detected...

  await startingPlayer.click(grid.random());
  await delay(3);
  
};

run();

