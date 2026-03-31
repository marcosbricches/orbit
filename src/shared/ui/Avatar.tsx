import { forwardRef, useState } from 'react'
import { cn } from '../lib/cn'

type AvatarSize = 'sm' | 'md' | 'lg'

export interface AvatarProps {
  src?: string
  fallback: string
  size?: AvatarSize
  className?: string
}

const sizeStyles: Record<AvatarSize, string> = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, fallback, size = 'md', className }, ref) => {
    const [imgError, setImgError] = useState(false)
    const showImage = src && !imgError

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-full overflow-hidden bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center shrink-0',
          sizeStyles[size],
          className,
        )}
      >
        {showImage ? (
          <img
            src={src}
            alt={fallback}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="text-primary-600 dark:text-primary-100 font-medium select-none">
            {fallback}
          </span>
        )}
      </div>
    )
  },
)

Avatar.displayName = 'Avatar'
