<template>
  <div class="floatlabel-demo">
    <div class="card">
      <h5>Float Label</h5>
      <div class="grid p-fluid mt-3">
        <div class="field col-12 md:col-4">
          <span class="p-float-label">
            <InputText id="inputtext" v-model="value1" type="text" />
            <label for="inputtext">InputText</label>
          </span>
        </div>
        <div class="field col-12 md:col-4">
          <span class="p-float-label">
            <AutoComplete id="autocomplete" v-model="value2" :suggestions="filteredCountries" field="name" @complete="searchCountry($event)" />
            <label for="autocomplete">AutoComplete</label>
          </span>
        </div>
        <div class="field col-12 md:col-4">
          <span class="p-float-label">
            <Calendar v-model="value3" input-id="calendar" />
            <label for="calendar">Calendar</label>
          </span>
        </div>
        <div class="field col-12 md:col-4">
          <span class="p-float-label">
            <Chips v-model="value4" input-id="chips" />
            <label for="chips">Chips</label>
          </span>
        </div>
        <div class="field col-12 md:col-4">
          <span class="p-float-label">
            <InputMask id="inputmask" v-model="value5" mask="99/99/9999" />
            <label for="inputmask">InputMask</label>
          </span>
        </div>
        <div class="field col-12 md:col-4">
          <span class="p-float-label">
            <InputNumber id="inputnumber" v-model="value6" />
            <label for="inputnumber">InputNumber</label>
          </span>
        </div>
        <div class="field col-12 md:col-4">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-user" />
            </span>
            <span class="p-float-label">
              <InputText id="inputgroup" v-model="value7" type="text" />
              <label for="inputgroup">InputGroup</label>
            </span>
          </div>
        </div>
        <div class="field col-12 md:col-4">
          <span class="p-float-label">
            <Dropdown id="dropdown" v-model="value8" :options="cities" option-label="name" />
            <label for="dropdown">Dropdown</label>
          </span>
        </div>
        <div class="field col-12 md:col-4">
          <span class="p-float-label">
            <MultiSelect id="multiselect" v-model="value9" :options="cities" option-label="name" :filter="false" />
            <label for="multiselect">MultiSelect</label>
          </span>
        </div>
        <div class="field col-12 md:col-4">
          <span class="p-float-label">
            <Textarea v-model="value10" input-id="textarea" rows="3" cols="30" />
            <label for="textarea">Textarea</label>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CountryService from '~~/services/CountryService'
export default {
  data () {
    return {
      countries: [],
      filteredCountries: null,
      cities: [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
      ],
      value1: null,
      value2: null,
      value3: null,
      value4: null,
      value5: null,
      value6: null,
      value7: null,
      value8: null,
      value9: null,
      value10: null
    }
  },
  created () {
    this.countryService = new CountryService()
  },
  mounted () {
    this.countryService.getCountries().then((countries) => {
      this.countries = countries
    })
  },
  methods: {
    searchCountry (event) {
      // in a real application, make a request to a remote url with the query and
      // return filtered results, for demo we filter at client side
      const filtered = []
      const query = event.query
      for (let i = 0; i < this.countries.length; i++) {
        const country = this.countries[i]
        if (country.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
          filtered.push(country)
        }
      }
      this.filteredCountries = filtered
    }
  }
}
</script>
