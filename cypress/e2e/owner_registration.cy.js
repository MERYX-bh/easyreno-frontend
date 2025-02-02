describe('OwnerRegistration Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/inscription-proprietaire');
    cy.wait(1000); 
  });

  it('should display the registration form', () => {
    cy.contains('Inscription Propriétaire').should('be.visible');
    cy.get('form').should('exist');
  });

  it('should fill out the form and submit successfully', () => {
    cy.get('input[name="Nom"]').type('Dupont');
    cy.get('input[name="Prenom"]').type('Jean');
    cy.get('input[name="Adresse"]').type('123 Rue de Paris');
    cy.get('input[name="Complement Adresse"]').type('Apt 4B');
    cy.get('input[name="Ville"]').type('Paris');
    cy.get('input[name="Code Postal"]').type('75001');
    cy.get('input[name="Email"]').type('jean.dupont@example.com');
    cy.get('input[name="Mot De Passe"]').type('Password123!');
    cy.get('input[name="Confirmation Mot De Passe"]').type('Password123!');
    cy.get('input[type="checkbox"]').check();

    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/confirmation');
  });

  it('should show error for mismatched passwords', () => {
    cy.get('input[name="Mot De Passe"]').type('Password123!');
    cy.get('input[name="Confirmation Mot De Passe"]').type('DifferentPassword123!');

    cy.contains('Les mots de passe ne correspondent pas').should('be.visible');
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('should show error for existing email', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('ownerEmail', 'existing@example.com');
    });

    cy.get('input[name="Email"]').type('existing@example.com');
    cy.get('input[name="Mot De Passe"]').type('Password123!');
    cy.get('input[name="Confirmation Mot De Passe"]').type('Password123!');
    cy.get('input[type="checkbox"]').check();
    cy.get('button[type="submit"]').click();

    cy.contains('Cet email est déjà utilisé.').should('be.visible');
  });

  it('should navigate to previous page', () => {
    cy.contains('Précédent').click();
    cy.url().should('eq', 'http://localhost:5173/');
  });

  it('should disable submit button when required fields are empty', () => {
    cy.get('button[type="submit"]').should('be.disabled');

    cy.get('input[name="Nom"]').type('Dupont');
    cy.get('input[name="Prenom"]').type('Jean');
    cy.get('input[name="Adresse"]').type('123 Rue de Paris');
    cy.get('input[name="Ville"]').type('Paris');
    cy.get('input[name="Code Postal"]').type('75001');
    cy.get('input[name="Email"]').type('jean.dupont@example.com');
    cy.get('input[name="Mot De Passe"]').type('Password123!');
    cy.get('input[name="Confirmation Mot De Passe"]').type('Password123!');

    cy.get('button[type="submit"]').should('be.disabled');

    cy.get('input[type="checkbox"]').check();

    cy.get('button[type="submit"]').should('not.be.disabled');
  });
});
