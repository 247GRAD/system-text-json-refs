# About

Parses JSON produced by .Net System.Text.Json serialization with [reference preservation](https://learn.microsoft.com/en-us/dotnet/standard/serialization/system-text-json/preserve-references).

# Install

```shell
npm i @247grad/system-text-json-refs
```

# Use

Import from package and parse a given JSON string.

```typescript
import { parseWithRefs } from "@247grad/system-text-json-refs"

const parsed = parseWithRefs(text);
```