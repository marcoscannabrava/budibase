<script>
  import { fade } from "svelte/transition"

  export let onSelect
  export let block

  function selectBlock() {
    onSelect(block)
  }
</script>

<div transition:fade class={`${block.type} hoverable`} on:click={selectBlock}>
  <header>
    {#if block.type === 'TRIGGER'}
      <i class="ri-lightbulb-fill" />
      When this happens...
    {:else if block.type === 'ACTION'}
      <i class="ri-flashlight-fill" />
      Do this...
    {:else if block.type === 'LOGIC'}
      <i class="ri-pause-fill" />
      Only continue if...
    {/if}
  </header>
  <hr />
  <p>
    {@html block.body}
  </p>
</div>

<style>
  div {
    width: 320px;
    padding: 20px;
    border-radius: 5px;
    transition: 0.3s all;
    box-shadow: 0 4px 30px 0 rgba(57, 60, 68, 0.08);
    background-color: var(--font);
    font-size: 16px;
    color: var(--white);
  }

  header {
    font-size: 16px;
    font-weight: 500;
    display: flex;
    align-items: center;
  }

  header i {
    font-size: 20px;
    margin-right: 5px;
  }

  .ACTION {
    background-color: var(--white);
    color: var(--font);
  }

  .TRIGGER {
    background-color: var(--font);
    color: var(--white);
  }

  .LOGIC {
    background-color: var(--secondary);
    color: var(--font);
  }

  div:hover {
    transform: scale(1.05);
  }
</style>
