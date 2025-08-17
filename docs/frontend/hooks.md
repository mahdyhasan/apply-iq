### Hooks

- useIsMobile (`@/hooks/use-mobile`)
  - Returns: `boolean` indicating if viewport width is below 768px
  - Example:
    ```tsx
    import { useIsMobile } from "@/hooks/use-mobile";
    const isMobile = useIsMobile();
    return <div>{isMobile ? "Mobile" : "Desktop"}</div>;
    ```

- useToast and toast (`@/components/ui/use-toast`)
  - State-based toast store and helpers
  - Example:
    ```tsx
    import { useToast } from "@/components/ui/use-toast";
    const { toast } = useToast();
    toast({ title: "Hello", description: "World" });
    ```

  - Imperative helper:
    ```tsx
    import { toast } from "@/components/ui/use-toast";
    toast({ title: "Saved" });
    ```

Note: Ensure `<Toaster />` is included once at the app root.