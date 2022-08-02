<template>
  <div class="container main-form bg-light">
    <form class="needs-validation">
      <div class="col-12 mb-3">
        <label for="firstName" class="form-label">
          first name
          <span>*</span>
        </label>
        <input type="text" class="form-control" id="firstName" placeholder="Enter your first name" v-model="firstName" @blur="firstNameIsPristine = false">
        <div class="text-danger" v-if="! firstNameIsPristine && firstNameHasError">
          First name must have at least 3 characters.
        </div>
      </div>

      <div class="col-12 mb-3">
        <label for="lastName" class="form-label">
          last name
          <span>*</span>
        </label>
        <input type="text" class="form-control" id="lastName" placeholder="Enter your last name" v-model="lastName" @blur="lastNameIsPristine = false">
        <div class="text-danger" v-if="! lastNameIsPristine && lastNameHasError">
          Last name must have at least 3 characters.
        </div>
      </div>

      <div class="col-12 mb-3">
        <label for="birth-date" class="form-label">
          birth date
          <span>*</span>
        </label>
        <input type="text" class="form-control" id="birth-date" placeholder="yyyy-mm-dd" v-model="birthDate" @blur="birthDateIsPristine = false">
        <div class="text-danger" v-if="! birthDateIsPristine && birthDateHasError">
          You must have at least 18 years to access our courses.
        </div>
      </div>

      <div class="col-12 mb-3">
        <label for="email" class="form-label">
          e-mail
          <span>*</span>
        </label>
        <input type="email" class="form-control" id="email" placeholder="example@email.com" v-model="email" @blur="emailIsPristine = false">
        <div class="text-danger" v-if="! emailIsPristine && emailHasError">
          Please enter a valid email address.
        </div>
      </div>

      <div class="col-12 mb-3">
        <label for="my-level" class="form-label">
          english level
          <span>*</span>
        </label>
        <select class="form-select" id="eng-level" v-model="myLevel">
          <option value="" disabled>Select your English level</option>
          <option :value="myLevel.id" :disabled="courseLevel !== '' && getIndexFromLevel(courseLevel) <= i" v-for="(myLevel, i) in engLevels" :key="i">{{ myLevel.title }}</option>
        </select>
      </div>

      <div class="col-12 mb-3">
        <label for="course-level" class="form-label">
          english course level
          <span>*</span>
        </label>
        <select class="form-select" id="course-level" v-model="courseLevel">
          <option value="" disabled>Select English course level</option>
          <option :value="course.id" :disabled="getIndexFromLevel(myLevel) >= i" v-for="(course, i) in engLevels" :key="i">{{ course.title }}</option>
        </select>
      </div>

      <button class="btn btn-outline-dark btn-lg col-12 mt-4 mb-2" type="submit" :disabled="cannotSubmit" @click.prevent="dialogTest.isOpen = true">Confirm</button>
      <div class="text-danger" v-if="cannotSubmit">
        All fields should be filled.
      </div>

    </form>
  </div>

  <div class="modal-message" v-if="dialogTest.isOpen">
    <div class="message">
    <p>Your request was send.</p>
    <p>We will contact you in a few days to give more information about our courses.</p>
    <a href="#" class="btn btn-light my-5 btn-lg" @click.prevent="dialogTest.isOpen = false">Chiudi</a>
    </div>
  </div>

</template>

<script>

export default {
  name: 'ContactForm',
  data () {
    return {
      engLevels: [
        { id: 'A1', title: 'A1' },
        { id: 'A2', title: 'A2' },
        { id: 'B1', title: 'B1' },
        { id: 'B2', title: 'B2' },
        { id: 'C1', title: 'C1' },
        { id: 'C2', title: 'C2' }
      ],
      firstName: '',
      firstNameIsPristine: true,
      lastName: '',
      lastNameIsPristine: true,
      birthDate: '',
      birthDateIsPristine: true,
      email: '',
      emailIsPristine: true,
      myLevel: '',
      myLevelIsPristine: true,
      courseLevel: '',
      courseLevelIsPristine: true,

      dialogTest: {
        isOpen: false
      }
    }
  },
  computed: {
    firstNameHasError () {
      return this.firstName.length < 3
    },
    lastNameHasError () {
      return this.lastName.length < 3
    },
    emailHasError () {
      // return this.email.match(/^[^@]+@[^@]+\.[^@]+$/) === null
      if (this.email.match(/^[^@]+@[^@]+\.[^@]+$/) !== null) {
        return false
      }

      return true
    },

    birthDateHasError () {
      // il campo input di tipo date restituisce la data yyyy-mm-dd
      if (this.birthDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
        const [yy, mm, dd] = this.birthDate.split('-')

        // verifica sul mese
        const monthAsNumber = parseInt(mm, 10)
        if (monthAsNumber <= 0 || monthAsNumber > 12) {
          return true
        }

        const listOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

        const isYearLeap = (yy % 4 === 0 && yy % 100 !== 0) || yy % 400 === 0
        if (isYearLeap) {
          listOfDays[1]++
        }

        const daysAsNumber = parseInt(dd, 10)
        if (daysAsNumber <= 0 || daysAsNumber > listOfDays[monthAsNumber - 1]) {
          return true
        }

        const yearAsNumber = parseInt(yy, 10)

        if (this.computeAgeInYears(yearAsNumber, monthAsNumber, daysAsNumber) < 18) {
          return true
        }
        return false
      }
      return true
    },

    cannotSubmit () {
      return this.firstNameHasError || this.lastNameHasError || this.birthDateHasError || this.emailHasError || !this.myLevel || !this.courseLevel
    }
  },
  methods: {
    getIndexFromLevel (id) {
      return this.engLevels.findIndex(course => course.id === id)
    },
    computeAgeInYears (yy, mm, dd) {
      const today = new Date().toISOString().slice(0, 10)
      const todayArr = today.split('-')
      const todayYY = parseInt(todayArr[0])
      const todayMM = parseInt(todayArr[1])
      const todayDD = parseInt(todayArr[2])

      let y = todayYY - yy
      if (todayMM < mm || (todayMM === mm && todayDD < dd)) {
        return --y
      }
      return y
    }
  }
}
</script>

<style scoped lang="scss">
  .main-form {
    max-width: 25%;
    margin-top: 5rem;
    padding: 3rem;
    border: 1px solid #ddd;
    border-radius: 10px;
    label {
      text-transform: capitalize;
      margin: 0;
    }
    span {
      color: red;
    }
  }
  .modal-message {
    position: fixed;
    z-index: 1;
    top: 30%;
    left: 35%;
    width: 30%;
    height: 30%;
    border: 1px solid black;
    background-color: rgba(29, 29, 82, 0.897);
    text-align: center;
    padding: 30px 20px;
    border-radius: 10px;
    .message {
      display: block;
      margin: 30px;
      padding: 20px;
      color: #FFF;
      font-size: 20px;
    }
  }
</style>
