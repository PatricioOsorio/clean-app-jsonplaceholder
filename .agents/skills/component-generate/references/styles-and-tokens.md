# Styles, Tokens, and Imports

## Available Design Tokens

Our design system exposes a comprehensive set of tokens through `tailwind-theme.css`, tailored for both `light` and `dark` themes. Use these exact tokens instead of hardcoding colors or guessing.

### Semantic Scale (50 to 950)

The following palettes are available in steps from `50` to `950` (e.g., `text-primary-500`, `bg-danger-900`, `border-success-200`):

- `primary-*` (Brand colors)
- `secondary-*` (Neutral backgrounds)
- `muted-*` (Soft grays)
- `accent-*` (Secondary brand)
- `danger-*` (Errors, destructive)
- `warning-*` (Alerts)
- `success-*` (Positive feedback)
- `info-*` (Information)
- `help-*` (Guidance)

### Core Shadcn/UI Semantic Tokens

Use exactly these tokens for layout, structural elements, and text interactions. Note that most background tokens have a matching `-foreground` token for text readability (e.g., `bg-card` and `text-card-foreground`).

**Layout & Text:**

- `background`, `foreground`
- `card`, `card-foreground`
- `popover`, `popover-foreground`

**Action Colors:**

- `primary`, `primary-foreground`
- `secondary`, `secondary-foreground`
- `muted`, `muted-foreground`
- `accent`, `accent-foreground`
- `destructive`
- `danger`, `danger-foreground`
- `warning`, `warning-foreground`
- `success`, `success-foreground`
- `info`, `info-foreground`
- `help`, `help-foreground`

**Forms & Borders:**

- `border`
- `input`
- `ring`

**Sidebar (Specific):**

- `sidebar`, `sidebar-foreground`
- `sidebar-primary`, `sidebar-primary-foreground`
- `sidebar-accent`, `sidebar-accent-foreground`
- `sidebar-border`, `sidebar-ring`

**Charts:**

- `chart-1`, `chart-2`, `chart-3`, `chart-4`, `chart-5`

**Radius:**

- `radius-sm`, `radius-md`, `radius-lg`, `radius-xl`, `radius-2xl`, `radius-3xl`, `radius-4xl`

_Note: Apply these in Tailwind classes directly (e.g., `text-foreground`, `bg-card`, `border-border`, `ring-ring`, `rounded-xl`)._

## Theme Variants

- **Dark Mode (Default)**: Since dark is the base theme, classes apply directly to dark mode.
- **Light Mode**: Use the `light:` variant for light mode overrides.

```css
/* Example of token usage in CSS */
.my-card {
  /* Structure */
  @apply rounded-xl border p-4;

  /* Dark (Default) */
  @apply border-border bg-card text-card-foreground;
  @apply hover:bg-secondary-800;

  /* Light Override */
  @apply light:hover:bg-secondary-100;
}
```

## `lib-styleguide-simba` Imports

Always import by specific module, never from the root of the package:

```ts
// ✅ Correct
import { cn } from 'lib-styleguide-simba/utils';
import { Card } from 'lib-styleguide-simba/card';
import { Button } from 'lib-styleguide-simba/button';
import { Avatar } from 'lib-styleguide-simba/avatar';
import { Sidebar } from 'lib-styleguide-simba/sidebar';
import { Separator } from 'lib-styleguide-simba/separator';
import { useTheme } from 'lib-styleguide-simba/theme-provider';
import { IconBell, IconMoon } from 'lib-styleguide-simba/icons';
import { IconSimba8, IconSimbaNavFull } from 'lib-styleguide-simba/icons-svg';
import { type IWithRootProps } from 'lib-styleguide-simba/component.interfaces';

// ❌ Incorrect
import { cn, Card, Button } from 'lib-styleguide-simba';
```
