<template>
  <div class="container">
    <label for="name">Name: {{ name }}</label>
    <input type="text" v-model="name" placeholder="Name" id="name" /> <br>
    <label for="surname">Surname: {{ surname }}</label>
    <input type="text" v-model="surname" placeholder="Surname" id="surname" /> <br>
    <label for="email">E-mail: {{ email }}</label>
    <input type="email" v-model="email" placeholder="email" id="email" /> <br>
    <label for="birthday">Birthday: {{ birthday }}</label>
    <input type="date" v-model="birthday" placeholder="birthday" id="birthday" /> <br>
    <label for="myLevel">Your English Level: {{ myLevel }}</label>
    <select id="myLevel">
      <option value="{{ opt.level }}" v-for="(opt, i) in option" :key="i">{{ opt.level }}</option>
    </select> <br>
    <label for="courseLevel">Course English Level: {{ myLevel }}</label>
    <select id="myLevel">
      <option value="{{ opt.level }}" v-for="(opt, i) in option" :key="i">{{ opt.level }}</option>
    </select>
    <br>
  </div>
</template>

<script>export default {
  name: 'ContactForm',
  data () {
    return {
      option: [
        {
          level: 'A1'
        },
        {
          level: 'A2'
        },
        {
          level: 'B1'
        },
        {
          level: 'B2'
        },
        {
          level: 'C1'
        },
        {
          level: 'C2'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
  .container {
    padding: 2rem;
    label {
      padding: 1rem;
    };
    input {
      padding: 0.5rem;
    }
    select {
      padding: 0.5rem;
    }
  }
</style>
