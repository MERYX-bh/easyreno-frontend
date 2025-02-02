describe('Login Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/connexion');
    cy.wait(1000); // Attendre 1 seconde pour s'assurer que la page est chargée
  });

  it('should display the login form', () => {
    cy.contains('Connexion').should('be.visible');
    cy.get('form').should('exist');
  });

  it('should fill out the form and submit successfully', () => {
    cy.get('input[name="Email"]').type('user@example.com'); // Remplacez par un email valide
    cy.get('input[name="Mot De Passe"]').type('Password123!'); // Remplacez par un mot de passe valide

    cy.get('button[type="submit"]').click();

    // Vérifiez que l'URL inclut la page d'accueil ou une page protégée après connexion
    cy.url().should('include', '/accueil'); // Modifiez selon votre logique d'application
  });

  it('should show error for invalid credentials', () => {
    cy.get('input[name="Email"]').type('invalid@example.com'); // Email invalide
    cy.get('input[name="Mot De Passe"]').type('WrongPassword!'); // Mot de passe invalide

    cy.get('button[type="submit"]').click();

    // Vérifiez que le message d'erreur s'affiche
    cy.contains('Identifiants invalides').should('be.visible'); // Modifiez selon votre message d'erreur
  });

  it('should navigate to the registration page', () => {
    cy.contains('Créer un compte').click(); // Lien vers la page d'inscription
    cy.url().should('include', '/inscription'); // Vérifiez que l'URL est celle de l'inscription
  });

  it('should disable submit button when required fields are empty', () => {
    cy.get('button[type="submit"]').should('be.disabled');

    // Remplir les champs requis
    cy.get('input[name="Email"]').type('user@example.com');

    // Vérifiez que le bouton est toujours désactivé
    cy.get('button[type="submit"]').should('be.disabled');

    cy.get('input[name="Mot De Passe"]').type('Password123!');

    // Vérifiez que le bouton n'est pas désactivé maintenant
    cy.get('button[type="submit"]').should('not.be.disabled');
  });
});
