<script>
    import { tick } from "svelte";

  const rows = 10;
  const cols = 6;
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const data = $state([
    [{value: 'Item'}, {value: 'Price'}, {value: 'Quantity'}, {value: 'Total'}],
    [{value: '🍎'}, {value: '1'}, {value: '10'}, {value: 'MULTIPLY(B2,C2)'}],
    [{value: '🍌'}, {value: '2'}, {value: '3'}, {value: 'MULTIPLY(B3,C3)'}],
    [{value: '🍒'}, {value: '0.1'}, {value: '20'}, {value: 'MULTIPLY(B4,C4)'}],
    [{value: '🍓'}, {value: '3'}, {value: '1'}, {value: 'MULTIPLY(B5,C5)'}],
    [{value: ''}, {value: ''}, {value: 'Total'}, {value: 'SUM(D2,D5)'}],
  ])

  let selectedCell = $state();
  let editedCell = $state();

  function parseValue(value) {
    if (!value) return '';
    if (value.startsWith('MULTIPLY')) {
      const [_, cell1, cell2] = value.match(/MULTIPLY\((\w+),(\w+)\)/);
      return cell(cell1) * cell(cell2)
    }
    if (value.startsWith('SUM')) {
      // const [_, cell1, cell2] = value.match(/SUM\((\w+),(\w+)\)/);
      // return cell(cell1) + cell(cell2)
      return 'foo'
    }
    return value;
  }


  function cell(index) {
    const [_, letter, row] = index.match(/(\w+)(\d+)/);
    const col = letters.indexOf(letter);
    return parseFloat(data[row -1][col].value);
  }
</script>

<table>
  <thead>
    <tr>
      {#each Array(cols) as _, i}
        <th>{letters[i]}</th>
      {/each}
    </tr>
  </thead>

  <tbody>
    {#each Array(rows) as _, row}
      <tr>
        <th>{row + 1}</th>
        {#each Array(cols) as _, col}
          {@const cell = `${letters[col]}${row + 1}`}
          {@const value = data[row]?.[col]?.value}
          {@const selected = selectedCell === cell}
          {@const edited = editedCell === cell}
          {@const parsedValue = parseValue(value)}
          <td class:selected data-cell={cell} onclick={() => {
            if (selected) return;
            selectedCell = cell;
            editedCell = null;
          }}>{parsedValue}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table {
    margin-left: 300px;
    max-width: 800px;

    td {
      width: 160px;
      height: 40px;
      font-weight: 600;
      text-align: left;

      &.selected {
        outline: 1px solid var(--highlight);
        border-radius: var(--radius-1);
      }

      input {
        height: 100%;
        padding: 0px;
        background: none;
        outline: none;
      }
    }
  }
</style>
