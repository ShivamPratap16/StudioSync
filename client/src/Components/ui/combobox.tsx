import * as React from "react"
import { Check, ChevronsUpDown, User } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "./button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "cmdk"
import {
  Dialog,
  DialogContent,
} from "./dialog"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"

interface ComboboxProps {
  options: { 
    value: string
    label: string
    avatar?: string
    role?: string
    rating?: string
  }[]
  value?: string
  onValueChange: (value: string) => void
  placeholder?: string
}

export function Combobox({ options, value, onValueChange, placeholder }: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")

  const filteredOptions = React.useMemo(() => {
    return options.filter(option => 
      option.label.toLowerCase().includes(search.toLowerCase()) ||
      option.role?.toLowerCase().includes(search.toLowerCase())
    )
  }, [options, search])

  return (
    <>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className="w-full justify-between hover:bg-accent/50 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        {value ? (
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={options.find((option) => option.value === value)?.avatar} />
              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                {options.find((option) => option.value === value)?.label
                  .split(' ')
                  .map(n => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <span className="truncate">
              {options.find((option) => option.value === value)?.label}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{placeholder || "Select editor..."}</span>
          </div>
        )}
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 gap-0 max-w-[400px]">
          <Command className="rounded-lg">
            <CommandInput 
              placeholder="Search editors..." 
              value={search}
              onValueChange={setSearch}
              className="h-11 px-4 border-b"
              autoFocus
            />
            <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
              No editors found.
            </CommandEmpty>
            <CommandGroup className="overflow-hidden py-2">
              <div className="max-h-[280px] overflow-y-auto custom-scrollbar">
                {filteredOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => {
                      onValueChange(option.value)
                      setOpen(false)
                      setSearch("")
                    }}
                    className="px-4 py-2 cursor-pointer data-[selected=true]:bg-accent"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <Avatar className="h-9 w-9 ring-1 ring-border">
                        <AvatarImage src={option.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {option.label.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate leading-none mb-1">
                          {option.label}
                        </p>
                        {option.role && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="truncate">{option.role}</span>
                            {option.rating && (
                              <>
                                <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
                                <span className="flex items-center gap-1">
                                  <svg
                                    className="h-3 w-3 fill-amber-400 stroke-amber-400"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                    />
                                  </svg>
                                  {option.rating}
                                </span>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                      {value === option.value && (
                        <Check className="h-4 w-4 text-primary shrink-0" />
                      )}
                    </div>
                  </CommandItem>
                ))}
              </div>
            </CommandGroup>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  )
}