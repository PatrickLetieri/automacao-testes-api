Cypress.Commands.add('getAllProductReviewWooCommerce', function (token) {
    cy.request({
        method: "GET",
        url: Cypress.env("wooCommerce") + Cypress.env("productsReviews"),
        headers: {
            Authorization: token
        }
    })
})

Cypress.Commands.add('postProductReviewWooCommerce', function (token, product_id, review, reviewer, reviewer_email, rating) {
    cy.request({
        method: "POST",
        url: Cypress.env("wooCommerce") + Cypress.env("productsReviews"),
        headers: {
            Authorization: token,
            ContentType: "application/json"
        },
        body: {
            "product_id": product_id,
            "review": review,
            "reviewer": reviewer,
            "reviewer_email": reviewer_email,
            "rating": rating
        }
    })
})

Cypress.Commands.add('putProductReviewWooCommerce', function (token, product_id, review, reviewer, reviewer_email, rating, id) {
    cy.request({
        method: "PUT",
        url: Cypress.env("wooCommerce") + Cypress.env("productsReviews") + "/" + id,
        headers: {
            Authorization: token,
            ContentType: "application/json"
        },
        body: {
            "product_id": product_id,
            "review": review,
            "reviewer": reviewer,
            "reviewer_email": reviewer_email,
            "rating": rating
        }
    })
})

Cypress.Commands.add('deleteProductReviewWooCommerce', function (token, id, force) {
    cy.request({
        method: "DELETE",
        url: Cypress.env("wooCommerce") + Cypress.env("productsReviews") + "/" + id + "?force=" + force,
        headers: {
            Authorization: token
        }
    })
})