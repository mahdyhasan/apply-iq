### UI Components

Imports use the alias `@` which maps to `client` root. Example:

```tsx
import { Button } from "@/components/ui/button";
```

Below are public UI exports and example usage.

- Button (`@/components/ui/button`)
  - Exports: `Button`, `buttonVariants`
  - Props: extends `button` props + `variant` (default|destructive|outline|secondary|ghost|link), `size` (default|sm|lg|icon)
  - Example:
    ```tsx
    <Button variant="secondary" size="lg">Click me</Button>
    ```

- Badge (`@/components/ui/badge`)
  - Exports: `Badge`, `badgeVariants`
  - Variants: default|secondary|destructive|outline
  - Example:
    ```tsx
    <Badge>New</Badge>
    ```

- Textarea (`@/components/ui/textarea`)
  - Exports: `Textarea`
  - Example:
    ```tsx
    <Textarea rows={4} placeholder="Write here..." />
    ```

- Input (`@/components/ui/input`)
  - Exports: `Input`
  - Example:
    ```tsx
    <Input type="email" placeholder="you@example.com" />
    ```

- Switch (`@/components/ui/switch`)
  - Exports: `Switch`
  - Example:
    ```tsx
    <Switch />
    ```

- Checkbox (`@/components/ui/checkbox`)
  - Exports: `Checkbox`
  - Example:
    ```tsx
    <Checkbox defaultChecked />
    ```

- Radio Group (`@/components/ui/radio-group`)
  - Exports: `RadioGroup`, `RadioGroupItem`
  - Example:
    ```tsx
    <RadioGroup value="a" onValueChange={setValue}>
      <RadioGroupItem value="a" id="a" />
      <label htmlFor="a">Option A</label>
    </RadioGroup>
    ```

- Select (`@/components/ui/select`)
  - Exports typical shadcn select parts
  - Example:
    ```tsx
    <Select value={value} onValueChange={setValue}>
      <Select.Trigger>
        <Select.Value placeholder="Pick" />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="one">One</Select.Item>
      </Select.Content>
    </Select>
    ```

- Tabs (`@/components/ui/tabs`)
  - Exports: `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`
  - Example:
    ```tsx
    <Tabs value="a" onValueChange={setTab}>
      <TabsList>
        <TabsTrigger value="a">A</TabsTrigger>
        <TabsTrigger value="b">B</TabsTrigger>
      </TabsList>
      <TabsContent value="a">Content A</TabsContent>
      <TabsContent value="b">Content B</TabsContent>
    </Tabs>
    ```

- Table (`@/components/ui/table`)
  - Exports: `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableHead`, `TableRow`, `TableCell`, `TableCaption`
  - Example:
    ```tsx
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Jane</TableCell>
          <TableCell>Engineer</TableCell>
        </TableRow>
      </TableBody>
    </Table>
    ```

- Dialog (`@/components/ui/dialog`), Drawer (`@/components/ui/drawer`), Sheet (`@/components/ui/sheet`)
  - Provide modal and panel UIs using primitives
  - Typical pattern:
    ```tsx
    <Dialog>
      <Dialog.Trigger asChild>
        <Button>Open</Button>
      </Dialog.Trigger>
      <Dialog.Content>...</Dialog.Content>
    </Dialog>
    ```

- Dropdown Menu (`@/components/ui/dropdown-menu`)
  - Example:
    ```tsx
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button>Menu</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onClick={...}>Item</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
    ```

- Tooltip (`@/components/ui/tooltip`)
  - Exports: `Tooltip`, `TooltipTrigger`, `TooltipContent`, `TooltipProvider`
  - Example:
    ```tsx
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button>Hover</Button>
        </TooltipTrigger>
        <TooltipContent>Info</TooltipContent>
      </Tooltip>
    </TooltipProvider>
    ```

- Popover (`@/components/ui/popover`)
  - Example:
    ```tsx
    <Popover>
      <PopoverTrigger asChild><Button>Open</Button></PopoverTrigger>
      <PopoverContent>Content</PopoverContent>
    </Popover>
    ```

- Alert (`@/components/ui/alert`)
  - Exports: `Alert`, `AlertTitle`, `AlertDescription`
  - Example:
    ```tsx
    <Alert>
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>Something happened.</AlertDescription>
    </Alert>
    ```

- Calendar (`@/components/ui/calendar`)
  - Exports: `Calendar`
  - Example:
    ```tsx
    <Calendar mode="single" selected={date} onSelect={setDate} />
    ```

- Progress (`@/components/ui/progress`)
  - Example:
    ```tsx
    <Progress value={60} />
    ```

- Separator (`@/components/ui/separator`)
  - Example:
    ```tsx
    <Separator className="my-4" />
    ```

- Skeleton (`@/components/ui/skeleton`)
  - Example:
    ```tsx
    <Skeleton className="h-4 w-1/2" />
    ```

- Accordion (`@/components/ui/accordion`)
  - Example:
    ```tsx
    <Accordion type="single" collapsible>
      <AccordionItem value="a">
        <AccordionTrigger>Title</AccordionTrigger>
        <AccordionContent>Content</AccordionContent>
      </AccordionItem>
    </Accordion>
    ```

- Navigation/Menu systems
  - Menubar (`@/components/ui/menubar`), Navigation Menu (`@/components/ui/navigation-menu`), Sidebar (`@/components/ui/sidebar`)
  - Provide complex layout/navigation primitives. See source files for full APIs.

- Form helpers
  - Label (`@/components/ui/label`), Form (`@/components/ui/form`)

- Layout/Utility
  - Aspect Ratio (`@/components/ui/aspect-ratio`), Scroll Area (`@/components/ui/scroll-area`), Resizable (`@/components/ui/resizable`), Pagination (`@/components/ui/pagination`)

- Charts (`@/components/ui/chart`)
  - Exports: `ChartContainer`, `ChartTooltip`, `ChartTooltipContent`, `ChartLegend`, `ChartLegendContent`, `ChartStyle`
  - Minimal example:
    ```tsx
    <ChartContainer config={{ visitors: { label: "Visitors", color: "#2563eb" } }}>
      <Recharts.ResponsiveContainer>
        <Recharts.LineChart data={[{ day: "Mon", visitors: 120 }] }>
          <Recharts.Line dataKey="visitors" stroke="var(--color-visitors)" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
        </Recharts.LineChart>
      </Recharts.ResponsiveContainer>
    </ChartContainer>
    ```

- Toasts
  - Toast primitives (`@/components/ui/toast`): `ToastProvider`, `ToastViewport`, `Toast`, `ToastTitle`, `ToastDescription`, `ToastClose`, `ToastAction`
  - App Toaster (`@/components/ui/toaster`): `<Toaster />` renders current toasts
  - Usage:
    ```tsx
    // in app root
    <Toaster />

    // trigger toasts
    import { useToast } from "@/components/ui/use-toast";
    const { toast } = useToast();
    toast({ title: "Saved", description: "Your changes were saved." });
    ```

- Card (`@/components/ui/card`)
  - Exports: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`
  - Example:
    ```tsx
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
        <CardDescription>Subtitle</CardDescription>
      </CardHeader>
      <CardContent>Body</CardContent>
    </Card>
    ```

### Domain components

- JobMatchingSystem (`@/components/JobMatchingSystem`)
  - Props: `{ userPlan: 'free'|'starter'|'premium'|'elite'; onUpgrade: () => void }`
  - Behavior: Renders job list with filtering and plan-based limits; calls `onUpgrade` when upgrade CTAs are pressed
  - Example:
    ```tsx
    import JobMatchingSystem from "@/components/JobMatchingSystem";
    <JobMatchingSystem userPlan="starter" onUpgrade={() => navigate('/upgrade')} />
    ```

### Reference index (UI modules)

- `accordion` — Accordion, AccordionItem, AccordionTrigger, AccordionContent
- `alert` — Alert, AlertTitle, AlertDescription
- `alert-dialog` — see source for full API (modal primitives)
- `aspect-ratio` — AspectRatio
- `avatar` — Avatar, AvatarImage, AvatarFallback
- `badge` — Badge, badgeVariants
- `breadcrumb` — see source
- `button` — Button, buttonVariants
- `calendar` — Calendar
- `card` — Card, CardHeader, CardTitle, CardDescription, CardContent
- `carousel` — see source
- `chart` — ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle
- `checkbox` — Checkbox
- `collapsible` — Collapsible, CollapsibleTrigger, CollapsibleContent
- `command` — see source
- `context-menu` — see source
- `dialog` — see source
- `drawer` — see source
- `dropdown-menu` — see source
- `form` — see source
- `hover-card` — HoverCard, HoverCardTrigger, HoverCardContent
- `input` — Input
- `input-otp` — InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator
- `label` — Label
- `menubar` — see source
- `navigation-menu` — see source
- `pagination` — see source
- `popover` — Popover, PopoverTrigger, PopoverContent
- `progress` — Progress
- `radio-group` — RadioGroup, RadioGroupItem
- `resizable` — ResizablePanelGroup, ResizablePanel, ResizableHandle
- `scroll-area` — ScrollArea, ScrollBar
- `select` — see source
- `separator` — Separator
- `sheet` — see source
- `sidebar` — see source
- `skeleton` — Skeleton
- `slider` — Slider
- `sonner` — Toaster (sonner)
- `switch` — Switch
- `table` — Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption
- `tabs` — Tabs, TabsList, TabsTrigger, TabsContent
- `textarea` — Textarea
- `toast` — Toast primitives
- `toaster` — Toaster (toast store)
- `toggle` — Toggle, toggleVariants
- `toggle-group` — ToggleGroup, ToggleGroupItem
- `tooltip` — Tooltip, TooltipTrigger, TooltipContent, TooltipProvider
- `use-toast` — useToast, toast