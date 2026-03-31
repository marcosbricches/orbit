import { useState } from 'react'
import { Inbox, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { Select } from '@/shared/ui/Select'
import { Textarea } from '@/shared/ui/Textarea'
import { Checkbox } from '@/shared/ui/Checkbox'
import { Toggle } from '@/shared/ui/Toggle'
import { Card } from '@/shared/ui/Card'
import { Badge } from '@/shared/ui/Badge'
import { Avatar } from '@/shared/ui/Avatar'
import { Skeleton } from '@/shared/ui/Skeleton'
import { Dialog } from '@/shared/ui/Dialog'
import { Tooltip } from '@/shared/ui/Tooltip'
import { ToastContainer, useToast } from '@/shared/ui/Toast'
import { Separator } from '@/shared/ui/Separator'
import { EmptyState } from '@/shared/ui/EmptyState'
import { ErrorState } from '@/shared/ui/ErrorState'
import { LoadingState } from '@/shared/ui/LoadingState'
import { cn } from '@/shared/lib/cn'

const colorSwatches = [
  { name: 'primary-50', className: 'bg-primary-50' },
  { name: 'primary-100', className: 'bg-primary-100' },
  { name: 'primary-500', className: 'bg-primary-500' },
  { name: 'primary-600', className: 'bg-primary-600' },
  { name: 'background', className: 'bg-background' },
  { name: 'surface', className: 'bg-surface' },
  { name: 'surface-alt', className: 'bg-surface-alt' },
  { name: 'border', className: 'bg-border' },
  { name: 'status-success', className: 'bg-status-success' },
  { name: 'status-error', className: 'bg-status-error' },
  { name: 'status-warning', className: 'bg-status-warning' },
  { name: 'status-info', className: 'bg-status-info' },
] as const

const typeSizes = [
  { label: 'text-xs', className: 'text-xs' },
  { label: 'text-sm', className: 'text-sm' },
  { label: 'text-base', className: 'text-base' },
  { label: 'text-lg', className: 'text-lg' },
  { label: 'text-xl', className: 'text-xl' },
  { label: 'text-2xl', className: 'text-2xl' },
  { label: 'text-3xl', className: 'text-3xl' },
  { label: 'text-4xl', className: 'text-4xl' },
] as const

const fontWeights = [
  { label: '400 Regular', className: 'font-normal' },
  { label: '500 Medium', className: 'font-medium' },
  { label: '600 Semibold', className: 'font-semibold' },
  { label: '700 Bold', className: 'font-bold' },
] as const

const buttonVariants = ['primary', 'secondary', 'ghost', 'destructive'] as const
const buttonSizes = ['sm', 'md', 'lg'] as const
const badgeVariants = ['default', 'success', 'warning', 'error', 'info'] as const
const avatarSizes = ['sm', 'md', 'lg'] as const
const cardVariants = ['default', 'outlined'] as const
const cardPaddings = ['sm', 'md', 'lg'] as const

const sampleOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
]

const radiusTokens = [
  { name: 'sm', className: 'rounded-sm' },
  { name: 'md', className: 'rounded-md' },
  { name: 'lg', className: 'rounded-lg' },
  { name: 'full', className: 'rounded-full' },
] as const

const spacingScale = [
  { name: '1 (4px)', className: 'w-1' },
  { name: '2 (8px)', className: 'w-2' },
  { name: '3 (12px)', className: 'w-3' },
  { name: '4 (16px)', className: 'w-4' },
  { name: '6 (24px)', className: 'w-6' },
  { name: '8 (32px)', className: 'w-8' },
  { name: '12 (48px)', className: 'w-12' },
  { name: '16 (64px)', className: 'w-16' },
] as const

function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className="text-2xl font-semibold mb-6 text-text-primary dark:text-text-inverse">
      {children}
    </h2>
  )
}

function SubHeading({ children }: { children: string }) {
  return (
    <h3 className="text-lg font-medium mb-4 text-text-primary dark:text-text-inverse">
      {children}
    </h3>
  )
}

export const DesignSystemPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [checkboxChecked, setCheckboxChecked] = useState(true)
  const [toggleOn, setToggleOn] = useState(true)
  const { toasts, addToast, removeToast } = useToast()

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">
      <header>
        <h1 className="text-4xl font-bold text-text-primary dark:text-text-inverse mb-2">
          Orbit Design System
        </h1>
        <p className="text-text-secondary">Component showcase and design token reference.</p>
      </header>

      {/* 1. Color Palette */}
      <section>
        <SectionHeading>Color Palette</SectionHeading>
        <div className="grid grid-cols-4 gap-4 sm:grid-cols-6">
          {colorSwatches.map((swatch) => (
            <div key={swatch.name} className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  'w-16 h-16 rounded-lg border border-border dark:border-dark-border',
                  swatch.className,
                )}
              />
              <span className="text-xs text-text-secondary text-center">{swatch.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Typography */}
      <section>
        <SectionHeading>Typography</SectionHeading>

        <SubHeading>Type Scale (Inter)</SubHeading>
        <div className="flex flex-col gap-3">
          {typeSizes.map((size) => (
            <div key={size.label} className="flex items-baseline gap-4">
              <span className="text-xs text-text-secondary w-20 shrink-0">{size.label}</span>
              <span className={cn(size.className, 'text-text-primary dark:text-text-inverse')}>
                The quick brown fox jumps over the lazy dog
              </span>
            </div>
          ))}
        </div>

        <SubHeading>Font Weights</SubHeading>
        <div className="flex flex-col gap-3">
          {fontWeights.map((weight) => (
            <div key={weight.label} className="flex items-baseline gap-4">
              <span className="text-xs text-text-secondary w-28 shrink-0">{weight.label}</span>
              <span
                className={cn('text-lg text-text-primary dark:text-text-inverse', weight.className)}
              >
                The quick brown fox jumps over the lazy dog
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Interactive Components */}
      <section>
        <SectionHeading>Interactive Components</SectionHeading>

        {/* Buttons */}
        <SubHeading>Button</SubHeading>
        <div className="space-y-6">
          {buttonVariants.map((variant) => (
            <div key={variant} className="space-y-2">
              <p className="text-sm text-text-secondary capitalize">{variant}</p>
              <div className="flex items-center gap-3 flex-wrap">
                {buttonSizes.map((size) => (
                  <Button key={`${variant}-${size}`} variant={variant} size={size}>
                    {size.toUpperCase()}
                  </Button>
                ))}
              </div>
            </div>
          ))}
          <div className="space-y-2">
            <p className="text-sm text-text-secondary">Loading & Disabled</p>
            <div className="flex items-center gap-3 flex-wrap">
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
              <Button variant="secondary" loading>
                Loading
              </Button>
              <Button variant="destructive" disabled>
                Disabled
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Input */}
        <SubHeading>Input</SubHeading>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-2xl">
          <Input label="Default" placeholder="Enter text..." />
          <Input label="Focused" placeholder="Auto-focused" autoFocus />
          <Input label="Error" placeholder="Invalid value" error="This field is required" />
          <Input label="Disabled" placeholder="Cannot edit" disabled />
        </div>

        <Separator className="my-8" />

        {/* Select */}
        <SubHeading>Select</SubHeading>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-2xl">
          <Select label="Default" options={sampleOptions} placeholder="Choose a framework" />
          <Select
            label="Error"
            options={sampleOptions}
            error="Selection required"
            placeholder="Pick one"
          />
          <Select label="Disabled" options={sampleOptions} disabled placeholder="Locked" />
        </div>

        <Separator className="my-8" />

        {/* Textarea */}
        <SubHeading>Textarea</SubHeading>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-2xl">
          <Textarea label="Default" placeholder="Write something..." />
          <Textarea label="Error" placeholder="Bad input" error="Too short" />
          <Textarea label="Disabled" placeholder="Read only" disabled />
        </div>

        <Separator className="my-8" />

        {/* Checkbox */}
        <SubHeading>Checkbox</SubHeading>
        <div className="flex items-center gap-6 flex-wrap">
          <Checkbox label="Unchecked" checked={false} onChange={() => {}} />
          <Checkbox label="Checked" checked={checkboxChecked} onChange={setCheckboxChecked} />
          <Checkbox label="Disabled" checked={false} disabled />
        </div>

        <Separator className="my-8" />

        {/* Toggle */}
        <SubHeading>Toggle</SubHeading>
        <div className="flex items-center gap-6 flex-wrap">
          <Toggle label="Off" checked={false} onChange={() => {}} />
          <Toggle label="On" checked={toggleOn} onChange={setToggleOn} />
          <Toggle label="Disabled" disabled checked={false} />
          <Toggle label="Small off" size="sm" checked={false} onChange={() => {}} />
          <Toggle label="Small on" size="sm" checked={true} onChange={() => {}} />
        </div>
      </section>

      {/* 4. Display Components */}
      <section>
        <SectionHeading>Display Components</SectionHeading>

        {/* Card */}
        <SubHeading>Card</SubHeading>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cardVariants.map((variant) =>
            cardPaddings.map((padding) => (
              <Card key={`${variant}-${padding}`} variant={variant} padding={padding}>
                <p className="text-sm text-text-primary dark:text-text-inverse font-medium">
                  {variant} / {padding}
                </p>
                <p className="text-xs text-text-secondary mt-1">
                  Variant: {variant}, Padding: {padding}
                </p>
              </Card>
            )),
          )}
        </div>

        <Separator className="my-8" />

        {/* Badge */}
        <SubHeading>Badge</SubHeading>
        <div className="flex items-center gap-3 flex-wrap">
          {badgeVariants.map((variant) => (
            <Badge key={variant} variant={variant}>
              {variant}
            </Badge>
          ))}
        </div>

        <Separator className="my-8" />

        {/* Avatar */}
        <SubHeading>Avatar</SubHeading>
        <div className="flex items-center gap-6 flex-wrap">
          {avatarSizes.map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <Avatar size={size} fallback="AB" />
              <span className="text-xs text-text-secondary">{size} (fallback)</span>
            </div>
          ))}
          {avatarSizes.map((size) => (
            <div key={`img-${size}`} className="flex flex-col items-center gap-2">
              <Avatar size={size} src="https://i.pravatar.cc/150?u=orbit" fallback="AB" />
              <span className="text-xs text-text-secondary">{size} (image)</span>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        {/* Skeleton */}
        <SubHeading>Skeleton</SubHeading>
        <div className="flex items-start gap-6 flex-wrap">
          <div className="flex flex-col items-center gap-2">
            <Skeleton variant="text" width={200} />
            <span className="text-xs text-text-secondary">Text</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Skeleton variant="circular" width={48} height={48} />
            <span className="text-xs text-text-secondary">Circular</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Skeleton variant="rectangular" width={200} height={80} />
            <span className="text-xs text-text-secondary">Rectangular</span>
          </div>
        </div>
      </section>

      {/* 5. Overlay Components */}
      <section>
        <SectionHeading>Overlay Components</SectionHeading>

        {/* Dialog */}
        <SubHeading>Dialog</SubHeading>
        <Button onClick={() => setDialogOpen(true)}>Open Dialog</Button>
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} title="Sample Dialog">
          <p className="text-text-primary dark:text-text-inverse">
            This is a dialog with sample content. Press Escape or click the overlay to close.
          </p>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="ghost" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setDialogOpen(false)}>Confirm</Button>
          </div>
        </Dialog>

        <Separator className="my-8" />

        {/* Tooltip */}
        <SubHeading>Tooltip</SubHeading>
        <div className="flex items-center gap-6 py-8 justify-center">
          <Tooltip content="Tooltip on top" side="top">
            <button className="p-2 rounded-md border border-border dark:border-dark-border text-text-primary dark:text-text-inverse hover:bg-surface-alt dark:hover:bg-dark-border transition-colors">
              <ArrowUp className="w-5 h-5" />
            </button>
          </Tooltip>
          <Tooltip content="Tooltip on bottom" side="bottom">
            <button className="p-2 rounded-md border border-border dark:border-dark-border text-text-primary dark:text-text-inverse hover:bg-surface-alt dark:hover:bg-dark-border transition-colors">
              <ArrowDown className="w-5 h-5" />
            </button>
          </Tooltip>
          <Tooltip content="Tooltip on left" side="left">
            <button className="p-2 rounded-md border border-border dark:border-dark-border text-text-primary dark:text-text-inverse hover:bg-surface-alt dark:hover:bg-dark-border transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Tooltip>
          <Tooltip content="Tooltip on right" side="right">
            <button className="p-2 rounded-md border border-border dark:border-dark-border text-text-primary dark:text-text-inverse hover:bg-surface-alt dark:hover:bg-dark-border transition-colors">
              <ArrowRight className="w-5 h-5" />
            </button>
          </Tooltip>
        </div>

        <Separator className="my-8" />

        {/* Toast */}
        <SubHeading>Toast</SubHeading>
        <div className="flex items-center gap-3 flex-wrap">
          <Button
            variant="primary"
            onClick={() => addToast('Operation completed successfully!', 'success')}
          >
            Success Toast
          </Button>
          <Button variant="destructive" onClick={() => addToast('Something went wrong.', 'error')}>
            Error Toast
          </Button>
          <Button
            variant="secondary"
            onClick={() => addToast('Heads up! Check this out.', 'warning')}
          >
            Warning Toast
          </Button>
          <Button
            variant="ghost"
            onClick={() => addToast('Here is some useful information.', 'info')}
          >
            Info Toast
          </Button>
        </div>
        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </section>

      {/* 6. Layout Components */}
      <section>
        <SectionHeading>Layout Components</SectionHeading>

        {/* Separator */}
        <SubHeading>Separator</SubHeading>
        <div className="space-y-4">
          <p className="text-sm text-text-secondary">Horizontal</p>
          <Separator />
          <div className="flex items-center gap-4 h-8">
            <span className="text-sm text-text-primary dark:text-text-inverse">Left</span>
            <Separator orientation="vertical" className="h-full" />
            <span className="text-sm text-text-primary dark:text-text-inverse">Right</span>
          </div>
          <p className="text-sm text-text-secondary">Vertical (between items above)</p>
        </div>

        <Separator className="my-8" />

        {/* EmptyState */}
        <SubHeading>EmptyState</SubHeading>
        <Card variant="outlined" padding="lg">
          <EmptyState
            icon={Inbox}
            title="No tasks yet"
            description="Get started by creating your first task. Organize your work and track progress."
            action={{
              label: 'Create Task',
              onClick: () => addToast('Create task clicked!', 'info'),
            }}
          />
        </Card>

        <Separator className="my-8" />

        {/* ErrorState */}
        <SubHeading>ErrorState</SubHeading>
        <Card variant="outlined" padding="lg">
          <ErrorState
            title="Failed to load data"
            description="An unexpected error occurred while fetching your tasks. Please try again."
            retry={() => addToast('Retry clicked!', 'info')}
          />
        </Card>

        <Separator className="my-8" />

        {/* LoadingState */}
        <SubHeading>LoadingState</SubHeading>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card variant="outlined" padding="md">
            <p className="text-sm text-text-secondary text-center mb-2">Spinner</p>
            <LoadingState variant="spinner" />
          </Card>
          <Card variant="outlined" padding="md">
            <p className="text-sm text-text-secondary text-center mb-2">Skeleton</p>
            <LoadingState variant="skeleton" />
          </Card>
          <Card variant="outlined" padding="md">
            <p className="text-sm text-text-secondary text-center mb-2">Dots</p>
            <LoadingState variant="dots" />
          </Card>
        </div>
      </section>

      {/* 7. Spacing & Radius */}
      <section>
        <SectionHeading>Spacing & Radius</SectionHeading>

        <SubHeading>Border Radius</SubHeading>
        <div className="flex items-center gap-6 flex-wrap">
          {radiusTokens.map((token) => (
            <div key={token.name} className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  'w-16 h-16 bg-primary-100 border border-primary-500',
                  token.className,
                )}
              />
              <span className="text-xs text-text-secondary">{token.name}</span>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <SubHeading>Spacing Scale</SubHeading>
        <div className="flex flex-col gap-3">
          {spacingScale.map((space) => (
            <div key={space.name} className="flex items-center gap-4">
              <span className="text-xs text-text-secondary w-24 shrink-0">{space.name}</span>
              <div className={cn('h-4 bg-primary-500 rounded-sm', space.className)} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
