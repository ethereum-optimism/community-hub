<template>
  <span v-html="included"></span>
</template>

<script>
// var md = require('markdown-it')()

export default {
  name: "VuePressVersioning",
  data: () => {return {"included": 
     `blah <b>yada</b> **bold** ${3+5}`}}
}
/*
const axios = require("axios");
const cmp = require("semver-compare");
const loc = require("vuepress/package.json");
const src =
  "https://raw.githubusercontent.com/vuejs/vuepress/master/lerna.json";
export default {
  name: "VuePressVersioning",
  data() {
    return { 
      loc,
      raw: null
    };
  },
  computed: {
    upToDate() {
      return cmp(this.loc.version, this.raw.version);
    }
  },
  async beforeMount() {
    try {
      let res = await axios.get(src);
      this.$data.raw = res.data;      
    } catch (error) {
      console.err(e)
    }
  }
};
*/
</script>
