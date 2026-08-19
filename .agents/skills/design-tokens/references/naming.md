# Token naming

## Grammar

A token name is a hyphen-separated string in this order:

```
<type>-<group>-<role>-[state]-[scale]
```

Only the first two segments are required. The `state` and `scale` segments are optional and only appear when they disambiguate a token.

Component-specific size tokens may use the component name directly as the group segment, e.g. `size-button`.

## Allowed segments

### Type

The first segment must be one of these prefixes.

| Prefix | Meaning |
|---|---|
| `color` | Visual colour |
| `font` | Typeface family |
| `text` | Type size |
| `leading` | Line height |
| `tracking` | Letter spacing |
| `weight` | Font weight |
| `space` | Spacing between or inside elements |
| `size` | Width or height of a thing |
| `radius` | Corner radius |
| `shadow` | Box shadow or drop shadow |
| `z` | Stacking order |
| `breakpoint` | Responsive width threshold |
| `duration` | Animation duration |
| `ease` | Animation easing |
| `delay` | Animation delay |

### Group

The second segment groups the token by where it is used.

| Group | Meaning |
|---|---|
| `surface` | Background fills |
| `text` | Text colour or type treatments |
| `border` | Borders and dividers |
| `accent` | Interactive or brand emphasis |
| `neutral` | Non-accent greys and muted colours |
| `page` | Page-level settings such as max width |
| `component` | Component-specific sizing; the component name may be used directly as the group segment, e.g. `size-button` |
| `overlay` | Modal, tooltip, or popover layers |
| `focus` | Focus ring |

### Role, state, and scale

- `role` describes the job: `primary`, `secondary`, `muted`, `disabled`, `error`, `success`.
- `state` is a modifier: `hover`, `active`, `focus`, `selected`.
- `scale` is an ordinal or t-shirt size: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, or a number from the scale.

## Bad / better / best

| Bad | Why it fails | Better | Best |
|---|---|---|---|
| `blue` | Describes a value, not a usage | `color-primary` | `color-accent-primary` |
| `bg` | Ambiguous abbreviation | `color-surface` | `color-surface-page` |
| `txt-muted` | Abbreviation and wrong prefix | `text-muted` | `color-text-muted` |
| `primary-hvr` | Abbreviated state | `color-primary-hover` | `color-surface-primary-hover` |
| `space-big` | Vague scale | `space-lg` | `space-6` |
| `z-9999` | Magic number in the name | `z-modal` | `z-overlay` |
| `shadow-1` | Ordinal without meaning | `shadow-card` | `shadow-card-resting` |

The 'best' name for `z-9999` also changes the value to `z-overlay` (30) to match the documented `z-*` scale.

## Naming checklist

- [ ] First segment is in the allowed type list.
- [ ] Second segment is in the allowed group list or follows an approved component prefix.
- [ ] No abbreviations except the approved type prefixes.
- [ ] Lowercase and hyphenated only.
- [ ] State and scale segments are added only when needed.
