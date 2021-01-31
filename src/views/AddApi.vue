<template>
  <div class="row">
    <div>
    <b-form @submit.prevent="onSubmit" @reset.prevent="clearForm">
      <b-form-group
        id="input-group-1"
        label="Название API:"
        label-for="input-1"
        description="Назовите данное API максимально ёмким словом, чтобы его можно было легко найти."
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
        label="Стоимость доступа к API, $:"
        label-for="input-5"
      >
        <b-form-input
          id="input-5"
          v-model.number="cost"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        v-if="!isFree"
        id="input-group-6"
        label="Стоимость абонентской платы в месяц (если такая имеется), $:"
        label-for="input-6"
      >
        <b-form-input
          id="input-6"
          v-model.number="monthlyCost"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-7" 
          label="Дополнительно:" 
          label-for="input-7"
          description="Часто для доступа к API необходимо написать разботчикам, получить приватный ключ или зарегистрироваться через UI сервиса. Если в вашем случае необходимы некие дополнительные действия - опишите их здесь."
        >
        <b-form-textarea
          id="input-7"
          rows="4"
          v-model.trim="additionalAccessRules"
          placeholder="Введите дополнительное описание"
        ></b-form-textarea>
      </b-form-group>

      <b-form-group
        id="input-group-8"
        label="Лицензия под которой распространяется ваше API:"
        label-for="input-8"
      >
        <b-form-input
          id="input-8"
          v-model.trim="license"
          type="text"
          placeholder="Введите название лицензии"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-9" 
          label="Способ добавления методов вашего API:" 
          label-for="dropdown-9"
          >
        <b-form-select id="dropdown-9" right 
            text="Выберите подходящий вам вариант" 
            class="m-md-2"
            v-model="addMethodsOption"
            :options="addMethodsOptions"
            >
        </b-form-select>
      </b-form-group>

      <b-button type="submit" variant="primary">Добавить</b-button>
      <b-button type="reset" variant="danger">Очистить</b-button>
    </b-form>
    </div>
  </div>
</template>

<script>
export default {
    name: 'addAPI',
    data: () => ({
        name: '',
        isFree: true,
        cost: 0,
        monthlyCost: 0,
        description: '',
        additionalAccessRules: '',
        license: '',
        addMethodsOption: "handy",
        addMethodsOptions: [{ value: "handy", text: "Вручную" },
                            { value: "wsdl", text: "Автоматически через загрузку WSDL схемы" },
                            { value: "openapi", text: "Автоматически через закрзку схемы Openapi" }]
    }),
    methods: {
        async onSubmit(){
            await this.$store.dispatch('addApi', {
                name: this.name,
                isFree: this.isFree,
                cost: this.cost,
                description: this.description,
                monthlyCost: this.monthlyCost,
                additionalAccessRules: this.additionalAccessRules,
                license: this.license
            })
            
            this.clearForm()
            this.$router.push('/')
        },
        clearForm() {
            this.name = ''
            this.isFree = true
            this.cost = 0
            this.description = ''
            this.monthlyCost = '',
            this.additionalAccessRules = '',
            this.license = ''
        }
    }
}
</script>