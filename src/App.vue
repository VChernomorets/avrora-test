<template>
    <router-view />
</template>

<script>

export default {
  name: 'App',
  components: {

  },
}
</script>

<style lang="scss">
@import "~normalize-scss/sass/normalize";
@include normalize();

@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

#app {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  min-height: 100vh;
  max-width: 1920px;
  margin: 0 auto;
  *{
    box-sizing: border-box;
  }
  .wrapper{
    position: relative;
    height: 100vh;
    display: flex;
    flex-direction: column;
    .content, .header {
      flex: 1 0 auto;
    }
    .footer{
      flex: 0 0 auto;
    }
  }
}

.input {
  &__wrapper {
    width: 100%;
    height: 50px;
    padding: 13px;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    display: flex;
    align-items: center;
    input {
      font-size: 14px;
      // line-height: 16px;
      background: transparent;
      box-shadow: none;
      border: none;
      outline: none;
      width: 100%;
      &::placeholder {
      }
    }
  }
  &__image {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin-right: 14px;
  }
  &__label {
    font-size: 14px;
    line-height: 16px;

    margin-left: 53px;
    margin-bottom: 3px;
    text-align: left;
  }
}

.button {
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
  cursor: pointer;
  border: none;
  transition: $duration-animation-base;
  padding: 16px 0;
  &-max-content {
    width: max-content;
  }
  &:hover {
  }
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
body{
  background-color: #F7F7F7;
}
</style>

