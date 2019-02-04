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
        <input
          type="text"
          v-model="timeLimit"
          class="form__input"
          placeholder="Times link will be visited"
        >
        <div class="error" v-if="err">{{err}}</div>
        <button class="form__button" @click="handleConvertLink(originLink)">CONVERT</button>
        <div class="result">
          <p class="result__text" v-if="!shortLink">"There would your link appear"</p>
          <a
            v-else
            class="result__text result__text_done"
            :href="`https://zabcode-dynamic-dlzkqlv7g.now.sh/${shortLink}`"
            :style="{'color': '#f81ce5'}"
          >{{ `https://zabcode-dynamic-dlzkqlv7g.now.sh/${shortLink}`}}</a>
        </div>
        <div class="github">
          <div class="github__icon"></div>
          <a class="github__link" href="https://github.com/zabozlaev">https://github.com/zabozlaev</a>
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
      timeLimit: 1,
      shortLink: null,
      err: null
    };
  },
  methods: {
    handleConvertLink(originLink) {
      Api.convert({ url: this.originLink, visitLimit: this.timeLimit })
        .then(({ data: { shortLink } }) => {
          this.shortLink = shortLink;
          return shortLink;
        })
        .then(shortLink => {
          const el = document.createElement("textarea"); // Create a <textarea> element
          el.value = shortLink; // Set its value to the string that you want copied
          el.setAttribute("readonly", ""); // Make it readonly to be tamper-proof
          el.style.position = "absolute";
          el.style.left = "-9999px"; // Move outside the screen to make it invisible
          document.body.appendChild(el); // Append the <textarea> element to the HTML document
          const selected =
            document.getSelection().rangeCount > 0 // Check if there is any content selected previously
              ? document.getSelection().getRangeAt(0) // Store selection if found
              : false; // Mark as false to know no selection existed before
          el.select(); // Select the <textarea> content
          document.execCommand("copy"); // Copy - only works as a result of a user action (e.g. click events)
          document.body.removeChild(el); // Remove the <textarea> element
          if (selected) {
            // If a selection existed before copying
            document.getSelection().removeAllRanges(); // Unselect everything on the HTML document
            document.getSelection().addRange(selected); // Restore the original selection
          }
        })
        .catch(e => console.log(e));
    }
  }
};
</script>
<style lang="scss">
.github {
  display: flex;
  justify-content: center;
  padding: 15px;

  &__icon {
    background-image: url("https://cdn3.iconfinder.com/data/icons/sociocons/256/github-sociocon.png");
    background-size: 50px 50px;
    width: 50px;
    height: 50px;
  }
  &__link {
    color: #1c75bb;
    padding: 15px;
    font-size: 15px;
    letter-spacing: 2px;
  }
}
.error {
  color: white;
  padding: 15px;
  background-color: red;
}

.result {
  padding: 15px;
  background-color: #fff;
  border-radius: 5px;

  &__text {
    text-align: center;
    color: #000;
    font-size: 15px;
    letter-spacing: 1px;
    font-weight: 600;
    &_done {
      letter-spacing: 1px;
      line-height: 25px;
    }
  }
}

.form {
  background-color: #000;
  padding: 30px 40px;
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
    background-color: #fff;
    margin-bottom: 15px;

    color: #f81ce5;

    letter-spacing: 2px;
    font-weight: 500;

    &::placeholder {
      color: rgba(#f81ce5, 0.5);
    }
    &:focus {
      outline: none;
    }
  }
  &__button {
    padding: 15px;
    border: none;
    background-color: #fff;
    color: #000;
    letter-spacing: 3px;
    margin-bottom: 15px;

    cursor: pointer;
    border-radius: 5px;

    transition: all 0.1s linear;

    &:hover {
      color: #f81ce5;
      border-radius: 3px;
      box-shadow: 0 0 10px rgba(#000, 0.2);
    }
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
