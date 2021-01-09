<template>
    <div>
    <b-form @submit.prevent="onSubmit" @reset.prevent="clearForm">
      <b-form-group
        id="input-group-1"
        label="Название API:"
        label-for="input-1"
        description="Назовите данное API максимально ёмким словом, чтобы его можно было логеко найти."
      >
        <b-form-input
          id="input-1"
          v-model.trim="name"
          type="text"
          placeholder="Введите название"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Описание:" label-for="input-2">
        <b-form-textarea
          id="input-2"
          v-model.trim="description"
          placeholder="Опишите API в подробностях"
          required
        ></b-form-textarea>
      </b-form-group>

      <b-form-group id="input-group-4" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          v-model="isFree"
          id="checkboxes-4"
          :aria-describedby="ariaDescribedby"
        >
            <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0">API Бесплатно</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

        <b-form-group
        v-if="!isFree"
        id="input-group-5"
        label="Стоимость доступа к API:"
        label-for="input-5"
      >
        <b-form-input
          id="input-5"
          v-model.number="cost"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Добавить</b-button>
      <b-button type="reset" variant="danger">Очистить</b-button>
    </b-form>
  </div>

</template>

<script>
export default {
    name: 'addAPI',
    data: () => ({
        name: '',
        isFree: true,
        cost: 0,
        description: ''
    }),
    methods: {
        async onSubmit(){
            await this.$store.dispatch('addApi', {
                name: this.name,
                isFree: this.isFree,
                cost: this.cost,
                description: this.description
            })
            
            this.clearForm()
            this.$router.push('/')
        },
        clearForm() {
            this.name = ''
            this.isFree = true
            this.cost = 0
            this.description = ''
        }
    }
}
</script>