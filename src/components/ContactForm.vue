<template>
  <div class="container main-form">
    <form class="needs-validation" novalidate="">

      <div class="col-12 mb-3">
        <label for="firstName" class="form-label">first name *</label>
        <input type="text" class="form-control" name="firstName" id="firstName" placeholder="Enter your first name" required="" v-model="firstName" @blur="firstNameIsPristine = false">
        <div class="text-danger" v-if="! firstNameIsPristine &&  firstNameHasError" >
          Valid first name is required.
        </div>
      </div>

      <div class="col-12 mb-3">
        <label for="lastName" class="form-label">last name *</label>
        <input type="text" class="form-control" id="lastName" placeholder="Enter your last name" required="" v-model="lastName">
        <div class="text-danger" v-if="lastNameHasError">
          Valid last name is required.
        </div>
      </div>

      <div class="col-12 mb-3">
        <label for="birth-date" class="form-label">birth date</label>
        <input type="date" class="form-control" id="birth-date">
        <div class="text-danger">
          Valid email is required.
        </div>
      </div>

      <div class="col-12 mb-3">
        <label for="email" class="form-label">e-mail</label>
        <input type="email" class="form-control" id="email" placeholder="you@example.com" v-model="email">
        <div class="text-danger" v-if="emailHasError">
          Please enter a valid email address.
        </div>
      </div>

      <div class="col-12 mb-3">
        <label for="eng-level" class="form-label">english level</label>
        <select class="form-select" id="eng-level" required="" v-model="myLevel">
          <option value="" disabled>Select your English level</option>
          <option :value="myLevel.id" :disabled="courseLevel !== '' && getIndexFromLevel(courseLevel) <= i" v-for="(myLevel, i) in engLevels" :key="i">{{ myLevel.title }}</option>
        </select>
        <div class="invalid-feedback">
          Please select a valid level.
        </div>
      </div>

      <div class="col-12 mb-3">
        <label for="eng-course-level" class="form-label">english course level</label>
        <select class="form-select" id="eng-course-level" required="" v-model="courseLevel">
          <option value="" disabled>Select English course level</option>
          <option :value="course.id" :disabled="getIndexFromLevel(myLevel) >= i" v-for="(course, i) in engLevels" :key="i">{{ course.title }}</option>
        </select>
        <div class="invalid-feedback">
          Please select a valid level.
        </div>
      </div>

      <button class="btn btn-primary btn-lg col-12 my-2" type="submit" :disabled="cannotSubmit">submit</button>

    </form>
  </div>
</template>

<script>export default {
  name: 'ContactForm',
  data () {
    return {
      engLevels: [
        { id: 'A1', title: 'A1 (Bassissimo)' },
        { id: 'A2', title: 'A2' },
        { id: 'B1', title: 'B1' },
        { id: 'B2', title: 'B2' },
        { id: 'C1', title: 'C1' },
        { id: 'C2', title: 'C2 (Altissimissimo)' }
      ],
      firstName: '',
      firstNameIsPristine: true,

      lastName: '',
      email: '',
      myLevel: '',
      courseLevel: ''
    }
  },
  computed: {
    firstNameHasError () {
      return this.firstName.length <= 3
    },
    lastNameHasError () {
      if (this.lastName.length > 3) {
        return false
      }
      return true
    },
    emailHasError () {
      return this.email.match(/^[^@]+@[^@]+\.[^@]+$/) === null
      // if (this.email.match(/^[^@]+@[^@]+\.[^@]+$/) !== null) {
      //   return false
      // }

      // return true
    },

    cannotSubmit () {
      return this.firstNameHasError || this.lastNameHasError || this.emailHasError
    }
  },
  methods: {
    getIndexFromLevel (id) {
      return this.engLevels.findIndex(course => course.id === id)
    }
  }
}
</script>

<style scoped lang="scss">
  .main-form {
    max-width: 25%;
    margin-top: 5rem;
    padding: 2rem;
    border: 1px solid #ddd;
    border-radius: 10px;
    label {
      text-transform: capitalize;
      margin: 0;
    }
  }
</style>
