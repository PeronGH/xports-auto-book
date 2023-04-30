# Xports Auto Book

## Usage

### CLI

```sh
deno run -A cli.ts
```

### Module

```ts
import { autoBook } from "./mod.ts";

await autoBook({
    netUserId: "...",
    date: "yyyy-MM-dd",
    timeName: "hh-mm",
    serviceName: "健身",
});
```
