const validEmail = 'erdem.guntay@wit.com.tr'
const validPassword = 'Guclu.Sifre123'
const invalidEmail = 'erdem@wit'
const invalidPassword = '1234'

const emailErrorMessage = 'Lütfen geçerli bir email adresi girin.'
const passwordErrorMessage =
  'Şifre en az 8 karakter olmalı; büyük harf, küçük harf, rakam ve özel karakter içermeli.'

const getEmail = () => cy.get('[data-cy="email-input"]')
const getPassword = () => cy.get('[data-cy="password-input"]')
const getTerms = () => cy.get('[data-cy="terms-input"]')
const getButton = () => cy.get('[data-cy="submit-button"]')
const getErrors = () => cy.get('[data-cy^="error-"]')

describe('Login formu', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('a) Başarılı form doldurulduğunda', () => {
    it('submit edebiliyorum ve success sayfası açılıyor', () => {
      getEmail().type(validEmail)
      getPassword().type(validPassword)
      getTerms().check()

      getErrors().should('not.exist')
      getButton().should('be.enabled').click()

      cy.location('pathname').should('eq', '/success')
      cy.get('[data-cy="success-page"]').should('be.visible')
    })
  })

  describe('b) Hatalı durumlarda', () => {
    it('email yanlış: 1 hata mesajı var, mesaj doğru, buton disabled', () => {
      getEmail().type(invalidEmail)

      getErrors().should('have.length', 1)
      cy.get('[data-cy="error-email"]').should('have.text', emailErrorMessage)
      getButton().should('be.disabled')
    })

    it('email ve password yanlış: 2 hata mesajı var, password hata mesajı görünüyor', () => {
      getEmail().type(invalidEmail)
      getPassword().type(invalidPassword)

      getErrors().should('have.length', 2)
      cy.get('[data-cy="error-password"]').should('have.text', passwordErrorMessage)
      getButton().should('be.disabled')
    })

    it('email ve password doğru ama şartlar kabul edilmedi: buton disabled', () => {
      getEmail().type(validEmail)
      getPassword().type(validPassword)

      getTerms().should('not.be.checked')
      getButton().should('be.disabled')
    })
  })
})
