<template>
  <div>
    <main>
      <div>
        <div class="time">{{ currentTime }}</div>
        <h1>{{ host }}</h1>
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

<script lang="ts" setup>
import { defineComponent } from 'vue'
import { getServerDate } from '~~/assets/js/serverDate'
import { format } from 'date-fns'

const date = ref(new Date())
const interval = ref<number | null>(null)
const offset = ref(null)

const currentTime = computed(() => {
  if (!date.value) return ''
  return format(date.value, 'ppp')
})

const host = ref('atomuhr.vercel.app')
onMounted(() => {
  host.value = window.location.host
})

useHead({
  title: computed(() => {
    if (!date.value) return ''
    return format(date.value, 'pp')
  }),
})
onBeforeUnmount(() => {
  clearInterval(interval.value)
})
const config = useRuntimeConfig()

onMounted(async () => {
  startInterval()
  const { date, offset: serverOffset, uncertainty } = await getServerDate()
  console.log(`The server's date is ${date} +/- ${uncertainty} milliseconds.`)
  offset.value = serverOffset
})

function startInterval() {
  interval.value = window.setInterval(() => {
    date.value = new Date(Date.now() + offset.value)
  }, 200)
}
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
