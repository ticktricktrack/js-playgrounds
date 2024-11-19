<script>
  let selected = $state('one-way');
  let startDate = $state(getDate());
  let endDate = $state(getDate(nextWeek()));
  $inspect({ selected, startDate, endDate });

  function handleSubmit(event) {
    event.preventDefault();
    alert(`You have booked a ${selected} flight from ${startDate} to ${endDate}`);
  }

  function getDate(day = new Date()) {
    const d = day
      .toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .split('/')
    return `${d[2]}-${d[0]}-${d[1]}`;
  }

  function nextWeek() {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 7);
    return tomorrow;
  }
</script>

<div class="flex-gap">
  <form onsubmit={handleSubmit} class="grid-gap">
    <select bind:value={selected}>
      <option value="one-way">One-Way Flight</option>
      <option value="round-trip">Round-Trip Flight</option>
    </select>
    <label>
      Start
      <input type="date" bind:value={startDate} min={getDate()}/>
    </label>
    <label>
      Return
      <input type="date" bind:value={endDate} min={getDate()} disabled={selected==='one-way'}/>
    </label>
    <button disabled={!startDate || (startDate > endDate)}>
      Book Flight
    </button>
  </form>
</div>
