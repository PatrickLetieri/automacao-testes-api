import tokenFixture from '../../../fixtures/token.json'
import productReviewsFixture from '../../../fixtures/productsReviews.json'

Cypress.Commands.add('validarContrato', function (contrato, response) {
    return contrato.validateAsync(response)
})

Cypress.Commands.add('cleanDatabase', function () {
    cy.getAllProductReviewWooCommerce(
        tokenFixture.token
    ).then(({ status, body }) => {
        const array = body
        expect(status).to.eq(200)
        array.forEach(element => {
            if (element.product_id == productReviewsFixture.validProductReview.product_id) {

                cy.deleteProductReviewWooCommerce(
                    tokenFixture.token,
                    element.id,
                    productReviewsFixture.deleteProductReview.force
                )
            }
        })
    })
})

