<script>
  import { goto } from "$app/navigation";
  import { registerUser } from "$lib/auth";

  let name = "";
  let username = "";
  let email = "";
  let password = "";
  let confirmPassword = "";
  let error = "";
  let success = "";

  async function handleRegister() {
    error = "";
    success = "";

    if (password !== confirmPassword) {
      error = "Passwords do not match.";
      return;
    }

    try {
      await registerUser(name, username, email, password);
      success = "Account created successfully! Redirecting...";
      setTimeout(() => goto("/login"), 1500);
    } catch (err) {
      error = "Registration failed. Please try again.";
    }
  }
</script>

<div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
  <div class="w-full max-w-md p-8 bg-gray-800/60 backdrop-blur rounded-2xl shadow-xl border border-gray-700">
    <h1 class="text-3xl font-bold text-emerald-400 mb-6 text-center">Create Account</h1>

    {#if error}
      <p class="text-red-500 text-center mb-4">{error}</p>
    {/if}

    {#if success}
      <p class="text-emerald-400 text-center mb-4">{success}</p>
    {/if}

    <form on:submit|preventDefault={handleRegister} class="space-y-4">
      <div>
        <label for="name" class="block text-gray-300 mb-1 text-sm">Name</label>
        <input
          type="text"
          bind:value={name}
          required
          class="w-full p-3 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
      </div>

      <div>
        <label for="username" class="block text-gray-300 mb-1 text-sm">Username</label>
        <input
          type="text"
          bind:value={username}
          required
          class="w-full p-3 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
      </div>

      <div>
        <label for="email" class="block text-gray-300 mb-1 text-sm">Email</label>
        <input
          type="email"
          bind:value={email}
          required
          class="w-full p-3 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
      </div>

      <div>
        <label for="password" class="block text-gray-300 mb-1 text-sm">Password</label>
        <input
          type="password"
          bind:value={password}
          required
          class="w-full p-3 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
      </div>

      <div>
        <label for="confirmPassword" class="block text-gray-300 mb-1 text-sm">Confirm Password</label>
        <input
          type="password"
          bind:value={confirmPassword}
          required
          class="w-full p-3 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
      </div>

      <button
        type="submit"
        class="w-full py-3 mt-4 bg-emerald-500 hover:bg-emerald-600 text-gray-900 font-semibold rounded-lg shadow transition-all"
      >
        Register
      </button>

      <p class="text-gray-400 text-center text-sm mt-4">
        Already have an account?
        <a href="/login" class="text-emerald-400 hover:underline">Login</a>
      </p>
    </form>
  </div>
</div>
