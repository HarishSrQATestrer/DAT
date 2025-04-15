describe('API Call & Response Validation', () => {
    it('Intercepts and validates POST request to sumome.com/services', () => {
      cy.visit('https://www.dat.com');
  
      cy.on('uncaught:exception', () => false);
  
      //  current ISO datetime
      const now = new Date();
      const today = now.toISOString().slice(0, 10);         // "2025-04-14"
      const currentTime = now.toISOString().slice(11, 19);  // "HH:MM:SS"
  
      cy.intercept('POST', 'https://sumome.com/services', (req) => {
        req.continue((res) => {
          const standards = res.body.shareService.display_rules;
  
          expect(standards).to.be.an('array');
  
          standards.forEach((rule, index) => {
            expect(rule).to.have.property('created_at');
            expect(rule).to.have.property('updated_at');
  
            const createdAt = rule.created_at;
            const updatedAt = rule.updated_at;
  
            // Log the full timestamps
            cy.log(`Rule #${index + 1}`);
            cy.log(`Created At: ${createdAt}`);
            cy.log(`Updated At: ${updatedAt}`);
  
            // Split into date and time
            const createdDate = createdAt.slice(0, 10);
            const createdTime = createdAt.slice(11, 19);
  
            const updatedDate = updatedAt.slice(0, 10);
            const updatedTime = updatedAt.slice(11, 19);
  
            // Validate date format
            expect(createdDate).to.match(/^\d{4}-\d{2}-\d{2}$/);
            expect(updatedDate).to.match(/^\d{4}-\d{2}-\d{2}$/);
  
            // Validate time format
            expect(createdTime).to.match(/^\d{2}:\d{2}:\d{2}$/);
            expect(updatedTime).to.match(/^\d{2}:\d{2}:\d{2}$/);
  
            // Validate today's date
            expect(createdDate).to.equal(today);
            expect(updatedDate).to.equal(today);
  
            // You can also validate it's near current time:
            // expect(createdTime).to.equal(currentTime);
            // expect(updatedTime).to.equal(currentTime);
          });
        });
      });
    });
  });
  