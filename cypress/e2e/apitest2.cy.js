describe('API Call & Response Validation', () => {
    it('Intercepts and filters display_rules with "industry trend" and extracts IDs', () => {
      cy.visit('https://www.dat.com');
  
      cy.on('uncaught:exception', () => false);
  
      cy.intercept('POST', 'https://sumome.com/services', (req) => {
        req.continue((res) => {
          const rules = res.body.shareService.display_rules;
  
          expect(rules).to.be.an('array');
  
          const trendRules = rules.filter(rule =>
            JSON.stringify(rule).toLowerCase().includes('industry trend')
          );
  
          cy.log(`Found ${trendRules.length} rule(s) with 'industry trend'`);
  
          trendRules.forEach((rule, index) => {
            expect(rule).to.have.property('id');
  
            cy.log(`Trend Rule #${index + 1} - ID: ${rule.id}`);
            console.log(`Rule ID: ${rule.id}`, rule); 
  
            expect(rule.id).to.match(/^[a-zA-Z0-9\-_]+$/); 
          });
        });
      });
    });
  });
  