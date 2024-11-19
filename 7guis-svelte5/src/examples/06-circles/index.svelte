<script>
  let status = $state();
  let circles = $state([]);
  $inspect(JSON.stringify(circles), 'circles');
  let selected = $state();
  let snapshots = [];
  let history = $state(-1);

  function undo() {
    circles = snapshots[--history];
  }

  function redo() {
    circles = snapshots[++history];
  }

  function snapshot() {
    history++;
    snapshots.push($state.snapshot(circles));
  }

  function addCircle(event) {
    if (status === 'editing') {
      snapshot();
      status = 'drawing';
      return;
    }
    const svgElement = event.target;
    const { left, top } = svgElement.getBoundingClientRect();

    const circle = {
      id: window.crypto.randomUUID(),
      cx: +(event.clientX - left.toFixed()),
      cy: +(event.clientY - top).toFixed(),
      r: 40,
    }

    circles.push(circle);
    selected = circle;
    snapshot();
  }
</script>

<div class="space-y">
  <div class="action flex-center">
    <button onclick={undo} disabled={history === -1}>Undo</button>
    <button onclick={redo} disabled={history === snapshots.length -1}>Redo</button>
  </div>

  {#if status === 'editing'}
    <div class="adjust surface-2 space-y">
      <span>Embiggen</span>
      <input type="range" bind:value={selected.r} min="1" max="100"/>
    </div>
  {/if}

  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <svg viewBox="0 0 600 400" onclick={addCircle}>
    {#each circles as circle}
      <circle {...circle} stroke="#fff" stroke-width="2"
        fill={selected.id === circle.id ? 'var(--gray-3)' : 'transparent'}
        onclick={(e) => {
          selected = circle;
          e.stopPropagation();
        }}
        oncontextmenu={(e) => {
          if (status === 'editing') {
            snapshot();
          }
          e.preventDefault();
          status = 'editing';
          selected = circle;
        }}
      />
    {/each}
  </svg>
</div>

<style>
  svg {
    width: 600px;
    height: 400px;
    border: 2px solid var(--gray-0);
  }

  .adjust {
    width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: var(--size-3);
    text-align: center;
  }
</style>
