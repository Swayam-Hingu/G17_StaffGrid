// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('announcement', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').usingServer('http://localhost:4444/wd/hub').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('announcement', async function() {
    // Test name: announcement
    // Step # | name | target | value
    // 1 | open | https://staff-grid.vercel.app/api/login | 
    await driver.get("https://staff-grid.vercel.app/api/login")
    // 2 | setWindowSize | 1552x832 | 
    await driver.manage().window().setRect(1552, 832)
    // 3 | click | id=id | 
    await driver.findElement(By.id("id")).click()
    // 4 | type | id=id | 2024000001
    await driver.findElement(By.id("id")).sendKeys("2024000001")
    // 5 | click | id=password | 
    await driver.findElement(By.id("password")).click()
    // 6 | type | id=password | R123456
    await driver.findElement(By.id("password")).sendKeys("R123456")
    // 7 | click | css=.login-btn | 
    await driver.findElement(By.css(".login-btn")).click()
    // 8 | click | css=.pro | 
    await driver.findElement(By.css(".pro")).click()
    // 9 | click | name=message | 
    await driver.findElement(By.name("message")).click()
    // 10 | type | name=message | Meeting At 4pm at my office
    await driver.findElement(By.name("message")).sendKeys("Meeting At 4pm at my office")
    // 11 | click | name=specificEmployeeId | 
    await driver.findElement(By.name("specificEmployeeId")).click()
    // 12 | click | css=.radio-label:nth-child(5) > input | 
    await driver.findElement(By.css(".radio-label:nth-child(5) > input")).click()
    // 13 | click | name=rangeStart | 
    await driver.findElement(By.name("rangeStart")).click()
    // 14 | type | name=rangeStart | 20240
    await driver.findElement(By.name("rangeStart")).sendKeys("20240")
    // 15 | click | name=rangeOption | 
    await driver.findElement(By.name("rangeOption")).click()
    // 16 | click | name=specificEmployeeId | 
    await driver.findElement(By.name("specificEmployeeId")).click()
    // 17 | click | name=specificEmployeeId | 
    await driver.findElement(By.name("specificEmployeeId")).click()
    // 18 | click | css=.radio-label:nth-child(6) > input | 
    await driver.findElement(By.css(".radio-label:nth-child(6) > input")).click()
    // 19 | click | css=.announcement-submitbuttonn | 
    await driver.findElement(By.css(".announcement-submitbuttonn")).click()
    // 20 | click | css=.tab | 
    await driver.findElement(By.css(".tab")).click()
    // 21 | click | css=.announcements-list | 
    await driver.findElement(By.css(".announcements-list")).click()
  })
})