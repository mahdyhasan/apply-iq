### Shared Types

- DemoResponse (`shared/api.ts`)
  - Shape:
    ```ts
    export interface DemoResponse {
      message: string;
    }
    ```
  - Usage:
    ```ts
    import type { DemoResponse } from "@/shared/api";
    function handle(resp: DemoResponse) {
      console.log(resp.message);
    }
    ```