<script>
  let people = $state([
    { name: 'Donald', surname: 'Duck'},
    { name: 'Mickey', surname: 'Mouse'},
    { name: 'Goofy', surname: 'Goof'},
    { name: 'Dagobert', surname: 'Duck'},
  ]);

  let selected = $state();
  let person = $state({name: '', surname: '' });

  $effect(() => {
    person = {
      name: selected?.name || '',
      surname: selected?.surname || '',
    }
  });

  let prefix = $state('');
  const filteredPeople = $derived(
    prefix ? people.filter(person => person.surname.toLocaleLowerCase().startsWith(prefix)) : people
  );

  function createPerson() {
    people.push(person);
    clear();
  }
  function updatePerson() {
    const index = people.indexOf(selected);
    people[index] = person;
    clear();
  }
  function deletePerson() {
    const index = people.indexOf(selected);
    people.splice(index, 1);
    clear();
  }

  function clear() {
    selected = null;
    person = { name: '', surname: '' }
  }
</script>

<div class="container surface-2">
  <div class="search">
    <label class="group">
      <span>Filter prefix:</span>
      <input type="text" bind:value={prefix} />
    </label>
  </div>

  <label class="people">
    <select bind:value={selected} size="8">
      {#each filteredPeople as person}
        <option value={person}>{person.name} {person.surname}</option>
      {/each}
    </select>
  </label>

  <div class="details">
    <label class="group">
      <span>Name:</span>
      <input type="text" bind:value={person.name} />
    </label>

    <label class="group">
      <span>Surname:</span>
      <input type="text" bind:value={person.surname} />
    </label>
  </div>

  <div class="actions space-x">
    <button onclick={createPerson}>Create</button>
    <button onclick={updatePerson}>Update</button>
    <button onclick={deletePerson}>Delete</button>
  </div>
</div>

<style>
  .container {
    width: 500px;
    display: grid;
    grid-template-areas:
      'search .'
      'people details'
      'actions actions';
    grid-template-columns: 240px 1fr;
    grid-auto-rows: auto;
    gap: var(--size-3);
    padding: var(--size-3);

    .search {
      grid-area: search;

      .group {
        display: grid;
        grid-template-columns: 2fr 1fr;
        align-items: baseline;
      }
    }

    .people {
      grid-area: people;
    }

    .details {
      grid-area: details;
      display: grid;
      grid-template-columns: auto 1fr;
      grid-template-rows: repeat(2, auto) 1fr;
      align-items: baseline;
      gap: var(--size-2);

      .group {
        display: contents;
      }
    }

    .actions {
      grid-area: actions;
    }
  }
</style>
