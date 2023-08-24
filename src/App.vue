<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/classes">Items</router-link> |
    <router-link to="/teacherclasses">Teacher Classes</router-link> |
  </nav>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.titulo {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  margin: 20px;
  padding: 20px;
  border: 3px solid #8ee1dd;
  box-sizing: border-box;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
}

form {
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: auto;
}
.classesDisplay {
  border: 3px solid #8ee1b7;
}

.titulo {
  font-size: 18px;
  margin: auto;
  padding: 20px;
  border: 3px solid lightblue;
  /* max-width: 500px; */
  /* width: 100%; */
  box-sizing: border-box;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  height: 100%;
  // max-height: 500px;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
}
</style>
