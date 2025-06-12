const RegisterView = {
  getTemplate: () => `
    <section class="auth-section">
      <div class="auth-card">
        <h1 class="title">Create Account</h1>
        <p class="subtitle">Join RedCV AI now</p>
        <input type="text" id="name" placeholder="Full Name" class="auth-input" />
        <input type="email" id="email" placeholder="Email address" class="auth-input" />
        <input type="password" id="password" placeholder="Password" class="auth-input" />
        <button id="btnRegister" class="auth-btn">Register</button>
        <p class="switch">Already have an account? <a href="#/login">Login</a></p>
      </div>
    </section>
  `
};

export default RegisterView;