<script lang="ts">
    export let value: string;
    export let placeholder: string = '';
    export let onInput: (e: Event) => void;
  </script>
  
  <input
    type="text"
    bind:value
    placeholder={placeholder}
    on:input={onInput}
    class="border rounded p-2 w-full"
  />
  