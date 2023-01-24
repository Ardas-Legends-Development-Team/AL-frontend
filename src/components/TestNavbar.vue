<template>
  <header>
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <a class="btn btn-primary normal-case text-xl">
          <p>
            <router-link to="/">Go to Home</router-link>
          </p>
        </a>
      </div>
      <div class="flex-none gap-2">
        <div class="form-control">
          <input
            type="text"
            placeholder="Search"
            class="input input-bordered"
          />
        </div>
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <img src="https://placeimg.com/80/80/people/sepia" alt="avatar" />
          </label>
          <ul
            tabindex="0"
            class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a class="justify-between">
                Profile
                <span class="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "TestNavbar",
};
</script>

<style scoped></style>
