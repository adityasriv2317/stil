// components/Dropdown.tsx
import { useState, useRef, useEffect } from 'react'

type DropdownProps = {
  buttonContent?: React.ReactNode
  placeholder?: string
  children: React.ReactNode
  className?: string
}

export default function Dropdown({
  buttonContent,
  placeholder = 'Select...',
  children,
  className = '',
}: DropdownProps) {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const displayLabel =
    buttonContent === null || buttonContent === undefined || buttonContent === '' ? (
      <span className="text-gray-400">{placeholder}</span>
    ) : (
      buttonContent
    )

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full text-center px-4 py-3 border border-gray-300 rounded-xl bg-black/10 text-white focus:outline-none"
      >
        {displayLabel}
      </button>
      {open && (
        <div className="absolute z-10 mt-1 w-full bg-black/90 border border-gray-700 rounded-xl shadow-lg">
          {children}
        </div>
      )}
    </div>
  )
}
