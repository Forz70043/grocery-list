<script>
  import { register } from "$lib/auth.js";
  import { setUser } from "../../store/user.js";
  import { goto } from "$app/navigation";

  let email = "";
  let password = "";
  let error = "";

  async function handleRegister() {
    try {
      const data = await register(email, password);
      setUser({ email: data.user.email, token: data.token });
      goto("/");
    } catch (err) {
      error = err.message;
    }
  }
</script>

<main>
  <h1>Register</h1>
  <input placeholder="Email" bind:value={email} />
  <input placeholder="Password" type="password" bind:value={password} />
  <button on:click={handleRegister}>Register</button>
  {#if error}<p class="error">{error}</p>{/if}
</main>
