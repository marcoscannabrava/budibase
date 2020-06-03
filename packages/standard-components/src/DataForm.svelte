<script>
  import { onMount } from "svelte"

  export let _bb
  export let _instanceId
  export let model

  let username
  let password
  let newModel = {
    modelId: model,
  }
  let store = _bb.store
  let schema = {}
  let modelDef = {}

  $: if (model && model.length !== 0) {
    fetchModel()
  }

  $: fields = Object.keys(schema)

  async function fetchModel() {
    const FETCH_MODEL_URL = `/api/${_instanceId}/models/${model}`
    const response = await _bb.api.get(FETCH_MODEL_URL)
    modelDef = await response.json()
    schema = modelDef.schema
  }

  async function save() {
    const SAVE_RECORD_URL = `/api/${_instanceId}/${model}/records`
    const response = await _bb.api.post(SAVE_RECORD_URL, newModel)
    const json = await response.json()

    store.update(state => {
      state[model._id] = [...state[model], json]
      return state
    })
  }

  const handleInput = field => event => {
    let value

    if (event.target.type === "checkbox") {
      value = event.target.checked
      newModel[field] = value
      return
    }

    if (event.target.type === "number") {
      value = parseInt(event.target.value)
      newModel[field] = value
      return
    }

    value = event.target.value
    newModel[field] = value
  }
</script>

<form class="uk-form" on:submit|preventDefault>
  <h3>Create {modelDef.name}</h3>
  <div>
    {#each fields as field}
      <div class="uk-margin">
        <label class="form-label" for="form-stacked-text">{field}</label>
        <input
          class="uk-input"
          type={schema[field].type === 'string' ? 'text' : schema[field].type}
          on:change={handleInput(field)} />
      </div>
    {/each}
  </div>
  <button class="primary" on:click={save}>Save</button>
</form>

<style>
  .uk-form {
    padding: 10px;
  }

  .form-label {
    text-transform: capitalize;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .uk-margin {
    margin-top: 15px;
    display: flex;
    flex-direction: column;
  }

  button {
    margin-top: 15px;
    cursor: pointer;
    font-weight: bold;
    font-size: 18px;
    border-radius: 3px;
    padding: 20px 30px;
    color: white;
    width: 100%;
  }

  button:hover:not([disabled]) {
    filter: brightness(85%);
  }

  .primary {
    border: solid 0 #0055ff;
    background-color: #0055ff;
  }

  input {
    box-sizing: border-box;
    color: #393c44;
    height: 32px;
    font-size: 18px;
    border-radius: 3px;
    border: solid 1px #e8e8ef;
    padding: 20px;
    margin: 0;
    background-color: white;
  }

  input::placeholder {
    color: var(--grey-medium);
  }

  input:focus {
    box-shadow: 0 4px 16px 0 rgba(57, 60, 68, 0.08);
  }

  input:disabled {
    background: var(--grey-medium);
  }
</style>
