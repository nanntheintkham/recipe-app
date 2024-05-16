<script lang="ts">
  import { userStore } from '../stores/userStore';
  import type { User } from '../types/User';

  let user: User | null = null;

  // Subscribe to the user store to get the current user's data
  userStore.subscribe(($user) => {
    user = $user;
  });

  // Function to handle logging out
  function logout() {
    userStore.logout();
    // Redirect to the login page or home page after logout
  }
</script>

<style>
  .user-profile {
    padding: 2rem;
    max-width: 400px;
    margin: auto;
  }

  .profile-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .logout-button {
    padding: 0.5rem 1rem;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .logout-button:hover {
    background-color: #c82333;
  }

  .favorites-list,
  .meal-plans-list {
    list-style: none;
    padding: 0;
  }

  .favorites-list li,
  .meal-plans-list li {
    margin-bottom: 1rem;
  }
</style>

<div class="user-profile">
  <div class="profile-header">
    <h2>{user?.username || 'Guest'}</h2>
    <button class="logout-button" on:click={logout}>Logout</button>
  </div>
  {#if user}
    <h3>Favorites</h3>
    <ul class="favorites-list">
      {#each user.favorites as favoriteUri}
        <li>{favoriteUri}</li>
      {/each}
    </ul>
    <h3>Meal Plans</h3>
    <ul class="meal-plans-list">
      {#each user.mealPlans as mealPlan}
        <li>{mealPlan.date}</li>
      {/each}
    </ul>
  {:else}
    <p>Please log in to view your profile.</p>
  {/if}
</div>
