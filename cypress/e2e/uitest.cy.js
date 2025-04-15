describe('dat',()=>{
    it('dat',()=>{

        cy.visit('https://www.dat.com/load-boards')
        cy.url().should('contain','dat.com/load-boards')
        cy.get('[class="nav-link  dropdown-toggle"]').eq(0).trigger('mouseover').click()
        cy.get('a[href="https://www.dat.com/load-boards"]').eq(0).click({force:true})
        cy.on('uncaught:exception',(err,runnable)=>{
            return false;
        })
        cy.contains('Combo').click()
        cy.contains('Select Broker/Carrier').parent().should('contain.text', '$260');


    })
})