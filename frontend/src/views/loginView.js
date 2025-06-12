const LoginView = {
  getTemplate: () => `
    <section class="auth-section">
      <div class="auth-card">
        <h1 class="title">Welcome Back</h1>
        <p class="subtitle">Login to your RedCV AI account</p>
        <input type="text" id="email" placeholder="Email" class="auth-input"/>
        <input type="password" id="password" placeholder="Password" class="auth-input" />
        <button id="btnLogin" class="auth-btn">Login</button>
        <p class="switch">Don't have an account? <a href="#/register">Register</a></p>
        <a href="#" class="back-link">← kembali</a>

      </div>
    </section>
  `
};

export default LoginView;