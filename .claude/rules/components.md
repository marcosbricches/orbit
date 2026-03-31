---
description: shared/ui/ component catalog — use these before creating new components
paths:
  - 'src/**/*.tsx'
---

# Components

| Component    | Key props                                                                         | When to use                       |
| ------------ | --------------------------------------------------------------------------------- | --------------------------------- |
| Button       | variant (primary/secondary/ghost/destructive), size (sm/md/lg), loading, disabled | Primary and secondary actions     |
| Input        | label, error, disabled, placeholder                                               | Form text fields                  |
| Select       | label, error, options, value, onChange, placeholder                               | Dropdown selections               |
| Textarea     | label, error, disabled, placeholder                                               | Multi-line text input             |
| Checkbox     | checked, onChange, label, disabled                                                | Boolean selections                |
| Toggle       | checked, onChange, size (sm/md), label, disabled                                  | On/off switches                   |
| Card         | variant (default/outlined), padding (sm/md/lg)                                    | Content containers                |
| Badge        | variant (default/success/warning/error/info)                                      | Status indicators, tags           |
| Avatar       | src, fallback, size (sm/md/lg)                                                    | User profile images               |
| Skeleton     | variant (text/circular/rectangular), width, height                                | Loading placeholders              |
| Dialog       | open, onClose, title, size (sm/md/lg)                                             | Modal overlays                    |
| Tooltip      | content, side (top/bottom/left/right)                                             | Hover explanations                |
| Toast        | message, variant (success/error/info/warning)                                     | Notifications (use useToast hook) |
| Separator    | orientation (horizontal/vertical)                                                 | Visual dividers                   |
| EmptyState   | title, description, icon, action                                                  | Empty data states                 |
| ErrorState   | title, description, retry                                                         | Error recovery                    |
| LoadingState | variant (spinner/skeleton/dots)                                                   | Loading indicators                |
