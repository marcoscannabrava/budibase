<button on:click>
  <slot>+</slot>
</button>

<style>
  button {
    cursor: pointer;
    outline: none;
    border: none;
    border-radius: 5px;
    min-width: 1.8rem;
    min-height: 1.8rem;
    padding-bottom: 10px;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 1.2rem;
    font-weight: 700;
    color: var(--secondary100);
  }
</style>
