# Grids

## Grid types

### CSS Grid

Use CSS Grid when a layout needs explicit rows and columns at the same time. Grid is the right tool when the position of an item depends on both axes, or when items need to span tracks.

| Use case | Why Grid fits |
|---|---|
| Page shell with header, sidebar, and main area | Rows and columns are both intentional and named. |
| Card gallery with fixed columns | Columns can repeat and respond with `repeat(auto-fit, minmax(...))`. |
| Form with labels and inputs | Labels and inputs can align across a shared column set. |

### Flexbox

Use Flexbox when a layout is a single line of items. Flexbox is the right tool for distribution and alignment along one axis.

| Use case | Why Flexbox fits |
|---|---|
| Navigation bar | One row of links that can wrap or justify. |
| Button group | Related actions packed together with a gap. |
| Centering a single element | `align-items` and `justify-content` handle one centering axis each. |

### Hybrid

A page often needs both. Use Grid for the outer shell and Flexbox for components inside the grid areas. Do not nest Grid inside Grid to do a job Flexbox can do in one dimension.

## Common patterns

### 12-column page shell

```css
.page {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--space-4);
}

.page-sidebar {
  grid-column: 1 / 4;
}

.page-main {
  grid-column: 4 / 13;
}
```

### Auto-fit card grid

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: var(--space-6);
}
```

### Centered flex row

```css
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}
```

## Anti-patterns

| Anti-pattern | Why it fails | Fix |
|---|---|---|
| Grid for a single row of buttons | Adds `grid-template-columns` for a one-axis problem. | Use Flexbox with `gap`. |
| Flexbox for a two-dimensional page shell | Nested `justify-content` and `align-items` fight each other. | Use Grid and name the areas. |
| Magic numbers in `grid-column` | `2 / 9` does not explain what part of the layout it covers. | Name areas or use a consistent column count. |
| Deeply nested flex containers | Each level adds implicit alignment rules that are hard to trace. | Flatten the structure or switch to Grid. |
