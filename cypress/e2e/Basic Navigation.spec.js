describe("Basic Navigation", () => {
  it("tests Basic Navigation", () => {
    cy.visit("http://localhost:3333/AL-frontend/user_dashboard");
    cy.get("button").click();
    cy.get("header img").click();
    cy.get("li:nth-of-type(2) > a > a").click();
    cy.get("li:nth-of-type(1) svg").click();
    cy.get("main > div > div:nth-of-type(2) img").click();
    cy.visit("http://localhost:3333/AL-frontend/lists");
    cy.get("main > div > div:nth-of-type(1) img").click();
    cy.visit("http://localhost:3333/AL-frontend/lists");
    cy.get("div:nth-of-type(3) img").click();
    cy.get("div:nth-of-type(7) figure").click();
    cy.get("div:nth-of-type(1) > h1").click();
    cy.get("div:nth-of-type(3) > h1").click();
    cy.get("div.flex-row > div:nth-of-type(2)").click();
    cy.get("li:nth-of-type(2) > a > a").click();
    cy.get("main > div > div:nth-of-type(1) p").click();
    cy.visit("http://localhost:3333/AL-frontend/applications");
    cy.get("main > div > div:nth-of-type(2) img").click();
    cy.get("li:nth-of-type(3) > a > a").click();
    cy.get("button").click();
    cy.get("header img").click();
    cy.get("#app > div > div button").click();
  });
});
