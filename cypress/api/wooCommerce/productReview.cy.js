import { faker } from '@faker-js/faker'
faker.locale = 'pt_BR'
import productReviewsFixture from '../../fixtures/productsReviews.json'
import tokenFixture from '../../fixtures/token.json'
import statusFixture from '../../fixtures/status.json'
import productReviewWooCommerceSchema from '../../contracts/productReview.contract'
import updateReviewWooCommerceSchema from '../../contracts/updateProductReview.contract'
import deleteProductReviewWooCommerceSchema from '../../contracts/deleteProductReview.contract'


describe('Products Reviews', () => {

  after('Clean database after all tests', () => {
    cy.cleanDatabase()
  })

  it('Create a Product Review - Aceitação', () => {
    const reviewer = faker.name.firstName()
    const reviewerEmail = faker.internet.email(reviewer)

    cy.postProductReviewWooCommerce(
      tokenFixture.token,
      productReviewsFixture.validProductReview.product_id,
      productReviewsFixture.validProductReview.review,
      reviewer,
      reviewerEmail,
      productReviewsFixture.validProductReview.rating
    ).then(({ status, body }) => {
      const reviewID = body.id
      expect(status).to.eq(statusFixture.created)
      expect(body.product_id).to.eq(productReviewsFixture.validProductReview.product_id)
      expect(body.review).to.eq(productReviewsFixture.validProductReview.review)
      expect(body.reviewer).to.eq(reviewer)
      expect(body.reviewer_email).to.eq(reviewerEmail)
      expect(body.rating).to.eq(productReviewsFixture.validProductReview.rating)
    })
  })

  it('Create a Product Review - Contrato', () => {
    const reviewer = faker.name.firstName()
    const reviewerEmail = faker.internet.email(reviewer)

    cy.postProductReviewWooCommerce(
      tokenFixture.token,
      productReviewsFixture.validProductReview.product_id,
      productReviewsFixture.validProductReview.review,
      reviewer,
      reviewerEmail,
      productReviewsFixture.validProductReview.rating
    ).then(({ status, body }) => {
      const reviewID = body.id
      expect(status).to.eq(statusFixture.created)
      return productReviewWooCommerceSchema.validateAsync(body)
    })
  })

  it('Edit a Product Review - Aceitação', () => {
    const reviewer = faker.name.firstName()
    const reviewerEmail = faker.internet.email(reviewer)

    cy.postProductReviewWooCommerce(
      tokenFixture.token,
      productReviewsFixture.validProductReview.product_id,
      productReviewsFixture.validProductReview.review,
      reviewer,
      reviewerEmail,
      productReviewsFixture.validProductReview.rating
    ).then(({ body }) => {
      const reviewID = body.id
      cy.putProductReviewWooCommerce(
        tokenFixture.token,
        productReviewsFixture.editProductReview.product_id,
        productReviewsFixture.editProductReview.review,
        reviewer,
        reviewerEmail,
        productReviewsFixture.editProductReview.rating,
        reviewID
      ).then(({ status, body }) => {
        expect(status).to.eq(statusFixture.ok)
        expect(body.product_id).to.eq(productReviewsFixture.editProductReview.product_id)
        expect(body.review).to.eq(productReviewsFixture.editProductReview.review)
        expect(body.reviewer).to.eq(reviewer)
        expect(body.reviewer_email).to.eq(reviewerEmail)
        expect(body.rating).to.eq(productReviewsFixture.editProductReview.rating)
        expect(body.id).to.eq(reviewID)
      })
    })
  })

  it('Edit a Product Review - Contrato', () => {
    const reviewer = faker.name.firstName()
    const reviewerEmail = faker.internet.email(reviewer)

    cy.postProductReviewWooCommerce(
      tokenFixture.token,
      productReviewsFixture.validProductReview.product_id,
      productReviewsFixture.validProductReview.review,
      reviewer,
      reviewerEmail,
      productReviewsFixture.validProductReview.rating
    ).then(({ body }) => {
      const reviewID = body.id
      cy.putProductReviewWooCommerce(
        tokenFixture.token,
        productReviewsFixture.editProductReview.product_id,
        productReviewsFixture.editProductReview.review,
        reviewer,
        reviewerEmail,
        productReviewsFixture.editProductReview.rating,
        reviewID
      ).then(({ status, body }) => {
        expect(status).to.eq(statusFixture.ok)
        return updateReviewWooCommerceSchema.validateAsync(body)
      })
    })
  })

  it('Delete a Product Review - Aceitação', () => {
    const reviewer = faker.name.firstName()
    const reviewerEmail = faker.internet.email(reviewer)

    cy.postProductReviewWooCommerce(
      tokenFixture.token,
      productReviewsFixture.validProductReview.product_id,
      productReviewsFixture.validProductReview.review,
      reviewer,
      reviewerEmail,
      productReviewsFixture.validProductReview.rating
    ).then(({ body }) => {
      const reviewID = body.id
      cy.deleteProductReviewWooCommerce(
        tokenFixture.token,
        reviewID,
        productReviewsFixture.deleteProductReview.force
      ).then(({ status, body }) => {
        expect(status).to.eq(statusFixture.ok)
        expect(body.deleted).to.eq(true)
        expect(body.previous.id).to.eq(reviewID)
        expect(body.previous.product_id).to.eq(productReviewsFixture.validProductReview.product_id)
        expect(body.previous.review).to.eq(productReviewsFixture.validProductReview.review)
        expect(body.previous.reviewer).to.eq(reviewer)
        expect(body.previous.reviewer_email).to.eq(reviewerEmail)
        expect(body.previous.rating).to.eq(productReviewsFixture.validProductReview.rating)
      })
    })
  })

  it('Delete a Product Review - Contrato', () => {
    const reviewer = faker.name.firstName()
    const reviewerEmail = faker.internet.email(reviewer)

    cy.postProductReviewWooCommerce(
      tokenFixture.token,
      productReviewsFixture.validProductReview.product_id,
      productReviewsFixture.validProductReview.review,
      reviewer,
      reviewerEmail,
      productReviewsFixture.validProductReview.rating
    ).then(({ body }) => {
      const reviewID = body.id
      cy.deleteProductReviewWooCommerce(
        tokenFixture.token,
        reviewID,
        productReviewsFixture.deleteProductReview.force
      ).then(({ status, body }) => {
        expect(status).to.eq(statusFixture.ok)
        return deleteProductReviewWooCommerceSchema.validateAsync(body)
      })
    })
  })

  it('List all Products Reviews - Contrato', () => {
    cy.getAllProductReviewWooCommerce(tokenFixture.token).then(({ status, body }) => {
      expect(status).to.eq(statusFixture.ok)
      for (let i = 0; i < body.length; i++) {
        cy.validarContrato(productReviewWooCommerceSchema, body[i])
      }
    })
  })
})