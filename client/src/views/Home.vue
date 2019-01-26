<template>
  <div class="home">
    <div class="container">
      <form action class="form" onsubmit="return false">
        <h1 class="title"></h1>
        <input
          type="text"
          v-model="originLink"
          class="form__input"
          placeholder="Put there your origin url"
        >
        <div class="error" v-if="err">{{err}}</div>
        <button class="form__button" @click="handleConvertLink(originLink)">CONVERT</button>
        <div class="result">
          <p class="result__text">{{ shortLink || "There would your link appear"}}</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Api from "../Service/Api.js";

export default {
  name: "home",
  components: {},
  data() {
    return {
      originLink: "",
      shortLink: null,
      err: null
    };
  },
  methods: {
    async handleConvertLink(originLink) {
      try {
        this.err = null;
        if (originLink) {
          const { data } = await Api.convert(originLink);
          const { shortLink } = data;

          this.shortLink = shortLink;
        } else {
          this.error = "Your url is incorrect";
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
<style lang="scss">
.error {
  color: white;
  padding: 15px;
  background-color: red;
}

.result {
  padding: 15px;
  background-color: #2c3e50;

  &__text {
    text-align: center;
    color: #fff;
    font-size: 15px;
    letter-spacing: 1px;
    font-weight: 600;
  }
}

.form {
  background-color: #42b983;
  padding: 30px 40px;
  border-radius: 5px;
  max-height: 360px;
  max-width: 360px;
  width: 100%;
  height: 100%;

  box-shadow: 0px 0px 10px rgba(#000, 0.2);

  display: flex;
  flex-direction: column;

  &__input {
    padding: 15px;
    border: none;
    background-color: #2c3e50;
    margin-bottom: 15px;
    border-radius: 5px;

    color: #42b983;

    letter-spacing: 2px;
    font-weight: 500;

    &::placeholder {
      color: rgba(#42b983, 0.5);
    }
  }
  &__button {
    padding: 15px;
    border: none;
    background-color: #2c3e50;
    color: #fff;
    letter-spacing: 3px;
    margin-bottom: 15px;

    cursor: pointer;
  }
}

.container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}
</style>
