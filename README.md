# Xports Auto Book

Automatically book tickets for XJTLU Gym.

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

### Server

`server.ts` can be hosted on Deno Deploy. Ensure that you have access to Deno KV.
