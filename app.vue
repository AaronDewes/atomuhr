<template>
  <div>
    <main>
      <div>
        <div class="time">{{ localizedTime }}</div>
        <h1>atomuhr.vercel.app</h1>
        <div class="links">
          <a class="button" href="https://github.com/AaronDewes"
            >See who created this</a
          >
          <a class="button" href="https://github.com/AaronDewes/atomuhr">
            Star us on GitHub
          </a>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getServerDate } from '@/assets/js/serverDate'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'

export default defineComponent({
  computed: {
    localizedTime() {
      if (!this.date) return ''
      return format(this.date, 'ppp', { locale: de })
    },
  },
  data() {
    return {
      interval: null,
      date: new Date(),
      offset: 0,
    }
  },
  head() {
    return {
      title: this.date ? format(this.date, 'pp', { locale: de }) : "Atomuhr",
    }
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  async created() {
    this.startInterval()
    if (process.browser) {
      const { date, offset, uncertainty } = await getServerDate()
      console.log(
        `The server's date is ${date} +/- ${uncertainty} milliseconds.`
      )
      this.offset = offset
    }
  },
  methods: {
    startInterval() {
      this.interval = setInterval(() => {
        this.date = new Date(Date.now() + this.offset)
      }, 200)
    },
  },
})
</script>

<style lang="scss">
:root {
  --color-primary: #ff9f61;
  --color-primary-light: #ffecdf;
  --color-dark: #332013;
  --color-light: #fff;
  --color-gradient: radial-gradient(
    129.55% 129.55% at 6.6% 2.7%,
    #ffe897 0%,
    #ff4820 100%
  );
  --transition: all 0.15s ease-in-out;
  --border-radius: 0.25rem;
}

html {
  font-family: Open Sans, Helvetica Neue, Arial, sans-serif;
  font-size: 16px;
  box-sizing: border-box;
  color: var(--color-dark);
  line-height: 1.75;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

body {
  background: radial-gradient(
    129.55% 129.55% at 6.6% 2.7%,
    rgba(255, 232, 151, 0.3) 0%,
    rgba(255, 72, 32, 0.3) 100%
  );
}

main {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  @media screen and (max-width: 40rem) {
    width: calc(100% - 4rem);
    margin: 2rem;
  }
}

h1 {
  opacity: 0.9;
  font-weight: normal;
  font-size: 1.2rem;
  margin: 0;
  letter-spacing: 6px;
  @media screen and (max-width: 15rem) {
    font-size: 1rem;
  }
}

.links {
  margin: 4rem 0 0 0;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-content: stretch;
  align-items: flex-start;
  @media screen and (max-width: 40rem) {
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-content: stretch;
    align-items: stretch;
  }
}

.button {
  display: inline-block;
  padding: 1rem 1.5rem;
  border-radius: var(--border-radius);
  transition: var(--transition);
  background: var(--color-primary);
  color: var(--color-light);
  text-decoration: none;
  font-weight: bold;
  letter-spacing: 1px;
  border: 2px solid var(--color-primary);
  @media screen and (max-width: 40rem) {
    margin: 0 0 2rem 0;
  }
  &:hover {
    background: var(--color-primary-light);
    color: var(--color-dark);
  }
}

.time {
  font-family: 'Roboto Mono', sans-serif;
  font-size: 4rem;
  line-height: 1;
  @media screen and (max-width: 40rem) {
    font-size: 2rem;
  }
}
</style>
