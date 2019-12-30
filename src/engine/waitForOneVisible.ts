// source: https://github.com/puppeteer/puppeteer/issues/4356

/** Internal method to determine if an elementHandle is visible on the page. */
const _isVisible = async(page: any, elementHandle: any) => await page.evaluate((el: any) => {
  if (!el || el.offsetParent === null) {
    return false;
  }

  const style = window.getComputedStyle(el);
  return style && style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
}, elementHandle);

/**
 * Checks if an element with selector exists in DOM and is visible.
 * @param {*} page
 * @param {*} selector CSS Selector.
 * @param {*} timeout amount of time to wait for existence and visible.
 */
const waitForOneVisible = async(page: any, selector: string, timeout=30000) => {
  const startTime = new Date();
  try {
    await page.waitForSelector(selector, { timeout: timeout });
    // Keep looking for the first visible element matching selector until timeout
    while (true) {
      const els = await page.$$(selector);
      for(const el of els) {
        if (await _isVisible(page, el)) {
          console.log(`PASS Check visible : ${selector}`);
          return el;
        }
      }
      if ((new Date()).getTime() - startTime.getTime() > timeout) {
        throw new Error(`Timeout after ${timeout}ms`);
      }
      page.waitFor(50);
    }
  } catch (e) {
    console.log(e);
    console.log(`FAIL Check visible : ${selector}`);
    return false;
  }
};

export default waitForOneVisible;