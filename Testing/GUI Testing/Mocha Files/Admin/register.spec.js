// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('register', function() {
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
  it('register', async function() {
    // Test name: register
    // Step # | name | target | value
    // 1 | open | /api/login | 
    await driver.get("https://staff-grid.vercel.app/api/login")
    // 2 | setWindowSize | 1552x880 | 
    await driver.manage().window().setRect({ width: 1552, height: 880 })
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
    // 8 | click | css=.hamburger | 
    await driver.findElement(By.css(".hamburger")).click()
    // 9 | click | css=.role-specific | 
    await driver.findElement(By.css(".role-specific")).click()
    // 10 | click | id=name | 
    await driver.findElement(By.id("name")).click()
    // 11 | type | id=name | Jeet5
    await driver.findElement(By.id("name")).sendKeys("Jeet5")
    // 12 | click | id=mail | 
    await driver.findElement(By.id("mail")).click()
    // 13 | type | id=mail | kira80605@gmail.com
    await driver.findElement(By.id("mail")).sendKeys("kira80605@gmail.com")
    // 14 | click | id=role | 
    await driver.findElement(By.id("role")).click()
    // 15 | select | id=role | label=Employee
    {
      const dropdown = await driver.findElement(By.id("role"))
      await dropdown.findElement(By.xpath("//option[. = 'Employee']")).click()
    }
    // 16 | click | css=.submitbut | 
    await driver.findElement(By.css(".submitbut")).click()
    // 17 | click | css=.logout | 
    await driver.findElement(By.css(".logout")).click()
  })
})
